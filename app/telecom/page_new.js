'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Phone, Smartphone, Wifi, TrendingDown, ArrowRight, Calculator, Check, Loader } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px;
  background: #f9fafb;
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
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
`

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: ${spacing.md};
  border-radius: ${spacing.md};
  margin-bottom: ${spacing.lg};
  text-align: center;
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
  color: #1f2937;
  margin-bottom: ${spacing.xl};
  text-align: center;
`

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-bottom: ${spacing['2xl']};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: #374151;
`

const Input = styled.input`
  padding: ${spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: #8B5CF6;
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`

const Select = styled.select`
  padding: ${spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: #8B5CF6;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.md};
`

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  color: white;
  border: none;
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: transform ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ResultsSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['3xl']};
`

const PlansGrid = styled.div`
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

const PlanCard = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    border-color: #8B5CF6;
    transform: translateY(-4px);
    box-shadow: ${shadows.lg};
  }
`

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.md};
`

const PlanCarrier = styled.div`
  font-size: ${typography.fontSize.sm};
  color: #6b7280;
  margin-bottom: ${spacing.xs};
`

const PlanName = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: #1f2937;
`

const PlanPrice = styled.div`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: #8B5CF6;
  text-align: center;
  margin-bottom: ${spacing.md};
`

const PlanSpecs = styled.div`
  font-size: ${typography.fontSize.sm};
  color: #6b7280;
  margin-bottom: ${spacing.md};
  
  div {
    margin-bottom: ${spacing.xs};
  }
`

const SavingsInfo = styled.div`
  text-align: center;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing.md};
  color: ${props => props.$isPositive ? '#10b981' : '#ef4444'};
`

const PlanButton = styled.button`
  width: 100%;
  background: #8B5CF6;
  color: white;
  border: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${spacing.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${transitions.duration.fast};

  &:hover:not(:disabled) {
    background: #7c3aed;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ComparisonSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['3xl']};
`

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${spacing.lg};
  align-items: center;
  margin-bottom: ${spacing['2xl']};

  ${media.md} {
    gap: ${spacing['2xl']};
  }
`

const ComparisonCard = styled.div`
  text-align: center;
  padding: ${spacing.lg};
  border: 2px solid ${props => props.$isRecommended ? '#10b981' : '#e5e7eb'};
  border-radius: ${spacing.md};
  background: ${props => props.$isRecommended ? '#f0fdf4' : 'white'};
`

const CardHeader = styled.div`
  font-size: ${typography.fontSize.sm};
  color: #6b7280;
  margin-bottom: ${spacing.sm};
`

const CardContent = styled.div``

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #8B5CF6;
`

const SavingsDisplay = styled.div`
  text-align: center;
  padding: ${spacing.lg};
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border-radius: ${spacing.md};
  border: 2px solid #10b981;
`

const SavingsTitle = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: #065f46;
  margin-bottom: ${spacing.sm};
`

const SavingsAmount = styled.div`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: #10b981;
  margin-bottom: ${spacing.sm};
`

const SavingsDetails = styled.div`
  font-size: ${typography.fontSize.sm};
  color: #065f46;
`

const ChartSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['3xl']};
`

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`

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
