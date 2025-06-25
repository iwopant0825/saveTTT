'use client'

import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CreditCard, TrendingDown, Calculator, DollarSign, Calendar, Percent, ArrowRight, Loader, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px;
  background: ${colors.gray[50]};
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.secondary[500]} 0%, ${colors.secondary[600]} 100%);
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
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`

const Input = styled.input`
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: ${colors.secondary[500]};
  }
`

const Select = styled.select`
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: ${colors.secondary[500]};
  }
`

const CurrentLoanCard = styled.div`
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

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ComparisonCard = styled.div`
  background: ${colors.gray[50]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  border-left: 4px solid ${props => props.$current ? colors.gray[400] : colors.secondary[500]};
`

const CardTitle = styled.h4`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};
`

const CardStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${typography.fontSize.sm};
`

const StatLabel = styled.span`
  color: ${colors.text.secondary};
`

const StatValue = styled.span`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
`

const BankGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const BankCard = styled.div`
  background: white;
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  text-align: center;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    border-color: ${colors.secondary[300]};
    box-shadow: ${shadows.lg};
  }
`

const BankName = styled.h4`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.sm};
`

const InterestRate = styled.div`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.secondary[600]};
  margin-bottom: ${spacing.xs};
`

const BankType = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.secondary};
`

const ChartContainer = styled.div`
  height: 300px;
  margin: ${spacing.xl} 0;
`

// 은행별 대출 금리 데이터
const bankRates = [
  { name: '카카오뱅크', rate: 3.39, type: '인터넷전문은행' },
  { name: '토스뱅크', rate: 3.49, type: '인터넷전문은행' },
  { name: 'KB국민은행', rate: 3.89, type: '시중은행' },
  { name: '신한은행', rate: 3.95, type: '시중은행' },
  { name: '하나은행', rate: 4.02, type: '시중은행' },
  { name: '우리은행', rate: 4.08, type: '시중은행' }
]

export default function LoanCalculator() {
  const [currentAmount, setCurrentAmount] = useState(0) // 현재 대출 잔액
  const [currentRate, setCurrentRate] = useState(0) // 현재 대출 금리
  const [currentTerm, setCurrentTerm] = useState(0) // 현재 대출 기간 (남은)
  const [loanType, setLoanType] = useState('주택담보대출')
  const [newRate, setNewRate] = useState(3.39) // 새로운 대출 금리
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiData, setApiData] = useState(null)
  const [recommendations, setRecommendations] = useState([])

  // API를 통한 대출 계산 및 분석
  const calculateLoanDetails = useCallback(async () => {
    if (!currentAmount || !currentRate || !currentTerm) {
      setShowResults(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // 대출 계산 API 호출
      const calculateResponse = await fetch('/api/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'calculate',
          principal: currentAmount,
          currentRate: currentRate,
          newRate: newRate,
          term: currentTerm,
          loanType: loanType
        })
      })

      if (!calculateResponse.ok) {
        throw new Error('대출 계산에 실패했습니다')
      }

      const calculateData = await calculateResponse.json()
      setApiData(calculateData)

      // 대출 추천 API 호출
      const recommendResponse = await fetch('/api/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'recommend',
          loanType: loanType,
          amount: currentAmount
        })
      })

      if (recommendResponse.ok) {
        const recommendData = await recommendResponse.json()
        setRecommendations(recommendData.recommendations || [])
      }

      setShowResults(true)
    } catch (err) {
      console.error('대출 분석 오류:', err)
      setError(err.message)
      setShowResults(false)
    } finally {
      setLoading(false)
    }
  }, [currentAmount, currentRate, currentTerm, newRate, loanType])

  // 입력값 변경 시 자동 계산
  useEffect(() => {
    const debounceTimeout = setTimeout(calculateLoanDetails, 500)
    return () => clearTimeout(debounceTimeout)
  }, [currentAmount, currentRate, currentTerm, newRate, loanType, calculateLoanDetails]) 
    ? calculateTotalInterest(currentAmount, newRate, currentTerm) 
    : 0

  // API 데이터에서 계산 결과 가져오기
  const currentMonthlyPayment = apiData ? apiData.currentMonthlyPayment : 0
  const newMonthlyPayment = apiData ? apiData.newMonthlyPayment : 0
  const currentTotalInterest = apiData ? apiData.currentTotalInterest : 0
  const newTotalInterest = apiData ? apiData.newTotalInterest : 0
  const monthlySavings = apiData ? apiData.monthlySavings : 0
  const totalSavings = apiData ? apiData.totalSavings : 0

  // 상환 스케줄 차트 데이터
  const scheduleData = apiData ? apiData.scheduleData : []

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
              <CreditCard size={32} style={{ marginRight: '12px', display: 'inline' }} />
              대출 갈아타기 계산기
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              더 낮은 금리로 갈아타서 이자 부담을 줄여보세요
              <br />
              평균 연 200만원 절약이 가능합니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          {/* 현재 대출 정보 입력 섹션 */}
          <CalculatorSection>
            <SectionTitle>현재 대출 정보를 입력해주세요</SectionTitle>
            
            <FormGrid>
              <FormSection>
                <FormGroup>
                  <Label>
                    <DollarSign size={16} />
                    대출 잔액 (만원)
                  </Label>
                  <Input
                    type="number"
                    placeholder="예: 20000"
                    value={currentAmount || ''}
                    onChange={(e) => setCurrentAmount(Number(e.target.value) * 10000)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Percent size={16} />
                    현재 금리 (연%)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="예: 4.5"
                    value={currentRate || ''}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                  />
                </FormGroup>
              </FormSection>

              <FormSection>
                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    남은 기간 (개월)
                  </Label>
                  <Input
                    type="number"
                    placeholder="예: 240"
                    value={currentTerm || ''}
                    onChange={(e) => setCurrentTerm(Number(e.target.value))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>대출 종류</Label>
                  <Select 
                    value={loanType} 
                    onChange={(e) => setLoanType(e.target.value)}
                  >
                    <option value="주택담보대출">주택담보대출</option>
                    <option value="전세자금대출">전세자금대출</option>
                    <option value="신용대출">신용대출</option>
                    <option value="자동차대출">자동차대출</option>
                  </Select>
                </FormGroup>
              </FormSection>
            </FormGrid>

            {currentAmount > 0 && (
              <CurrentLoanCard>
                <h4 style={{ marginBottom: spacing.sm, color: colors.text.primary }}>현재 대출 정보</h4>
                <p><strong>대출 잔액:</strong> {(currentAmount / 10000).toLocaleString()}만원</p>
                <p><strong>금리:</strong> {currentRate}%</p>
                <p><strong>남은 기간:</strong> {currentTerm}개월</p>
                <p><strong>대출 종류:</strong> {loanType}</p>
                {currentMonthlyPayment > 0 && (
                  <p><strong>월 상환액:</strong> {Math.round(currentMonthlyPayment).toLocaleString()}원</p>
                )}
              </CurrentLoanCard>
            )}
          </CalculatorSection>

          {/* 은행별 금리 비교 */}
          <CalculatorSection>
            <SectionTitle>은행별 금리 비교</SectionTitle>
            <BankGrid>
              {bankRates.map((bank) => (
                <BankCard 
                  key={bank.name}
                  onClick={() => setNewRate(bank.rate)}
                  style={{ 
                    cursor: 'pointer',
                    borderColor: newRate === bank.rate ? colors.secondary[500] : colors.gray[200]
                  }}
                >
                  <BankName>{bank.name}</BankName>
                  <InterestRate>{bank.rate}%</InterestRate>
                  <BankType>{bank.type}</BankType>
                </BankCard>
              ))}
            </BankGrid>
          </CalculatorSection>

          {/* 결과 섹션 */}
          {showResults && (
            <ResultsSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>갈아타기 절약 효과</SectionTitle>

              {totalSavings > 0 && (
                <SavingsHighlight>
                  <SavingsAmount>
                    총 {Math.round(totalSavings / 10000).toLocaleString()}만원 절약
                  </SavingsAmount>
                  <SavingsText>
                    월 {Math.round(monthlySavings).toLocaleString()}원씩 절약 가능
                  </SavingsText>
                </SavingsHighlight>
              )}

              {/* 비교 카드 */}
              <ComparisonGrid>
                <ComparisonCard $current={true}>
                  <CardTitle>현재 대출</CardTitle>
                  <CardStats>
                    <Stat>
                      <StatLabel>금리</StatLabel>
                      <StatValue>{currentRate}%</StatValue>
                    </Stat>
                    <Stat>
                      <StatLabel>월 상환액</StatLabel>
                      <StatValue>{Math.round(currentMonthlyPayment).toLocaleString()}원</StatValue>
                    </Stat>
                    <Stat>
                      <StatLabel>총 이자</StatLabel>
                      <StatValue>{Math.round(currentTotalInterest / 10000).toLocaleString()}만원</StatValue>
                    </Stat>
                  </CardStats>
                </ComparisonCard>

                <ComparisonCard>
                  <CardTitle>갈아탄 후</CardTitle>
                  <CardStats>
                    <Stat>
                      <StatLabel>금리</StatLabel>
                      <StatValue>{newRate}%</StatValue>
                    </Stat>
                    <Stat>
                      <StatLabel>월 상환액</StatLabel>
                      <StatValue>{Math.round(newMonthlyPayment).toLocaleString()}원</StatValue>
                    </Stat>
                    <Stat>
                      <StatLabel>총 이자</StatLabel>
                      <StatValue>{Math.round(newTotalInterest / 10000).toLocaleString()}만원</StatValue>
                    </Stat>
                  </CardStats>
                </ComparisonCard>
              </ComparisonGrid>

              {/* 상환 스케줄 차트 */}
              {scheduleData.length > 0 && (
                <>
                  <SectionTitle>대출 잔액 비교</SectionTitle>
                  
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scheduleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `${(value / 10000).toFixed(0)}만원`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${(value / 10000).toFixed(0)}만원`]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="현재대출" 
                          stroke={colors.gray[400]} 
                          strokeWidth={2}
                          name="현재 대출"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="갈아탄대출" 
                          stroke={colors.secondary[500]} 
                          strokeWidth={2}
                          name="갈아탄 대출"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </>
              )}
            </ResultsSection>
          )}
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
