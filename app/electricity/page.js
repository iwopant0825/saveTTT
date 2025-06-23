'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Bolt, Lightbulb, Thermometer, TrendingDown, Calculator, Leaf, Home, DollarSign, Loader, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px;
  background: ${colors.gray[50]};
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.accent.orange} 0%, ${colors.accent.yellow} 100%);
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

const CalculatorSection = styled.section`
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
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
  text-align: center;

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

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.xl};
  }
`

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  ${media.sm} {
    gap: ${spacing.lg};
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};

  ${media.sm} {
    gap: ${spacing.sm};
  }
`

const Label = styled.label`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.secondary};

  ${media.sm} {
    font-size: ${typography.fontSize.sm};
  }
`

const SliderContainer = styled.div`
  padding: ${spacing.md} 0;
`

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: ${colors.gray[200]};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${colors.accent.orange};
    cursor: pointer;
    box-shadow: ${shadows.base};
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${colors.accent.orange};
    cursor: pointer;
    border: none;
    box-shadow: ${shadows.base};
  }
`

const SliderValue = styled.div`
  text-align: center;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.accent.orange};
  margin-top: ${spacing.sm};
`

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  cursor: pointer;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    border-color: ${colors.accent.orange};
    background: ${colors.accent.orange}05;
  }

  ${props => props.$checked && `
    border-color: ${colors.accent.orange};
    background: ${colors.accent.orange}10;
  `}
`

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
`

const CheckboxLabel = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.primary};
  font-weight: ${typography.fontWeight.medium};
`

const CheckboxSavings = styled.span`
  font-size: ${typography.fontSize.xs};
  color: ${colors.secondary[600]};
  margin-left: auto;
`

const CurrentUsageCard = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StatCard = styled.div`
  background: ${colors.gray[50]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  text-align: center;
`

const StatValue = styled.div`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.accent.orange};
  margin-bottom: ${spacing.sm};
`

const StatLabel = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
`

const ChartContainer = styled.div`
  height: 300px;
  margin: ${spacing.xl} 0;
`

// 절약 방법 데이터
const savingMethods = [
  {
    id: 'led',
    label: 'LED 전구 교체',
    description: '기존 전구를 LED로 교체',
    savings: 15,
    cost: 50000,
    icon: Lightbulb
  },
  {
    id: 'aircon',
    label: '에어컨 온도 조절',
    description: '여름 26°C, 겨울 20°C 유지',
    savings: 20,
    cost: 0,
    icon: Thermometer
  },
  {
    id: 'insulation',
    label: '단열재 보강',
    description: '창문 단열 필름, 문풍지 설치',
    savings: 25,
    cost: 100000,
    icon: Home
  },
  {
    id: 'powerstrip',
    label: '대기전력 차단',
    description: '멀티탭 스위치로 대기전력 차단',
    savings: 10,
    cost: 30000,
    icon: Bolt
  },
  {
    id: 'appliance',
    label: '고효율 가전제품',
    description: '에너지 효율 1등급 제품 사용',
    savings: 30,
    cost: 500000,
    icon: DollarSign
  },
  {
    id: 'usage',
    label: '사용 패턴 개선',
    description: '피크 시간대 사용량 줄이기',
    savings: 15,
    cost: 0,
    icon: TrendingDown
  }
]

// 월별 평균 전기 사용량 (kWh)
const monthlyUsagePattern = [
  { month: '1월', usage: 1.2 },
  { month: '2월', usage: 1.1 },
  { month: '3월', usage: 0.9 },
  { month: '4월', usage: 0.8 },
  { month: '5월', usage: 0.9 },
  { month: '6월', usage: 1.1 },
  { month: '7월', usage: 1.4 },
  { month: '8월', usage: 1.5 },
  { month: '9월', usage: 1.2 },
  { month: '10월', usage: 0.9 },
  { month: '11월', usage: 1.0 },
  { month: '12월', usage: 1.3 }
]

export default function ElectricityCalculator() {
  const [monthlyUsage, setMonthlyUsage] = useState(300) // kWh
  const [selectedMethods, setSelectedMethods] = useState([])
  const [currentBill, setCurrentBill] = useState(0)
  const [optimizedBill, setOptimizedBill] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiData, setApiData] = useState(null)

  // API를 통한 전기요금 계산
  const calculateElectricityBill = async (usage, month = new Date().getMonth() + 1) => {
    try {
      setLoading(true)
      const response = await fetch('/api/electricity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'calculate',
          usage: usage,
          month: month
        })
      })

      if (!response.ok) {
        throw new Error('전기요금 계산에 실패했습니다')
      }

      const data = await response.json()
      return data.totalBill
    } catch (err) {
      console.error('전기요금 계산 오류:', err)
      setError(err.message)
      return 0
    } finally {
      setLoading(false)
    }
  }

  // 절약 방법 적용 계산 및 API 호출
  useEffect(() => {
    const calculateSavings = async () => {
      if (monthlyUsage <= 0) {
        setShowResults(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // 절약 분석 API 호출
        const response = await fetch('/api/electricity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'analyze',
            usage: monthlyUsage,
            selectedMethods: selectedMethods
          })
        })

        if (!response.ok) {
          throw new Error('절약 분석에 실패했습니다')
        }

        const data = await response.json()
        setApiData(data)
        setCurrentBill(data.currentBill)
        setOptimizedBill(data.optimizedBill)
        setTotalSavings(data.savings)
        setShowResults(true)
      } catch (err) {
        console.error('절약 분석 오류:', err)
        setError(err.message)
        setShowResults(false)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimeout = setTimeout(calculateSavings, 500)
    return () => clearTimeout(debounceTimeout)
  }, [monthlyUsage, selectedMethods])

  const handleMethodToggle = (methodId) => {
    setSelectedMethods(prev => 
      prev.includes(methodId) 
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    )
  }

  // 차트 데이터
  const usageChartData = apiData ? apiData.monthlyProjection : monthlyUsagePattern.map(item => ({
    ...item,
    현재사용량: Math.round(monthlyUsage * item.usage),
    절약후사용량: Math.round(monthlyUsage * item.usage * 0.85),
    현재요금: Math.round(monthlyUsage * item.usage * 150),
    절약후요금: Math.round(monthlyUsage * item.usage * 150 * 0.85)
  }))

  const pieData = [
    { name: '절약 금액', value: totalSavings, color: colors.secondary[500] },
    { name: '유지 비용', value: optimizedBill, color: colors.gray[400] }
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
              <Bolt size={32} style={{ marginRight: '12px', display: 'inline' }} />
              전기요금 절약 시뮬레이터
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              사용량별 시뮬레이션으로 전기요금을 효과적으로 줄여보세요
              <br />
              평균 월 5만원 절약이 가능합니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          {/* 사용량 입력 섹션 */}
          <CalculatorSection>
            <SectionTitle>월 전기 사용량을 입력해주세요</SectionTitle>
            
            <InputGrid>
              <InputSection>
                <FormGroup>
                  <Label>월 전기 사용량 (kWh)</Label>
                  <SliderContainer>
                    <Slider
                      type="range"
                      min="50"
                      max="800"
                      value={monthlyUsage}
                      onChange={(e) => setMonthlyUsage(Number(e.target.value))}
                    />
                    <SliderValue>{monthlyUsage} kWh</SliderValue>
                  </SliderContainer>
                </FormGroup>

                {monthlyUsage > 0 && (
                  <CurrentUsageCard>
                    <h4 style={{ marginBottom: spacing.sm, color: colors.text.primary }}>현재 예상 요금</h4>
                    {loading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                        <Loader size={16} className="animate-spin" />
                        <span>계산 중...</span>
                      </div>
                    ) : error ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, color: colors.error[600] }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </div>
                    ) : (
                      <>
                        <p><strong>월 사용량:</strong> {monthlyUsage} kWh</p>
                        <p><strong>예상 요금:</strong> {currentBill.toLocaleString()}원</p>
                        <p><strong>연간 예상:</strong> {(currentBill * 12).toLocaleString()}원</p>
                      </>
                    )}
                  </CurrentUsageCard>
                )}
              </InputSection>

              <InputSection>
                <FormGroup>
                  <Label>절약 방법 선택 (중복 선택 가능)</Label>
                  <CheckboxGroup>
                    {savingMethods.map((method) => {
                      const IconComponent = method.icon
                      const isChecked = selectedMethods.includes(method.id)
                      return (
                        <CheckboxItem 
                          key={method.id}
                          $checked={isChecked}
                        >
                          <Checkbox
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleMethodToggle(method.id)}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                            <IconComponent size={18} />
                            <div>
                              <CheckboxLabel>{method.label}</CheckboxLabel>
                              <div style={{ fontSize: typography.fontSize.xs, color: colors.text.secondary }}>
                                {method.description}
                              </div>
                            </div>
                          </div>
                          <CheckboxSavings>
                            -{method.savings}%
                          </CheckboxSavings>
                        </CheckboxItem>
                      )
                    })}
                  </CheckboxGroup>
                </FormGroup>
              </InputSection>
            </InputGrid>
          </CalculatorSection>

          {/* 결과 섹션 */}
          {showResults && (
            <ResultsSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>절약 결과</SectionTitle>

              {totalSavings > 0 && (
                <SavingsHighlight>
                  <SavingsAmount>
                    월 {totalSavings.toLocaleString()}원 절약
                  </SavingsAmount>
                  <SavingsText>
                    연간 {(totalSavings * 12).toLocaleString()}원 절약 가능
                  </SavingsText>
                </SavingsHighlight>
              )}

              {/* 통계 카드 */}
              <StatsGrid>
                <StatCard>
                  <StatValue>{monthlyUsage} kWh</StatValue>
                  <StatLabel>현재 월 사용량</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentBill.toLocaleString()}원</StatValue>
                  <StatLabel>현재 월 요금</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{optimizedBill.toLocaleString()}원</StatValue>
                  <StatLabel>절약 후 월 요금</StatLabel>
                </StatCard>
              </StatsGrid>

              {/* 월별 사용량 예측 차트 */}
              <SectionTitle>월별 사용량 및 요금 예측</SectionTitle>
              
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}원`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name.includes('사용량') ? `${value} kWh` : `${value.toLocaleString()}원`,
                        name
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="현재요금" 
                      stroke={colors.gray[400]} 
                      strokeWidth={2}
                      name="현재 요금"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="절약후요금" 
                      stroke={colors.secondary[500]} 
                      strokeWidth={2}
                      name="절약 후 요금"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>

              {totalSavings > 0 && (
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
              )}
            </ResultsSection>
          )}
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
