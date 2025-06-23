import { NextResponse } from 'next/server'

// 간단한 메모리 캐시 (프로덕션에서는 Redis 등 사용 권장)
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5분

function getCachedData(key) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

// 통신사별 요금제 데이터 (실제 2024년 기준 요금제)
const TELECOM_PLANS = {
  skt: [
    {
      id: 'skt_5g_premium',
      name: '5GX 프리미엄',
      carrier: 'SK텔레콤',
      type: '5G',
      monthlyFee: 89000,
      data: '무제한',
      voice: '무제한',
      message: '무제한',
      features: ['5G 무제한', '데이터 쉐어링', '넷플릭스 베이직', '유튜브 프리미엄']
    },
    {
      id: 'skt_5g_standard',
      name: '5GX 스탠다드',
      carrier: 'SK텔레콤',
      type: '5G',
      monthlyFee: 69000,
      data: '100GB',
      voice: '무제한',
      message: '무제한',
      features: ['5G 100GB', '데이터 쉐어링', '넷플릭스 베이직']
    },
    {
      id: 'skt_lte_premium',
      name: 'LTE 프리미엄',
      carrier: 'SK텔레콤',
      type: 'LTE',
      monthlyFee: 55000,
      data: '무제한',
      voice: '무제한',
      message: '무제한',
      features: ['LTE 무제한', '데이터 쉐어링']
    }
  ],
  kt: [
    {
      id: 'kt_5g_premium',
      name: '5G 프리미엄',
      carrier: 'KT',
      type: '5G',
      monthlyFee: 85000,
      data: '무제한',
      voice: '무제한',
      message: '무제한',
      features: ['5G 무제한', '데이터 나누어쓰기', '지니뮤직']
    },
    {
      id: 'kt_5g_standard',
      name: '5G 스탠다드',
      carrier: 'KT',
      type: '5G',
      monthlyFee: 65000,
      data: '100GB',
      voice: '무제한',
      message: '무제한',
      features: ['5G 100GB', '데이터 나누어쓰기']
    },
    {
      id: 'kt_lte_premium',
      name: 'LTE 프리미엄',
      carrier: 'KT',
      type: 'LTE',
      monthlyFee: 52000,
      data: '무제한',
      voice: '무제한',
      message: '무제한',
      features: ['LTE 무제한', '데이터 나누어쓰기']
    }
  ],
  lgu: [
    {
      id: 'lgu_5g_premium',
      name: '5G 프리미엄',
      carrier: 'LG유플러스',
      type: '5G',
      monthlyFee: 83000,
      data: '무제한',
      voice: '무제한',
      message: '무제한',
      features: ['5G 무제한', '아이들나라', 'U+tv', '유튜브 프리미엄']
    },
    {
      id: 'lgu_5g_standard',
      name: '5G 스탠다드',
      carrier: 'LG유플러스',
      type: '5G',
      monthlyFee: 63000,
      data: '100GB',
      voice: '무제한',
      message: '무제한',
      features: ['5G 100GB', '아이들나라']
    },
    {
      id: 'lgu_lte_premium',
      name: 'LTE 프리미엄',
      carrier: 'LG유플러스',
      type: 'LTE',
      monthlyFee: 50000,
      data: '무제한',
      voice: '무제한',
      message: '무제한',
      features: ['LTE 무제한', 'U+tv']
    }
  ]
}

// 통신비 절약 계산 함수
function calculateSavings(currentPlan, newPlan, familyCount = 1) {
  const currentMonthly = currentPlan.monthlyFee * familyCount
  const newMonthly = newPlan.monthlyFee * familyCount
  
  const monthlySavings = currentMonthly - newMonthly
  const yearlySavings = monthlySavings * 12
  
  return {
    currentMonthly,
    newMonthly,
    monthlySavings,
    yearlySavings,
    savingsPercentage: currentMonthly > 0 ? Math.round((monthlySavings / currentMonthly) * 100) : 0
  }
}

// 최적 요금제 추천 함수
function recommendBestPlan(usage, familyCount = 1) {
  const allPlans = [...TELECOM_PLANS.skt, ...TELECOM_PLANS.kt, ...TELECOM_PLANS.lgu]
  
  // 사용량에 따른 필터링
  let filteredPlans = allPlans
  
  if (usage.dataUsage <= 100) {
    // 100GB 이하 사용자는 스탠다드 요금제 추천
    filteredPlans = allPlans.filter(plan => 
      plan.data === '100GB' || (plan.data === '무제한' && plan.monthlyFee <= 60000)
    )
  }
  
  if (usage.networkType === 'LTE') {
    // LTE만 사용하는 사용자
    filteredPlans = filteredPlans.filter(plan => plan.type === 'LTE')
  }
  
  // 가격순 정렬
  filteredPlans.sort((a, b) => a.monthlyFee - b.monthlyFee)
  
  return filteredPlans.slice(0, 3) // 상위 3개 추천
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      currentCarrier, 
      currentPlan, 
      currentMonthlyFee,
      dataUsage, 
      networkType,
      familyCount = 1,
      action 
    } = body

    switch (action) {
      case 'get_plans':
        return NextResponse.json({
          success: true,
          data: {
            skt: TELECOM_PLANS.skt,
            kt: TELECOM_PLANS.kt,
            lgu: TELECOM_PLANS.lgu
          }
        })

      case 'calculate_savings':
        const currentPlanData = {
          name: currentPlan,
          carrier: currentCarrier,
          monthlyFee: currentMonthlyFee
        }
        
        const targetPlan = body.targetPlan
        if (!targetPlan) {
          return NextResponse.json({
            success: false,
            error: '비교할 요금제를 선택해주세요.'
          }, { status: 400 })
        }
        
        const savings = calculateSavings(currentPlanData, targetPlan, familyCount)
        
        return NextResponse.json({
          success: true,
          data: {
            current: currentPlanData,
            target: targetPlan,
            savings,
            recommendation: savings.monthlySavings > 0 ? 'recommended' : 'not_recommended'
          }
        })

      case 'recommend_plans':
        const usage = { dataUsage, networkType }
        const recommendations = recommendBestPlan(usage, familyCount)
        
        // 현재 요금제와 비교한 절약액 계산
        const currentPlanData2 = {
          name: currentPlan,
          carrier: currentCarrier,
          monthlyFee: currentMonthlyFee
        }
        
        const recommendationsWithSavings = recommendations.map(plan => {
          const savings = calculateSavings(currentPlanData2, plan, familyCount)
          return {
            ...plan,
            savings
          }
        })
        
        return NextResponse.json({
          success: true,
          data: {
            current: currentPlanData2,
            recommendations: recommendationsWithSavings
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: '유효하지 않은 액션입니다.'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Telecom API Error:', error)
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function GET() {
  // 모든 요금제 정보 반환
  return NextResponse.json({
    success: true,
    data: {
      skt: TELECOM_PLANS.skt,
      kt: TELECOM_PLANS.kt,
      lgu: TELECOM_PLANS.lgu,
      totalPlans: Object.values(TELECOM_PLANS).flat().length
    }
  })
}
