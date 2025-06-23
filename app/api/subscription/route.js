import { NextResponse } from 'next/server'

// 인기 구독 서비스 데이터베이스
const POPULAR_SERVICES = {
  streaming: [
    { name: 'Netflix', price: 17000, category: '동영상', description: '영화, 드라마, 다큐멘터리' },
    { name: 'Disney+', price: 9900, category: '동영상', description: 'Disney, Marvel, Star Wars 컨텐츠' },
    { name: 'Watcha', price: 10900, category: '동영상', description: '한국 영화, 드라마 중심' },
    { name: 'Wavve', price: 10900, category: '동영상', description: 'KBS, MBC, SBS 컨텐츠' },
    { name: 'Tving', price: 10900, category: '동영상', description: 'CJ ENM 오리지널 컨텐츠' },
    { name: 'Apple TV+', price: 6500, category: '동영상', description: 'Apple 오리지널 컨텐츠' }
  ],
  music: [
    { name: 'Spotify', price: 10900, category: '음악', description: '전 세계 음악 스트리밍' },
    { name: 'Apple Music', price: 10900, category: '음악', description: 'Apple 음악 서비스' },
    { name: 'YouTube Music', price: 10900, category: '음악', description: 'YouTube 뮤직 스트리밍' },
    { name: 'Melon', price: 10900, category: '음악', description: '국내 최대 음원 사이트' },
    { name: 'Genie', price: 9900, category: '음악', description: 'KT 음원 서비스' },
    { name: 'Bugs', price: 10900, category: '음악', description: 'NHN 음원 서비스' }
  ],
  gaming: [
    { name: 'Xbox Game Pass', price: 12900, category: '게임', description: 'Xbox 게임 구독' },
    { name: 'PlayStation Plus', price: 16500, category: '게임', description: 'PlayStation 게임 구독' },
    { name: 'Nintendo Switch Online', price: 4900, category: '게임', description: '닌텐도 온라인 서비스' },
    { name: 'Apple Arcade', price: 6500, category: '게임', description: 'Apple 게임 구독' }
  ],
  productivity: [
    { name: 'Microsoft 365', price: 13900, category: '생산성', description: 'Office 앱 및 클라우드' },
    { name: 'Adobe Creative Cloud', price: 24900, category: '생산성', description: 'Adobe 창작 도구' },
    { name: 'Notion', price: 8000, category: '생산성', description: '노트 및 협업 도구' },
    { name: 'Figma', price: 15000, category: '생산성', description: '디자인 협업 도구' }
  ],
  news: [
    { name: '조선일보 프리미엄', price: 9900, category: '뉴스', description: '조선일보 디지털 구독' },
    { name: '중앙일보 프리미엄', price: 9900, category: '뉴스', description: '중앙일보 디지털 구독' },
    { name: '한국경제 프리미엄', price: 9900, category: '뉴스', description: '한국경제 디지털 구독' }
  ]
}

// 구독 분석 함수
function analyzeSubscriptions(subscriptions) {
  if (!subscriptions || subscriptions.length === 0) {
    return {
      totalMonthly: 0,
      totalYearly: 0,
      categories: {},
      recommendations: [],
      unusedWarnings: []
    }
  }

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + (sub.price || 0), 0)
  const totalYearly = totalMonthly * 12

  // 카테고리별 분석
  const categories = {}
  subscriptions.forEach(sub => {
    const category = sub.category || '기타'
    if (!categories[category]) {
      categories[category] = {
        count: 0,
        totalPrice: 0,
        services: []
      }
    }
    categories[category].count++
    categories[category].totalPrice += sub.price || 0
    categories[category].services.push(sub.name)
  })

  // 중복 서비스 감지
  const duplicateCategories = Object.entries(categories)
    .filter(([category, data]) => data.count > 1 && category === '동영상')
    .map(([category, data]) => ({
      category,
      count: data.count,
      totalPrice: data.totalPrice,
      services: data.services,
      potentialSaving: Math.round(data.totalPrice * 0.5) // 50% 절약 가능 추정
    }))

  // 사용하지 않는 구독 경고 (가격이 높은 순)
  const unusedWarnings = subscriptions
    .filter(sub => sub.price > 10000)
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
    .map(sub => ({
      name: sub.name,
      price: sub.price,
      category: sub.category,
      warning: '고액 구독서비스입니다. 사용 빈도를 확인해보세요.'
    }))

  // 절약 추천
  const recommendations = []
  
  if (duplicateCategories.length > 0) {
    recommendations.push({
      type: 'duplicate_removal',
      title: '중복 구독 정리',
      description: `${duplicateCategories[0].category} 서비스가 ${duplicateCategories[0].count}개 있습니다. 1-2개로 줄이시면 월 ${duplicateCategories[0].potentialSaving.toLocaleString()}원 절약 가능합니다.`,
      potentialSaving: duplicateCategories[0].potentialSaving
    })
  }

  if (totalMonthly > 50000) {
    recommendations.push({
      type: 'total_reduction',
      title: '구독 개수 줄이기',
      description: '월 구독료가 5만원을 초과합니다. 자주 사용하지 않는 서비스를 정리해보세요.',
      potentialSaving: Math.round(totalMonthly * 0.2)
    })
  }

  // 번들 상품 추천
  const hasNetflix = subscriptions.some(sub => sub.name.includes('Netflix'))
  const hasSpotify = subscriptions.some(sub => sub.name.includes('Spotify'))
  if (hasNetflix && hasSpotify) {
    recommendations.push({
      type: 'bundle_offer',
      title: '번들 상품 이용',
      description: '통신사 번들 상품을 이용하면 개별 구독보다 저렴할 수 있습니다.',
      potentialSaving: Math.round((17000 + 10900) * 0.15)
    })
  }

  return {
    totalMonthly,
    totalYearly,
    categories,
    duplicateCategories,
    recommendations,
    unusedWarnings,
    stats: {
      averagePerService: Math.round(totalMonthly / subscriptions.length),
      mostExpensive: subscriptions.reduce((max, sub) => 
        (sub.price || 0) > (max.price || 0) ? sub : max, subscriptions[0]),
      cheapest: subscriptions.reduce((min, sub) => 
        (sub.price || 0) < (min.price || 0) ? sub : min, subscriptions[0])
    }
  }
}

// 구독 최적화 제안 함수
function generateOptimizationSuggestions(subscriptions) {
  const suggestions = []
  
  // 카테고리별 분석
  const categoryCount = {}
  subscriptions.forEach(sub => {
    const category = sub.category || '기타'
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })

  // 동영상 스트리밍 최적화
  if (categoryCount['동영상'] > 2) {
    suggestions.push({
      category: '동영상',
      type: 'consolidation',
      title: '스트리밍 서비스 통합',
      current: categoryCount['동영상'],
      recommended: 1,
      reason: '대부분의 컨텐츠가 겹치므로 1-2개 서비스만 유지하는 것이 경제적입니다.',
      estimatedSaving: Math.round(
        subscriptions
          .filter(sub => sub.category === '동영상')
          .reduce((sum, sub) => sum + sub.price, 0) * 0.6
      )
    })
  }

  // 음악 스트리밍 최적화
  if (categoryCount['음악'] > 1) {
    suggestions.push({
      category: '음악',
      type: 'consolidation', 
      title: '음악 서비스 통합',
      current: categoryCount['음악'],
      recommended: 1,
      reason: '음악 스트리밍 서비스는 1개만 있으면 충분합니다.',
      estimatedSaving: Math.round(
        subscriptions
          .filter(sub => sub.category === '음악')
          .reduce((sum, sub) => sum + sub.price, 0) * 0.5
      )
    })
  }

  // 연간 결제 할인 제안
  const monthlyServices = subscriptions.filter(sub => sub.price > 10000)
  if (monthlyServices.length > 0) {
    suggestions.push({
      category: '결제',
      type: 'annual_discount',
      title: '연간 결제 할인',
      services: monthlyServices.map(sub => sub.name),
      reason: '연간 결제시 보통 10-20% 할인을 받을 수 있습니다.',
      estimatedSaving: Math.round(
        monthlyServices.reduce((sum, sub) => sum + sub.price, 0) * 12 * 0.15
      )
    })
  }

  return suggestions
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { action, subscriptions, category } = body

    switch (action) {
      case 'analyze_subscriptions':
        if (!subscriptions || !Array.isArray(subscriptions)) {
          return NextResponse.json({
            success: false,
            error: '구독 서비스 목록이 필요합니다.'
          }, { status: 400 })
        }

        const analysis = analyzeSubscriptions(subscriptions)
        const suggestions = generateOptimizationSuggestions(subscriptions)

        return NextResponse.json({
          success: true,
          data: {
            analysis,
            suggestions
          }
        })

      case 'get_popular_services':
        const popularServices = category && POPULAR_SERVICES[category] 
          ? POPULAR_SERVICES[category]
          : Object.values(POPULAR_SERVICES).flat()

        return NextResponse.json({
          success: true,
          data: {
            services: popularServices,
            categories: Object.keys(POPULAR_SERVICES)
          }
        })

      case 'calculate_savings':
        const { currentSubscriptions, removedSubscriptions } = body
        
        if (!currentSubscriptions || !removedSubscriptions) {
          return NextResponse.json({
            success: false,
            error: '현재 구독과 제거할 구독 정보가 필요합니다.'
          }, { status: 400 })
        }

        const currentTotal = currentSubscriptions.reduce((sum, sub) => sum + sub.price, 0)
        const removedTotal = removedSubscriptions.reduce((sum, sub) => sum + sub.price, 0)
        
        const monthlySaving = removedTotal
        const yearlySaving = monthlySaving * 12
        const newTotal = currentTotal - removedTotal

        return NextResponse.json({
          success: true,
          data: {
            before: {
              monthly: currentTotal,
              yearly: currentTotal * 12,
              count: currentSubscriptions.length
            },
            after: {
              monthly: newTotal,
              yearly: newTotal * 12,
              count: currentSubscriptions.length - removedSubscriptions.length
            },
            savings: {
              monthly: monthlySaving,
              yearly: yearlySaving,
              percentage: Math.round((monthlySaving / currentTotal) * 100)
            }
          }
        })

      case 'recommend_alternatives':
        const { targetService } = body
        
        if (!targetService) {
          return NextResponse.json({
            success: false,
            error: '대상 서비스 정보가 필요합니다.'
          }, { status: 400 })
        }

        // 같은 카테고리의 더 저렴한 대안 찾기
        const alternatives = Object.values(POPULAR_SERVICES)
          .flat()
          .filter(service => 
            service.category === targetService.category && 
            service.price < targetService.price &&
            service.name !== targetService.name
          )
          .sort((a, b) => a.price - b.price)
          .slice(0, 3)

        return NextResponse.json({
          success: true,
          data: {
            target: targetService,
            alternatives: alternatives.map(alt => ({
              ...alt,
              saving: targetService.price - alt.price,
              yearlySaving: (targetService.price - alt.price) * 12
            }))
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: '유효하지 않은 액션입니다.'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Subscription API Error:', error)
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function GET() {
  // 인기 구독 서비스 목록 반환
  const allServices = Object.values(POPULAR_SERVICES).flat()
  const totalServices = allServices.length
  const averagePrice = Math.round(
    allServices.reduce((sum, service) => sum + service.price, 0) / totalServices
  )

  return NextResponse.json({
    success: true,
    data: {
      popularServices: POPULAR_SERVICES,
      stats: {
        totalServices,
        averagePrice,
        categories: Object.keys(POPULAR_SERVICES).length,
        priceRange: {
          min: Math.min(...allServices.map(s => s.price)),
          max: Math.max(...allServices.map(s => s.price))
        }
      }
    }
  })
}
