'use client'

import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Trash2, Calendar, DollarSign, TrendingDown, Play, Music, Video, Gamepad2, Book, Shield, Loader, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { spacing, typography, shadows, media, transitions } from '../utils/theme'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px;
  background: #f9fafb;
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  color: white;
  padding: ${spacing['2xl']} 0;
  text-align: center;

  ${media.md} {
    padding: ${spacing['4xl']} 0;
  }
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${spacing.md};

  ${media.md} {
    padding: 0 ${spacing.lg};
  }
`

const HeroTitle = styled(motion.h1)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.md};
  line-height: 1.2;

  ${media.sm} {
    font-size: ${typography.fontSize['3xl']};
    margin-bottom: ${spacing.lg};
  }

  ${media.md} {
    font-size: ${typography.fontSize['4xl']};
  }

  ${media.lg} {
    font-size: ${typography.fontSize['5xl']};
  }
`

const HeroSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.base};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${spacing.xl};
  line-height: 1.5;

  ${media.sm} {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing['2xl']};
  }

  br {
    display: none;

    ${media.sm} {
      display: block;
    }
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.md};

  ${media.sm} {
    padding: ${spacing['2xl']} ${spacing.lg};
  }

  ${media.md} {
    padding: ${spacing['4xl']} ${spacing.lg};
  }

  ${media.lg} {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
`

const SummarySection = styled.section`
  background: white;
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing['2xl']};

  ${media.sm} {
    border-radius: ${spacing.lg};
    padding: ${spacing.xl};
    box-shadow: ${shadows.lg};
  }

  ${media.md} {
    padding: ${spacing['2xl']};
    margin-bottom: ${spacing['3xl']};
  }
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.lg};
  }

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const SummaryCard = styled(motion.div)`
  background: #f9fafb;
  border-radius: ${spacing.md};
  padding: ${spacing.md};
  text-align: center;
  border-left: 4px solid ${props => props.$color || '#8B5CF6'};

  ${media.sm} {
    padding: ${spacing.lg};
  }
`

const SummaryValue = styled.div`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: #1f2937;
  margin-bottom: ${spacing.xs};

  ${media.sm} {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing.sm};
  }

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const SummaryLabel = styled.div`
  font-size: ${typography.fontSize.xs};
  color: #6b7280;

  ${media.sm} {
    font-size: ${typography.fontSize.sm};
  }
`

const ManagementSection = styled.section`
  background: white;
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing['2xl']};

  ${media.sm} {
    border-radius: ${spacing.lg};
    padding: ${spacing.xl};
    box-shadow: ${shadows.lg};
  }

  ${media.md} {
    padding: ${spacing['2xl']};
    margin-bottom: ${spacing['3xl']};
  }
`

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: #1f2937;
  margin-bottom: ${spacing.lg};

  ${media.sm} {
    font-size: ${typography.fontSize.xl};
  }

  ${media.md} {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing.xl};
  }

  ${media.lg} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const AddSubscriptionForm = styled.form`
  background: #f9fafb;
  border-radius: ${spacing.md};
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};

  ${media.sm} {
    padding: ${spacing.lg};
    margin-bottom: ${spacing.xl};
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.md} {
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
  }
`

const Input = styled.input`
  padding: ${spacing.sm};
  border: 2px solid #e5e7eb;
  border-radius: ${spacing.sm};
  font-size: ${typography.fontSize.sm};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  ${media.sm} {
    padding: ${spacing.md};
    border-radius: ${spacing.md};
    font-size: ${typography.fontSize.base};
  }

  &:focus {
    outline: none;
    border-color: #8B5CF6;
  }
`

const Select = styled.select`
  padding: ${spacing.sm};
  border: 2px solid #e5e7eb;
  border-radius: ${spacing.sm};
  font-size: ${typography.fontSize.sm};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  ${media.sm} {
    padding: ${spacing.md};
    border-radius: ${spacing.md};
    font-size: ${typography.fontSize.base};
  }

  &:focus {
    outline: none;
    border-color: #8B5CF6;
  }
`

const AddButton = styled(motion.button)`
  background: #8B5CF6;
  color: white;
  border: none;
  border-radius: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};
  width: 100%;

  ${media.sm} {
    border-radius: ${spacing.md};
    padding: ${spacing.md} ${spacing.lg};
    font-size: ${typography.fontSize.base};
    gap: ${spacing.sm};
    width: auto;
  }

  &:hover {
    background: #8B5CF6dd;
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }
`

const SubscriptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.lg};
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const SubscriptionCard = styled(motion.div)`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: ${spacing.md};
  padding: ${spacing.md};
  position: relative;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  ${media.sm} {
    padding: ${spacing.lg};
  }

  &:hover {
    border-color: #8B5CF6;
    box-shadow: ${shadows.lg};
  }
`

const ServiceIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$background || '#8B5CF6'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.sm};

  ${media.sm} {
    width: 48px;
    height: 48px;
    margin-bottom: ${spacing.md};
  }
`

const ServiceName = styled.h4`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: #1f2937;
  margin-bottom: ${spacing.xs};
  word-break: break-word;

  ${media.sm} {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing.sm};
  }
`

const ServicePrice = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: #8B5CF6;
  margin-bottom: ${spacing.xs};

  ${media.sm} {
    font-size: ${typography.fontSize.xl};
    margin-bottom: ${spacing.sm};
  }
`

const ServiceCycle = styled.div`
  font-size: ${typography.fontSize.xs};
  color: #6b7280;
  margin-bottom: ${spacing.sm};

  ${media.sm} {
    font-size: ${typography.fontSize.sm};
    margin-bottom: ${spacing.md};
  }
`

const ServiceActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NextPayment = styled.div`
  font-size: ${typography.fontSize.xs};
  color: #6b7280;
`

const DeleteButton = styled(motion.button)`
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    background: #fee2e2;
    color: #dc2626;
  }
`

const ChartSection = styled.section`
  background: white;
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing['2xl']};

  ${media.sm} {
    border-radius: ${spacing.lg};
    padding: ${spacing.xl};
    box-shadow: ${shadows.lg};
  }

  ${media.md} {
    padding: ${spacing['2xl']};
    margin-bottom: ${spacing['3xl']};
  }
`

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`

const ChartContainer = styled.div`
  height: 250px;

  ${media.sm} {
    height: 300px;
  }

  h3 {
    font-size: ${typography.fontSize.base};
    text-align: center;
    margin-bottom: ${spacing.md};

    ${media.sm} {
      font-size: ${typography.fontSize.lg};
      margin-bottom: ${spacing.lg};
    }
  }
`

// 구독 서비스 카테고리별 아이콘
const getServiceIcon = (category) => {
  const icons = {
    '동영상': Video,
    '음악': Music,
    '게임': Gamepad2,
    '도서': Book,
    '보안': Shield,
    '기타': Play
  }
  return icons[category] || Play
}

// 구독 서비스 카테고리별 색상
const getCategoryColor = (category) => {
  const colors_map = {
    '동영상': '#ef4444',
    '음악': '#10b981',
    '게임': '#3b82f6',
    '도서': '#eab308',
    '보안': '#8b5cf6',
    '기타': '#6b7280'
  }
  return colors_map[category] || '#6b7280'
}

export default function SubscriptionManager() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [alternatives, setAlternatives] = useState([])
  const [apiData, setApiData] = useState(null)
  
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    cycle: 'monthly',
    category: '동영상'
  })

  // API에서 구독 분석 데이터 가져오기
  const fetchSubscriptionData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'analyze',
          subscriptions: subscriptions
        })
      })

      if (!response.ok) {
        throw new Error('구독 분석에 실패했습니다')
      }

      const data = await response.json()
      setApiData(data)
      setRecommendations(data.recommendations || [])
      setAlternatives(data.alternatives || [])
    } catch (err) {
      console.error('구독 분석 오류:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [subscriptions])

  // 초기 데이터 로드 및 구독 변경 시 재분석
  useEffect(() => {
    // 샘플 데이터로 초기화
    const sampleSubscriptions = [
      {
        id: 1,
        name: 'Netflix',
        price: 17000,
        cycle: 'monthly',
        category: '동영상',
        nextPayment: '2024-07-15'
      },
      {
        id: 2,
        name: 'Spotify',
        price: 10900,
        cycle: 'monthly',
        category: '음악',
        nextPayment: '2024-07-20'
      },
      {
        id: 3,
        name: 'Adobe Creative Cloud',
        price: 24000,
        cycle: 'monthly',
        category: '기타',
        nextPayment: '2024-07-25'
      }
    ]
    
    setSubscriptions(sampleSubscriptions)
  }, [])

  useEffect(() => {
    if (subscriptions.length > 0) {
      const debounceTimeout = setTimeout(fetchSubscriptionData, 500)
      return () => clearTimeout(debounceTimeout)
    }
  }, [subscriptions, fetchSubscriptionData])

  // 총 비용 계산 (API 데이터 우선, 로컬 계산 fallback)
  const monthlyTotal = apiData ? apiData.monthlyTotal : subscriptions.reduce((total, sub) => {
    const monthlyPrice = sub.cycle === 'yearly' ? sub.price / 12 : sub.price
    return total + monthlyPrice
  }, 0)

  const yearlyTotal = apiData ? apiData.yearlyTotal : monthlyTotal * 12

  // 구독 추가
  const handleAddSubscription = (e) => {
    e.preventDefault()
    if (newService.name && newService.price) {
      const nextMonth = new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      
      setSubscriptions([
        ...subscriptions,
        {
          id: Date.now(),
          ...newService,
          price: Number(newService.price),
          nextPayment: nextMonth.toISOString().split('T')[0]
        }
      ])
      
      setNewService({
        name: '',
        price: '',
        cycle: 'monthly',
        category: '동영상'
      })
    }
  }

  // 구독 삭제
  const handleDeleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id))
  }

  // 차트 데이터
  const categoryData = subscriptions.reduce((acc, sub) => {
    const existing = acc.find(item => item.name === sub.category)
    const monthlyPrice = sub.cycle === 'yearly' ? sub.price / 12 : sub.price
    
    if (existing) {
      existing.value += monthlyPrice
      existing.count += 1
    } else {
      acc.push({
        name: sub.category,
        value: monthlyPrice,
        count: 1,
        color: getCategoryColor(sub.category)
      })
    }
    
    return acc
  }, [])

  const monthlySpendingData = subscriptions.map(sub => ({
    name: sub.name,
    monthly: sub.cycle === 'yearly' ? sub.price / 12 : sub.price,
    yearly: sub.cycle === 'yearly' ? sub.price : sub.price * 12
  }))

  return (
    <>
      <Header />
      <MainContainer>
        {/* 히어로 섹션 */}
        <HeroSection>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Users size={32} style={{ marginRight: '12px', display: 'inline' }} />
              구독 서비스 관리
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              모든 구독 서비스를 한눈에 관리하고 불필요한 구독을 정리하세요
              <br />
              평균 월 2만원 절약이 가능합니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          {/* 요약 섹션 */}
          <SummarySection>
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.lg }}>
                <Loader size={20} className="animate-spin" />
                <span>구독 데이터 분석 중...</span>
              </div>
            )}
            
            {error && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: spacing.sm, 
                marginBottom: spacing.lg,
                padding: spacing.md,
                backgroundColor: '#fee2e2',
                borderRadius: spacing.sm,
                color: '#dc2626'
              }}>
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            
            <SummaryGrid>
              <SummaryCard 
                $color={'#8B5CF6'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SummaryValue>{subscriptions.length}</SummaryValue>
                <SummaryLabel>활성 구독</SummaryLabel>
              </SummaryCard>
              
              <SummaryCard 
                $color={'#EC4899'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SummaryValue>
                  {loading ? '계산중...' : `${Math.round(monthlyTotal).toLocaleString()}원`}
                </SummaryValue>
                <SummaryLabel>월 총 비용</SummaryLabel>
              </SummaryCard>
              
              <SummaryCard 
                $color={'#10B981'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SummaryValue>{Math.round(yearlyTotal / 10000).toLocaleString()}만원</SummaryValue>
                <SummaryLabel>연 총 비용</SummaryLabel>
              </SummaryCard>
            </SummaryGrid>
          </SummarySection>

          {/* 구독 관리 섹션 */}
          <ManagementSection>
            <SectionTitle>구독 서비스 추가</SectionTitle>
            
            <AddSubscriptionForm onSubmit={handleAddSubscription}>
              <FormGrid>
                <Input
                  type="text"
                  placeholder="서비스명 (예: Netflix)"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="가격"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                />
                <Select
                  value={newService.cycle}
                  onChange={(e) => setNewService({...newService, cycle: e.target.value})}
                >
                  <option value="monthly">월간</option>
                  <option value="yearly">연간</option>
                </Select>
                <Select
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                >
                  <option value="동영상">동영상</option>
                  <option value="음악">음악</option>
                  <option value="게임">게임</option>
                  <option value="도서">도서</option>
                  <option value="보안">보안</option>
                  <option value="기타">기타</option>
                </Select>
                <AddButton
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={16} />
                  추가
                </AddButton>
              </FormGrid>
            </AddSubscriptionForm>

            <SectionTitle>내 구독 서비스</SectionTitle>
            
            <SubscriptionGrid>
              <AnimatePresence>
                {subscriptions.map((subscription) => {
                  const IconComponent = getServiceIcon(subscription.category)
                  return (
                    <SubscriptionCard
                      key={subscription.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ServiceIcon $background={getCategoryColor(subscription.category)}>
                        <IconComponent size={24} />
                      </ServiceIcon>
                      
                      <ServiceName>{subscription.name}</ServiceName>
                      <ServicePrice>
                        {subscription.price.toLocaleString()}원
                      </ServicePrice>
                      <ServiceCycle>
                        {subscription.cycle === 'monthly' ? '월간 구독' : '연간 구독'}
                      </ServiceCycle>
                      
                      <ServiceActions>
                        <NextPayment>
                          다음 결제: {subscription.nextPayment}
                        </NextPayment>
                        <DeleteButton
                          onClick={() => handleDeleteSubscription(subscription.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={16} />
                        </DeleteButton>
                      </ServiceActions>
                    </SubscriptionCard>
                  )
                })}
              </AnimatePresence>
            </SubscriptionGrid>
          </ManagementSection>

          {/* 차트 섹션 */}
          {subscriptions.length > 0 && (
            <ChartSection>
              <SectionTitle>구독 분석</SectionTitle>
              
              <ChartGrid>
                <div>
                  <h3 style={{ textAlign: 'center', marginBottom: spacing.lg }}>
                    카테고리별 지출
                  </h3>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={window.innerWidth < 640 ? 80 : 120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${Math.round(value).toLocaleString()}원`]}
                          contentStyle={{
                            fontSize: window.innerWidth < 640 ? '12px' : '14px',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 style={{ textAlign: 'center', marginBottom: spacing.lg }}>
                    서비스별 월 지출
                  </h3>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySpendingData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          interval={0}
                        />
                        <YAxis 
                          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()}원`]}
                          contentStyle={{
                            fontSize: window.innerWidth < 640 ? '12px' : '14px',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="monthly" fill={'#8B5CF6'} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </ChartGrid>
            </ChartSection>
          )}
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
