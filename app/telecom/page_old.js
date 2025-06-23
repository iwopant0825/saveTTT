'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Phone, Smartphone, Wifi, TrendingDown, ArrowRight, Calculator, Check, Loader } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px;
  background: ${colors.gray[50]};
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.secondary[500]} 100%);
  color: white;
  padding: ${spacing['4xl']} 0;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${spacing.lg};
`

const HeroTitle = styled(motion.h1)`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.lg};

  ${media.md} {
    font-size: ${typography.fontSize['5xl']};
  }
`

const HeroSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.lg};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${spacing['2xl']};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing['4xl']} ${spacing.lg};

  ${media.md} {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
`

const CalculatorSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['3xl']};
`

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xl};
  text-align: center;

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
`

const Select = styled.select`
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
  }
`

const Input = styled.input`
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
  }
`

const CurrentPlanCard = styled.div`
  background: ${colors.gray[100]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  margin-top: ${spacing.lg};
`

const ResultsSection = styled(motion.div)`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['3xl']};
`

const SavingsHighlight = styled.div`
  background: linear-gradient(135deg, ${colors.secondary[500]}, ${colors.secondary[600]});
  color: white;
  border-radius: ${spacing.lg};
  padding: ${spacing.xl};
  text-align: center;
  margin-bottom: ${spacing.xl};
`

const SavingsAmount = styled.div`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.sm};
`

const SavingsText = styled.div`
  font-size: ${typography.fontSize.lg};
  opacity: 0.9;
`

const ComparisonTable = styled.div`
  overflow-x: auto;
  margin-bottom: ${spacing.xl};
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`

const TableHeader = styled.th`
  background: ${colors.gray[50]};
  padding: ${spacing.md};
  text-align: left;
  font-weight: ${typography.fontWeight.semibold};
  border-bottom: 2px solid ${colors.gray[200]};
`

const TableCell = styled.td`
  padding: ${spacing.md};
  border-bottom: 1px solid ${colors.gray[200]};
  vertical-align: top;
`

const RecommendedBadge = styled.span`
  background: ${colors.secondary[500]};
  color: white;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${spacing.sm};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  margin-left: ${spacing.sm};
`

const ChartContainer = styled.div`
  height: 300px;
  margin: ${spacing.xl} 0;
`

const TipsSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['3xl']};
`

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const TipCard = styled(motion.div)`
  background: ${colors.gray[50]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  border-left: 4px solid ${colors.secondary[500]};
`

const TipIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${colors.secondary[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md};
  color: ${colors.secondary[600]};
`

const TipTitle = styled.h4`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.sm};
`

const TipDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
`

const ActionButton = styled(motion.button)`
  background: ${colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${spacing.md};
  padding: ${spacing.md} ${spacing.xl};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin: ${spacing.xl} auto 0 auto;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    background: ${colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }
`

// 통신사 요금제 데이터
const carriers = {
  'SKT': [
    { name: '5G 스탠다드', price: 75000, data: '150GB', call: '무제한' },
    { name: '5G 프리미엄', price: 95000, data: '300GB', call: '무제한' },
    { name: '5G 언리미티드', price: 125000, data: '무제한', call: '무제한' },
  ],
  'KT': [
    { name: '5G Y틴', price: 65000, data: '100GB', call: '무제한' },
    { name: '5G Y베이직', price: 85000, data: '200GB', call: '무제한' },
    { name: '5G Y프리미엄', price: 120000, data: '무제한', call: '무제한' },
  ],
  'LG U+': [
    { name: '5G 라이트', price: 70000, data: '120GB', call: '무제한' },
    { name: '5G 스페셜', price: 90000, data: '250GB', call: '무제한' },
    { name: '5G 프리미엄 플러스', price: 130000, data: '무제한', call: '무제한' },
  ]
}

const savingsTips = [
  {
    icon: Smartphone,
    title: '가족 요금제 활용',
    description: '가족 구성원이 2명 이상이면 가족 요금제로 추가 할인을 받을 수 있습니다.'
  },
  {
    icon: Wifi,
    title: 'WiFi 적극 활용',
    description: '집과 직장에서 WiFi를 사용해 데이터 사용량을 줄이고 더 저렴한 요금제를 선택하세요.'
  },
  {
    icon: Calculator,
    title: '불필요한 부가서비스 해지',
    description: '사용하지 않는 컬러링, 벨소리 등의 부가서비스를 해지하여 월 1-2만원 절약하세요.'
  },
  {
    icon: TrendingDown,
    title: '알뜰폰 고려',
    description: '통화품질은 같지만 30-50% 저렴한 알뜰폰 요금제를 고려해보세요.'
  },
  {
    icon: Check,
    title: '약정 할인 활용',
    description: '24개월 약정을 통해 월 1-2만원 추가 할인을 받을 수 있습니다.'
  },
  {
    icon: ArrowRight,
    title: '정기적인 요금제 점검',
    description: '6개월마다 요금제를 점검하여 새로운 할인 혜택을 놓치지 마세요.'
  }
]

export default function TelecomCalculator() {
  // 상태 관리
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [plans, setPlans] = useState({ skt: [], kt: [], lgu: [] })
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [results, setResults] = useState(null)
  
  // 폼 데이터
  const [formData, setFormData] = useState({
    currentCarrier: '',
    currentPlan: '',
    currentMonthlyFee: '',
    dataUsage: '',
    networkType: '5G',
    familyCount: 1
  })

  // 컴포넌트 마운트시 요금제 정보 가져오기
  useEffect(() => {
    fetchPlans()
  }, [])

  // 요금제 정보 가져오기
  const fetchPlans = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/telecom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_plans' })
      })
      
      const data = await response.json()
      if (data.success) {
        setPlans(data.data)
      } else {
        setError(data.error || '요금제 정보를 가져오는데 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 폼 입력 핸들러
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  // 요금제 비교 계산
  const calculateSavings = async (targetPlan) => {
    if (!formData.currentMonthlyFee) {
      setError('현재 요금을 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/telecom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'calculate_savings',
          currentCarrier: formData.currentCarrier,
          currentPlan: formData.currentPlan,
          currentMonthlyFee: parseInt(formData.currentMonthlyFee),
          familyCount: formData.familyCount,
          targetPlan
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setResults(data.data)
        setSelectedPlan(targetPlan)
      } else {
        setError(data.error || '계산 중 오류가 발생했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 최적 요금제 추천
  const getRecommendations = async () => {
    if (!formData.currentMonthlyFee || !formData.dataUsage) {
      setError('현재 요금과 데이터 사용량을 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/telecom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recommend_plans',
          currentCarrier: formData.currentCarrier,
          currentPlan: formData.currentPlan,
          currentMonthlyFee: parseInt(formData.currentMonthlyFee),
          dataUsage: parseInt(formData.dataUsage),
          networkType: formData.networkType,
          familyCount: formData.familyCount
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setResults(data.data)
      } else {
        setError(data.error || '추천 계산 중 오류가 발생했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 차트 데이터 생성
  const generateChartData = () => {
    if (!results) return []
    
    if (results.recommendations) {
      return results.recommendations.slice(0, 4).map(plan => ({
        name: `${plan.carrier}\n${plan.name}`,
        현재요금: results.current.monthlyFee,
        추천요금: plan.monthlyFee,
        절약액: plan.savings.monthlySavings
      }))
    } else if (results.target) {
      return [{
        name: `${results.target.carrier}\n${results.target.name}`,
        현재요금: results.current.monthlyFee,
        추천요금: results.target.monthlyFee,
        절약액: results.savings.monthlySavings
      }]
    }
    
    return []
  }

  const chartData = generateChartData()

  return (
    <>
      <Header />
      <MainContainer>
        {/* 히어로 섹션 */}
        <HeroSection>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              📱 통신비 절약 계산기
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              현재 요금제를 분석하고 최적의 요금제를 추천드립니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          {/* 현재 요금제 입력 섹션 */}
          <CalculatorSection>
            <SectionTitle>현재 요금제 정보</SectionTitle>
            <InputGrid>
              <FormGroup>
                <Label>통신사</Label>
                <Select 
                  value={formData.currentCarrier}
                  onChange={(e) => handleInputChange('currentCarrier', e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="skt">SK텔레콤</option>
                  <option value="kt">KT</option>
                  <option value="lgu">LG유플러스</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>요금제명</Label>
                <Input
                  type="text"
                  placeholder="현재 요금제명"
                  value={formData.currentPlan}
                  onChange={(e) => handleInputChange('currentPlan', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>월 요금 (원)</Label>
                <Input
                  type="number"
                  placeholder="현재 월 요금"
                  value={formData.currentMonthlyFee}
                  onChange={(e) => handleInputChange('currentMonthlyFee', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>월 데이터 사용량 (GB)</Label>
                <Input
                  type="number"
                  placeholder="예: 50"
                  value={formData.dataUsage}
                  onChange={(e) => handleInputChange('dataUsage', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>네트워크 타입</Label>
                <Select 
                  value={formData.networkType}
                  onChange={(e) => handleInputChange('networkType', e.target.value)}
                >
                  <option value="5G">5G</option>
                  <option value="LTE">LTE</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>가족 구성원 수</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.familyCount}
                  onChange={(e) => handleInputChange('familyCount', parseInt(e.target.value))}
                />
              </FormGroup>
            </InputGrid>

            <ButtonGroup>
              <PrimaryButton 
                onClick={getRecommendations}
                disabled={loading}
              >
                {loading ? <Loader className="animate-spin" size={20} /> : <Calculator size={20} />}
                최적 요금제 찾기
              </PrimaryButton>
            </ButtonGroup>
          </CalculatorSection>

          {/* 추천 요금제 섹션 */}
          {results && results.recommendations && (
            <ResultsSection>
              <SectionTitle>추천 요금제</SectionTitle>
              <PlansGrid>
                {results.recommendations.map((plan, index) => (
                  <PlanCard key={plan.id}>
                    <PlanHeader>
                      <PlanCarrier>{plan.carrier}</PlanCarrier>
                      <PlanName>{plan.name}</PlanName>
                    </PlanHeader>
                    <PlanPrice>{plan.monthlyFee.toLocaleString()}원/월</PlanPrice>
                    <PlanSpecs>
                      <div>데이터: {plan.data}</div>
                      <div>음성: {plan.voice}</div>
                      <div>문자: {plan.message}</div>
                    </PlanSpecs>
                    <SavingsInfo $isPositive={plan.savings.monthlySavings > 0}>
                      월 {Math.abs(plan.savings.monthlySavings).toLocaleString()}원 
                      {plan.savings.monthlySavings > 0 ? ' 절약' : ' 추가'}
                    </SavingsInfo>
                    <PlanButton 
                      onClick={() => calculateSavings(plan)}
                      disabled={loading}
                    >
                      상세 분석
                    </PlanButton>
                  </PlanCard>
                ))}
              </PlansGrid>
            </ResultsSection>
          )}

          {/* 비교 결과 섹션 */}
          {results && results.target && (
            <ComparisonSection>
              <SectionTitle>상세 비교 결과</SectionTitle>
              <ComparisonGrid>
                <ComparisonCard>
                  <CardHeader>현재 요금제</CardHeader>
                  <CardContent>
                    <PlanName>{results.current.name}</PlanName>
                    <PlanPrice>{results.current.monthlyFee.toLocaleString()}원/월</PlanPrice>
                  </CardContent>
                </ComparisonCard>
                
                <ArrowContainer>
                  <ArrowRight size={32} />
                </ArrowContainer>
                
                <ComparisonCard $isRecommended>
                  <CardHeader>추천 요금제</CardHeader>
                  <CardContent>
                    <PlanName>{results.target.name}</PlanName>
                    <PlanPrice>{results.target.monthlyFee.toLocaleString()}원/월</PlanPrice>
                  </CardContent>
                </ComparisonCard>
              </ComparisonGrid>
              
              <SavingsDisplay>
                <SavingsTitle>절약 효과</SavingsTitle>
                <SavingsAmount>
                  월 {results.savings.monthlySavings.toLocaleString()}원 절약
                </SavingsAmount>
                <SavingsDetails>
                  연간 {results.savings.yearlySavings.toLocaleString()}원 절약
                  ({results.savings.savingsPercentage}% 할인)
                </SavingsDetails>
              </SavingsDisplay>
            </ComparisonSection>
          )}

          {/* 차트 섹션 */}
          {chartData.length > 0 && (
            <ChartSection>
              <SectionTitle>요금 비교 차트</SectionTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value.toLocaleString()}원`} />
                    <Tooltip 
                      formatter={(value) => [`${value.toLocaleString()}원`]}
                    />
                    <Bar dataKey="현재요금" fill="#ef4444" />
                    <Bar dataKey="추천요금" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartSection>
          )}
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
    { name: '유지 비용', value: currentPrice - savings, color: colors.gray[400] }
  ]

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
              <Phone size={32} style={{ marginRight: '12px', display: 'inline' }} />
              통신비 절약 계산기
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              3대 통신사 요금제를 비교하고 최적의 요금제를 찾아보세요
              <br />
              평균 월 3만원 절약이 가능합니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          {/* 현재 요금제 입력 섹션 */}
          <CalculatorSection>
            <SectionTitle>현재 요금제 정보를 입력해주세요</SectionTitle>
            
            <FormGrid>
              <FormSection>
                <FormGroup>
                  <Label>현재 통신사</Label>
                  <Select 
                    value={currentCarrier} 
                    onChange={(e) => setCurrentCarrier(e.target.value)}
                  >
                    <option value="">통신사를 선택하세요</option>
                    <option value="SKT">SKT</option>
                    <option value="KT">KT</option>
                    <option value="LG U+">LG U+</option>
                    <option value="알뜰폰">알뜰폰</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>월 요금 (원)</Label>
                  <Input
                    type="number"
                    placeholder="예: 85000"
                    value={currentPrice || ''}
                    onChange={(e) => setCurrentPrice(Number(e.target.value))}
                  />
                </FormGroup>
              </FormSection>

              <FormSection>
                <FormGroup>
                  <Label>현재 요금제명 (선택사항)</Label>
                  <Input
                    type="text"
                    placeholder="예: 5G 스페셜"
                    value={currentPlan}
                    onChange={(e) => setCurrentPlan(e.target.value)}
                  />
                </FormGroup>

                {currentCarrier && currentPrice > 0 && (
                  <CurrentPlanCard>
                    <h4 style={{ marginBottom: spacing.sm, color: colors.text.primary }}>현재 정보</h4>
                    <p><strong>통신사:</strong> {currentCarrier}</p>
                    <p><strong>월 요금:</strong> {currentPrice.toLocaleString()}원</p>
                    {currentPlan && <p><strong>요금제:</strong> {currentPlan}</p>}
                  </CurrentPlanCard>
                )}
              </FormSection>
            </FormGrid>
          </CalculatorSection>

          {/* 결과 섹션 */}
          {showResults && (
            <ResultsSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>절약 가능한 요금제</SectionTitle>

              {savings > 0 && (
                <SavingsHighlight>
                  <SavingsAmount>
                    월 {savings.toLocaleString()}원 절약
                  </SavingsAmount>
                  <SavingsText>
                    연간 {(savings * 12).toLocaleString()}원 절약 가능
                  </SavingsText>
                </SavingsHighlight>
              )}

              {/* 비교 테이블 */}
              <ComparisonTable>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>통신사</TableHeader>
                      <TableHeader>요금제명</TableHeader>
                      <TableHeader>월 요금</TableHeader>
                      <TableHeader>데이터</TableHeader>
                      <TableHeader>통화</TableHeader>
                      <TableHeader>절약액</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedPlans.map((plan, index) => (
                      <tr key={`${plan.carrier}-${plan.name}`}>
                        <TableCell>
                          {plan.carrier}
                          {index === 0 && <RecommendedBadge>추천</RecommendedBadge>}
                        </TableCell>
                        <TableCell>{plan.name}</TableCell>
                        <TableCell>
                          <strong>{plan.price.toLocaleString()}원</strong>
                        </TableCell>
                        <TableCell>{plan.data}</TableCell>
                        <TableCell>{plan.call}</TableCell>
                        <TableCell>
                          <span style={{ color: colors.secondary[600], fontWeight: 'bold' }}>
                            -{plan.savings.toLocaleString()}원
                          </span>
                          <br />
                          <small>({plan.savingsPercent}% 절약)</small>
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ComparisonTable>

              {/* 차트 섹션 */}
              {chartData.length > 0 && (
                <>
                  <SectionTitle>요금 비교 차트</SectionTitle>
                  
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          interval={0}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `${value.toLocaleString()}원`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()}원`]}
                        />
                        <Bar dataKey="현재요금" fill={colors.gray[400]} />
                        <Bar dataKey="추천요금" fill={colors.primary[500]} />
                        <Bar dataKey="절약액" fill={colors.secondary[500]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <ChartContainer>
                    <h3 style={{ textAlign: 'center', marginBottom: spacing.lg }}>
                      월 절약 비율
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()}원`]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </>
              )}
            </ResultsSection>
          )}

          {/* 절약 팁 섹션 */}
          <TipsSection>
            <SectionTitle>통신비 절약 꿀팁</SectionTitle>
            <TipsGrid>
              {savingsTips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <TipCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TipIcon>
                      <IconComponent size={24} />
                    </TipIcon>
                    <TipTitle>{tip.title}</TipTitle>
                    <TipDescription>{tip.description}</TipDescription>
                  </TipCard>
                )
              })}
            </TipsGrid>

            {currentPrice > 0 && savings > 0 && (
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // 결과 공유 또는 상담 신청 기능
                  alert('상담 신청 기능은 준비 중입니다!')
                }}
              >
                <Phone size={20} />
                무료 상담 신청하기
              </ActionButton>
            )}
          </TipsSection>
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
