'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lightbulb, 
  Phone, 
  Bolt, 
  CreditCard, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  TrendingDown
} from 'lucide-react'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'

const TipsContainer = styled.section`
  padding: ${spacing['2xl']} 0;
`

const TipsHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing['2xl']};
`

const TipsTitle = styled(motion.h2)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const TipsSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 600px;
  margin: 0 auto;

  ${media.md} {
    font-size: ${typography.fontSize.lg};
  }
`

const TipsCarousel = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`

const TipCard = styled(motion.div)`
  background: ${colors.background.primary};
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  border: 1px solid ${colors.gray[200]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.accent};
  }
`

const TipHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`

const TipIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${spacing.md};
  background: ${props => props.$background};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const TipMeta = styled.div`
  flex: 1;
`

const TipCategory = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${props => props.color};
  font-weight: ${typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${spacing.xs};
`

const TipTitle = styled.h3`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.tight};
`

const TipContent = styled.div`
  margin-bottom: ${spacing.lg};
`

const TipDescription = styled.p`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing.lg};
`

const TipSteps = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`

const TipStep = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${colors.primary[100]};
  color: ${colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  flex-shrink: 0;
  margin-top: 2px;
`

const StepText = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.normal};
`

const TipFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${spacing.lg};
  border-top: 1px solid ${colors.gray[200]};
`

const TipSavings = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.secondary[600]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
`

const TipTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.text.tertiary};
  font-size: ${typography.fontSize.sm};
`

const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md};
  margin-top: ${spacing.xl};
`

const CarouselButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.background.primary};
  border: 1px solid ${colors.gray[300]};
  color: ${colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover:not(:disabled) {
    background: ${colors.primary[50]};
    border-color: ${colors.primary[300]};
    color: ${colors.primary[600]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const CarouselDots = styled.div`
  display: flex;
  gap: ${spacing.xs};
`

const CarouselDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? colors.primary[500] : colors.gray[300]};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    background: ${props => props.$active ? colors.primary[600] : colors.primary[400]};
  }
`

// 절약 팁 데이터
const tipsData = [
  {
    id: 'telecom-tip',
    category: '통신비',
    categoryColor: colors.primary[600],
    title: '데이터 사용량 체크로 요금제 최적화하기',
    description: '실제 데이터 사용량을 확인하여 불필요한 초과 요금을 방지하고 적정 요금제로 변경하세요.',
    steps: [
      '설정 > 셀룰러 데이터에서 월간 사용량 확인',
      '최근 3개월 평균 사용량 계산',
      '현재 요금제와 사용량 비교 분석',
      '더 저렴한 요금제나 할인 혜택 검토',
      '통신사 고객센터에 요금제 변경 문의'
    ],
    icon: Phone,
    background: colors.primary[500],
    accent: colors.primary[500],
    savings: '월 평균 2-4만원',
    time: '소요시간 15분'
  },
  {
    id: 'electricity-tip',
    category: '전기요금',
    categoryColor: colors.accent.orange,
    title: 'LED 전구 교체로 전기요금 절약하기',
    description: '기존 백열전구나 형광등을 LED로 교체하면 전력 소비량을 크게 줄일 수 있습니다.',
    steps: [
      '집 안의 모든 전구 개수와 종류 파악',
      'LED 전구 구매 (밝기 동일, 소비전력 낮은 제품)',
      '사용 빈도가 높은 곳부터 우선 교체',
      '스마트 전구로 자동 조명 제어 설정',
      '월별 전기요금 비교하여 절약 효과 확인'
    ],
    icon: Bolt,
    background: colors.accent.orange,
    accent: colors.accent.orange,
    savings: '월 평균 1-3만원',
    time: '소요시간 30분'
  },
  {
    id: 'loan-tip',
    category: '대출',
    categoryColor: colors.secondary[600],
    title: '신용점수 관리로 대출 금리 낮추기',
    description: '신용점수를 개선하여 더 낮은 금리로 대출을 받거나 기존 대출을 갈아탈 수 있습니다.',
    steps: [
      '신용정보조회 사이트에서 현재 신용점수 확인',
      '연체 내역이나 부정확한 정보 수정 요청',
      '신용카드 사용액을 한도의 30% 이하로 유지',
      '기존 대출 성실 상환으로 신용 이력 개선',
      '3-6개월 후 더 낮은 금리 대출 상품 재검토'
    ],
    icon: CreditCard,
    background: colors.secondary[500],
    accent: colors.secondary[500],
    savings: '연 평균 50-200만원',
    time: '소요시간 3-6개월'
  },
  {
    id: 'subscription-tip',
    category: '구독서비스',
    categoryColor: colors.accent.purple,
    title: '불필요한 구독 서비스 정리하기',
    description: '사용하지 않는 구독 서비스를 찾아 해지하고, 가족 플랜으로 비용을 절약하세요.',
    steps: [
      '신용카드 명세서에서 월 정기결제 내역 확인',
      '각 구독 서비스의 실제 사용 빈도 체크',
      '3개월간 사용하지 않은 서비스 해지',
      '비슷한 서비스끼리 비교하여 하나만 유지',
      '가족 구성원과 공유 가능한 플랜으로 변경'
    ],
    icon: Users,
    background: colors.accent.purple,
    accent: colors.accent.purple,
    savings: '월 평균 2-5만원',
    time: '소요시간 20분'
  }
]

export default function TipsSection() {
  const [currentTip, setCurrentTip] = useState(0)

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tipsData.length)
  }

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tipsData.length) % tipsData.length)
  }

  const goToTip = (index) => {
    setCurrentTip(index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const tip = tipsData[currentTip]
  const IconComponent = tip.icon

  return (
    <TipsContainer>
      <TipsHeader>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TipsTitle variants={itemVariants}>
            <Lightbulb size={28} style={{ display: 'inline', marginRight: '12px' }} />
            오늘의 절약 팁
          </TipsTitle>
          <TipsSubtitle variants={itemVariants}>
            매일 업데이트되는 실용적인 절약 팁으로
            생활비를 효과적으로 줄여보세요
          </TipsSubtitle>
        </motion.div>
      </TipsHeader>

      <TipsCarousel>
        <AnimatePresence mode="wait">
          <TipCard
            key={currentTip}
            accent={tip.accent}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.4 }}
          >
            <TipHeader>
              <TipIcon $background={tip.background}>
                <IconComponent size={24} />
              </TipIcon>
              <TipMeta>
                <TipCategory color={tip.categoryColor}>
                  {tip.category}
                </TipCategory>
                <TipTitle>{tip.title}</TipTitle>
              </TipMeta>
            </TipHeader>

            <TipContent>
              <TipDescription>{tip.description}</TipDescription>
              
              <TipSteps>
                {tip.steps.map((step, index) => (
                  <TipStep key={index}>
                    <StepNumber>{index + 1}</StepNumber>
                    <StepText>{step}</StepText>
                  </TipStep>
                ))}
              </TipSteps>
            </TipContent>

            <TipFooter>
              <TipSavings>
                <TrendingDown size={16} />
                {tip.savings} 절약 가능
              </TipSavings>
              <TipTime>
                <Clock size={16} />
                {tip.time}
              </TipTime>
            </TipFooter>
          </TipCard>
        </AnimatePresence>

        <CarouselControls>
          <CarouselButton 
            onClick={prevTip}
            disabled={tipsData.length <= 1}
          >
            <ChevronLeft size={20} />
          </CarouselButton>

          <CarouselDots>
            {tipsData.map((_, index) => (
              <CarouselDot
                key={index}
                $active={index === currentTip}
                onClick={() => goToTip(index)}
              />
            ))}
          </CarouselDots>

          <CarouselButton 
            onClick={nextTip}
            disabled={tipsData.length <= 1}
          >
            <ChevronRight size={20} />
          </CarouselButton>
        </CarouselControls>
      </TipsCarousel>
    </TipsContainer>
  )
}
