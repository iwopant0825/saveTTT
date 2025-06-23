import { NextResponse } from 'next/server'

// 한국전력공사 누진제 요금표 (2024년 기준)
const ELECTRICITY_RATES = {
  // 주택용(저압) 요금표
  residential: {
    basicFee: {
      tier1: { max: 200, fee: 910 },        // 200kWh 이하
      tier2: { min: 201, max: 400, fee: 1600 }, // 201~400kWh
      tier3: { min: 401, fee: 7300 }        // 401kWh 초과
    },
    energyFee: {
      tier1: { max: 200, rate: 120.0 },     // 200kWh 이하
      tier2: { min: 201, max: 400, rate: 214.6 }, // 201~400kWh  
      tier3: { min: 401, rate: 307.3 }      // 401kWh 초과
    },
    // 계절별 추가요금 (하계: 7,8월)
    seasonalSurcharge: {
      summer: {
        tier2: 0, // 201~400kWh 추가요금 없음
        tier3: 0  // 401kWh 초과 추가요금 없음
      }
    },
    // 기타 요금
    otherFees: {
      climateFund: 0.03,     // 기후환경요금 (kWh당)
      fuelAdjustment: 5.0,   // 연료비조정요금 (kWh당)
      powerIndustryFund: 0.37 // 전력산업기반기금 (kWh당)
    }
  }
}

// 전기요금 계산 함수
function calculateElectricityBill(kwh, month = new Date().getMonth() + 1) {
  const rates = ELECTRICITY_RATES.residential
  const isSummer = month === 7 || month === 8
  
  let basicFee = 0
  let energyFee = 0
  
  // 기본요금 계산
  if (kwh <= 200) {
    basicFee = rates.basicFee.tier1.fee
  } else if (kwh <= 400) {
    basicFee = rates.basicFee.tier2.fee
  } else {
    basicFee = rates.basicFee.tier3.fee
  }
  
  // 전력량요금 계산
  if (kwh <= 200) {
    energyFee = kwh * rates.energyFee.tier1.rate
  } else if (kwh <= 400) {
    energyFee = (200 * rates.energyFee.tier1.rate) + 
               ((kwh - 200) * rates.energyFee.tier2.rate)
  } else {
    energyFee = (200 * rates.energyFee.tier1.rate) + 
               (200 * rates.energyFee.tier2.rate) + 
               ((kwh - 400) * rates.energyFee.tier3.rate)
  }
  
  // 기타 요금 계산
  const climateFund = kwh * rates.otherFees.climateFund
  const fuelAdjustment = kwh * rates.otherFees.fuelAdjustment
  const powerIndustryFund = kwh * rates.otherFees.powerIndustryFund
  
  const subtotal = basicFee + energyFee + climateFund + fuelAdjustment + powerIndustryFund
  const vat = subtotal * 0.1 // 부가가치세 10%
  const total = Math.round(subtotal + vat)
  
  return {
    kwh,
    month,
    isSummer,
    breakdown: {
      basicFee: Math.round(basicFee),
      energyFee: Math.round(energyFee),
      climateFund: Math.round(climateFund),
      fuelAdjustment: Math.round(fuelAdjustment),
      powerIndustryFund: Math.round(powerIndustryFund),
      subtotal: Math.round(subtotal),
      vat: Math.round(vat),
      total
    },
    tierInfo: {
      tier1: kwh <= 200 ? kwh : 200,
      tier2: kwh > 200 ? (kwh <= 400 ? kwh - 200 : 200) : 0,
      tier3: kwh > 400 ? kwh - 400 : 0
    }
  }
}

// 절약 시뮬레이션 함수
function simulateSavings(currentKwh, reductionPercentage) {
  const reducedKwh = Math.round(currentKwh * (1 - reductionPercentage / 100))
  const currentBill = calculateElectricityBill(currentKwh)
  const reducedBill = calculateElectricityBill(reducedKwh)
  
  const monthlySavings = currentBill.breakdown.total - reducedBill.breakdown.total
  const yearlySavings = monthlySavings * 12
  
  return {
    current: currentBill,
    reduced: reducedBill,
    savings: {
      kwhReduction: currentKwh - reducedKwh,
      monthlySavings,
      yearlySavings,
      percentage: Math.round((monthlySavings / currentBill.breakdown.total) * 100)
    }
  }
}

// 절약 팁 생성 함수
function generateSavingTips(kwh) {
  const tips = []
  
  if (kwh > 400) {
    tips.push({
      category: '에어컨 사용',
      tip: '에어컨 설정온도를 1도 올리면 월 약 15% 절약 가능',
      expectedSaving: Math.round(kwh * 0.15 * ELECTRICITY_RATES.residential.energyFee.tier3.rate)
    })
    tips.push({
      category: '대기전력 차단',
      tip: '사용하지 않는 전자기기 플러그 뽑기',
      expectedSaving: Math.round(kwh * 0.08 * ELECTRICITY_RATES.residential.energyFee.tier3.rate)
    })
  }
  
  if (kwh > 200) {
    tips.push({
      category: '조명 교체',
      tip: 'LED 조명으로 교체하면 월 약 10% 절약',
      expectedSaving: Math.round(kwh * 0.10 * ELECTRICITY_RATES.residential.energyFee.tier2.rate)
    })
    tips.push({
      category: '냉장고 관리',
      tip: '냉장고 적정온도 유지 및 문 여닫기 줄이기',
      expectedSaving: Math.round(kwh * 0.05 * ELECTRICITY_RATES.residential.energyFee.tier2.rate)
    })
  }
  
  tips.push({
    category: '세탁기 사용',
    tip: '찬물 세탁 및 적정 용량으로 사용',
    expectedSaving: Math.round(kwh * 0.03 * ELECTRICITY_RATES.residential.energyFee.tier1.rate)
  })
  
  return tips.slice(0, 4) // 최대 4개까지
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { kwh, month, action, reductionPercentage } = body

    if (!kwh || kwh <= 0) {
      return NextResponse.json({
        success: false,
        error: '유효한 전력 사용량을 입력해주세요.'
      }, { status: 400 })
    }

    switch (action) {
      case 'calculate_bill':
        const bill = calculateElectricityBill(kwh, month)
        const tips = generateSavingTips(kwh)
        
        return NextResponse.json({
          success: true,
          data: {
            bill,
            tips,
            rates: ELECTRICITY_RATES.residential
          }
        })

      case 'simulate_savings':
        if (!reductionPercentage || reductionPercentage <= 0 || reductionPercentage > 50) {
          return NextResponse.json({
            success: false,
            error: '절약 비율을 1-50% 범위로 입력해주세요.'
          }, { status: 400 })
        }
        
        const simulation = simulateSavings(kwh, reductionPercentage)
        
        return NextResponse.json({
          success: true,
          data: simulation
        })

      case 'compare_months':
        const { compareKwh } = body
        if (!compareKwh || !Array.isArray(compareKwh)) {
          return NextResponse.json({
            success: false,
            error: '비교할 월별 사용량 데이터가 필요합니다.'
          }, { status: 400 })
        }
        
        const monthlyComparison = compareKwh.map((data, index) => {
          const monthlyBill = calculateElectricityBill(data.kwh, data.month || index + 1)
          return {
            month: data.month || index + 1,
            kwh: data.kwh,
            bill: monthlyBill.breakdown.total,
            tier: data.kwh <= 200 ? 1 : data.kwh <= 400 ? 2 : 3
          }
        })
        
        const totalYearly = monthlyComparison.reduce((sum, month) => sum + month.bill, 0)
        const averageMonthly = Math.round(totalYearly / monthlyComparison.length)
        
        return NextResponse.json({
          success: true,
          data: {
            monthlyComparison,
            summary: {
              totalYearly,
              averageMonthly,
              highestMonth: monthlyComparison.reduce((max, month) => 
                month.bill > max.bill ? month : max
              ),
              lowestMonth: monthlyComparison.reduce((min, month) => 
                month.bill < min.bill ? month : min
              )
            }
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: '유효하지 않은 액션입니다.'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Electricity API Error:', error)
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function GET() {
  // 전기요금 정보 반환
  return NextResponse.json({
    success: true,
    data: {
      rates: ELECTRICITY_RATES.residential,
      info: {
        description: '한국전력공사 주택용 누진제 요금표 (2024년 기준)',
        tiers: [
          { range: '1~200kWh', rate: '120.0원/kWh', basicFee: '910원' },
          { range: '201~400kWh', rate: '214.6원/kWh', basicFee: '1,600원' },
          { range: '401kWh~', rate: '307.3원/kWh', basicFee: '7,300원' }
        ]
      }
    }
  })
}
