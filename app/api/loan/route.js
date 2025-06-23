import { NextResponse } from 'next/server'

// 은행별 대출 금리 정보 (2024년 기준 예시)
const BANK_RATES = {
  kb: {
    name: 'KB국민은행',
    rates: {
      mortgage: { min: 3.5, max: 5.2 },      // 주택담보대출
      credit: { min: 4.8, max: 15.5 },       // 신용대출
      jeonse: { min: 3.2, max: 4.8 }         // 전세자금대출
    }
  },
  shinhan: {
    name: '신한은행',
    rates: {
      mortgage: { min: 3.4, max: 5.1 },
      credit: { min: 4.7, max: 15.2 },
      jeonse: { min: 3.1, max: 4.7 }
    }
  },
  woori: {
    name: '우리은행',
    rates: {
      mortgage: { min: 3.6, max: 5.3 },
      credit: { min: 4.9, max: 15.8 },
      jeonse: { min: 3.3, max: 4.9 }
    }
  },
  hana: {
    name: '하나은행',
    rates: {
      mortgage: { min: 3.5, max: 5.2 },
      credit: { min: 4.8, max: 15.6 },
      jeonse: { min: 3.2, max: 4.8 }
    }
  }
}

// 월 상환액 계산 함수 (원리금균등상환)
function calculateMonthlyPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) {
    return principal / months
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(payment)
}

// 총 이자 계산 함수
function calculateTotalInterest(principal, annualRate, months) {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months)
  const totalPayment = monthlyPayment * months
  return totalPayment - principal
}

// 대출 상세 계산 함수
function calculateLoanDetails(principal, annualRate, months) {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months)
  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - principal
  
  // 월별 상환 스케줄 (처음 12개월만)
  const schedule = []
  let remainingPrincipal = principal
  const monthlyRate = annualRate / 100 / 12
  
  for (let month = 1; month <= Math.min(months, 12); month++) {
    const interestPayment = Math.round(remainingPrincipal * monthlyRate)
    const principalPayment = monthlyPayment - interestPayment
    remainingPrincipal -= principalPayment
    
    schedule.push({
      month,
      monthlyPayment,
      principalPayment,
      interestPayment,
      remainingPrincipal: Math.max(0, remainingPrincipal)
    })
  }
  
  return {
    principal,
    annualRate,
    months,
    monthlyPayment,
    totalPayment,
    totalInterest,
    schedule
  }
}

// 대출 갈아타기 분석 함수
function analyzeLoanRefinancing(currentLoan, newLoan, refinancingCosts = 0) {
  // 현재 대출 남은 원금 기준으로 계산
  const currentDetails = calculateLoanDetails(
    currentLoan.remainingPrincipal,
    currentLoan.annualRate,
    currentLoan.remainingMonths
  )
  
  const newDetails = calculateLoanDetails(
    currentLoan.remainingPrincipal,
    newLoan.annualRate,
    newLoan.months || currentLoan.remainingMonths
  )
  
  const monthlySavings = currentDetails.monthlyPayment - newDetails.monthlyPayment
  const totalInterestSavings = currentDetails.totalInterest - newDetails.totalInterest
  const netSavings = totalInterestSavings - refinancingCosts
  
  // 손익분기점 계산 (수수료 회수 기간)
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refinancingCosts / monthlySavings) : null
  
  return {
    current: currentDetails,
    new: newDetails,
    comparison: {
      monthlySavings,
      totalInterestSavings,
      refinancingCosts,
      netSavings,
      breakEvenMonths,
      isRecommended: netSavings > 0 && (breakEvenMonths === null || breakEvenMonths <= 24)
    }
  }
}

// 최적 대출 상품 추천 함수
function recommendBestLoans(loanType, principal, creditScore = 'good') {
  const recommendations = []
  
  Object.entries(BANK_RATES).forEach(([bankCode, bankInfo]) => {
    const rates = bankInfo.rates[loanType]
    if (!rates) return
    
    // 신용등급에 따른 금리 조정
    let estimatedRate = rates.min
    switch (creditScore) {
      case 'excellent':
        estimatedRate = rates.min
        break
      case 'good':
        estimatedRate = rates.min + (rates.max - rates.min) * 0.3
        break
      case 'fair':
        estimatedRate = rates.min + (rates.max - rates.min) * 0.6
        break
      case 'poor':
        estimatedRate = rates.max
        break
    }
    
    const monthlyPayment36 = calculateMonthlyPayment(principal, estimatedRate, 36)
    const monthlyPayment60 = calculateMonthlyPayment(principal, estimatedRate, 60)
    
    recommendations.push({
      bank: bankInfo.name,
      bankCode,
      estimatedRate: Math.round(estimatedRate * 100) / 100,
      rateRange: rates,
      options: [
        {
          months: 36,
          monthlyPayment: monthlyPayment36,
          totalInterest: calculateTotalInterest(principal, estimatedRate, 36)
        },
        {
          months: 60,
          monthlyPayment: monthlyPayment60,
          totalInterest: calculateTotalInterest(principal, estimatedRate, 60)
        }
      ]
    })
  })
  
  // 금리 순으로 정렬
  recommendations.sort((a, b) => a.estimatedRate - b.estimatedRate)
  
  return recommendations
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      action,
      principal,
      annualRate,
      months,
      loanType,
      creditScore,
      currentLoan,
      newLoan,
      refinancingCosts
    } = body

    switch (action) {
      case 'calculate_loan':
        if (!principal || !annualRate || !months) {
          return NextResponse.json({
            success: false,
            error: '대출 원금, 금리, 기간을 모두 입력해주세요.'
          }, { status: 400 })
        }
        
        if (principal <= 0 || annualRate < 0 || months <= 0) {
          return NextResponse.json({
            success: false,
            error: '올바른 대출 조건을 입력해주세요.'
          }, { status: 400 })
        }
        
        const loanDetails = calculateLoanDetails(principal, annualRate, months)
        
        return NextResponse.json({
          success: true,
          data: loanDetails
        })

      case 'analyze_refinancing':
        if (!currentLoan || !newLoan) {
          return NextResponse.json({
            success: false,
            error: '현재 대출과 신규 대출 정보를 모두 입력해주세요.'
          }, { status: 400 })
        }
        
        const analysis = analyzeLoanRefinancing(
          currentLoan, 
          newLoan, 
          refinancingCosts || 0
        )
        
        return NextResponse.json({
          success: true,
          data: analysis
        })

      case 'recommend_loans':
        if (!loanType || !principal) {
          return NextResponse.json({
            success: false,
            error: '대출 종류와 금액을 입력해주세요.'
          }, { status: 400 })
        }
        
        const recommendations = recommendBestLoans(
          loanType, 
          principal, 
          creditScore || 'good'
        )
        
        return NextResponse.json({
          success: true,
          data: {
            loanType,
            principal,
            creditScore: creditScore || 'good',
            recommendations
          }
        })

      case 'compare_terms':
        if (!principal || !annualRate) {
          return NextResponse.json({
            success: false,
            error: '대출 원금과 금리를 입력해주세요.'
          }, { status: 400 })
        }
        
        const terms = [12, 24, 36, 48, 60, 84, 120]
        const comparisons = terms.map(term => {
          const details = calculateLoanDetails(principal, annualRate, term)
          return {
            months: term,
            years: Math.round(term / 12 * 10) / 10,
            monthlyPayment: details.monthlyPayment,
            totalInterest: details.totalInterest,
            totalPayment: details.totalPayment
          }
        })
        
        return NextResponse.json({
          success: true,
          data: {
            principal,
            annualRate,
            comparisons
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: '유효하지 않은 액션입니다.'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Loan API Error:', error)
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function GET() {
  // 은행별 대출 금리 정보 반환
  return NextResponse.json({
    success: true,
    data: {
      banks: BANK_RATES,
      loanTypes: {
        mortgage: '주택담보대출',
        credit: '신용대출',
        jeonse: '전세자금대출'
      },
      creditScores: {
        excellent: '우량 (1-2등급)',
        good: '양호 (3-4등급)',
        fair: '보통 (5-6등급)',
        poor: '주의 (7등급 이하)'
      }
    }
  })
}
