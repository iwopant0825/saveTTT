'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Phone, Bolt, CreditCard, Users, TrendingDown, ArrowRight, Calculator } from 'lucide-react'
import Link from 'next/link'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'

const SectionContainer = styled.section`
  padding: ${spacing.lg} 0;

  ${media.sm} {
    padding: ${spacing.xl} 0;
  }

  ${media.md} {
    padding: ${spacing['2xl']} 0;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};

  ${media.sm} {
    margin-bottom: ${spacing['2xl']};
  }

  ${media.md} {
    margin-bottom: ${spacing['3xl']};
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};

  ${media.sm} {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing.lg};
  }

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }

  ${media.lg} {
    font-size: ${typography.fontSize['4xl']};
  }
`

const SectionSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${spacing.md};

  ${media.sm} {
    font-size: ${typography.fontSize.lg};
    padding: 0;
  }
`

const CalculatorGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.lg};
  }

  ${media.md} {
    gap: ${spacing.xl};
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const CalculatorCard = styled(motion(Link))`
  background: ${colors.background.primary};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.gray[200]};
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  ${media.sm} {
    border-radius: ${spacing.lg};
    padding: ${spacing.xl};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};
    border-color: ${colors.primary[300]};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.gradient});
  }
`

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${spacing.sm};
  background: ${props => props.$background};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md};
  transition: transform ${transitions.duration.normal} ${transitions.easing.easeOut};

  ${media.sm} {
    width: 60px;
    height: 60px;
    border-radius: ${spacing.md};
    margin-bottom: ${spacing.lg};
  }

  ${CalculatorCard}:hover & {
    transform: scale(1.1);
  }
`

const CardTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.sm};

  ${media.sm} {
    font-size: ${typography.fontSize.xl};
  }
  margin-bottom: ${spacing.sm};
`

const CardDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.normal};
  margin-bottom: ${spacing.lg};
`

const CardStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.secondary[600]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: ${spacing.lg};
`

const CardAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.primary[600]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`

const ActionText = styled.span`
  transition: transform ${transitions.duration.fast} ${transitions.easing.easeOut};

  ${CalculatorCard}:hover & {
    transform: translateX(4px);
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  background: linear-gradient(135deg, ${colors.accent.orange}, ${colors.accent.yellow});
  color: white;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${spacing.sm};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const calculators = [
  {
    id: 'telecom',
    title: '통신비 절약',
    description: '3대 통신사 요금제 비교로 최적의 요금제를 찾아보세요',
    icon: Phone,
    href: '/telecom',
    gradient: `${colors.primary[500]}, ${colors.primary[600]}`,
    background: colors.primary[500],
    stats: '평균 월 3만원 절약',
    isPopular: true
  },
  {
    id: 'electricity',
    title: '전기요금 절약',
    description: '사용량별 시뮬레이션으로 전기요금을 줄여보세요',
    icon: Bolt,
    href: '/electricity',
    gradient: `${colors.accent.yellow}, ${colors.accent.orange}`,
    background: colors.accent.orange,
    stats: '평균 월 5만원 절약',
    isPopular: false
  },
  {
    id: 'loan',
    title: '대출 갈아타기',
    description: '더 낮은 금리로 갈아타서 이자 부담을 줄여보세요',
    icon: CreditCard,
    href: '/loan',
    gradient: `${colors.secondary[500]}, ${colors.secondary[600]}`,
    background: colors.secondary[500],
    stats: '평균 연 200만원 절약',
    isPopular: false
  },
  {
    id: 'subscription',
    title: '구독 관리',
    description: '모든 구독 서비스를 한눈에 관리하고 불필요한 구독을 정리하세요',
    icon: Users,
    href: '/subscription',
    gradient: `${colors.accent.purple}, ${colors.accent.pink}`,
    background: colors.accent.purple,
    stats: '평균 월 2만원 절약',
    isPopular: false
  }
]

export default function CalculatorGridSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <SectionContainer id="calculators">
      <SectionHeader>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>
            <Calculator size={32} style={{ display: 'inline', marginRight: '12px' }} />
            절약 계산기
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            각 분야별 전문 계산기로 정확한 절약 금액을 확인하고
            실질적인 절약을 시작해보세요
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      <CalculatorGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {calculators.map((calculator) => {
          const IconComponent = calculator.icon
          
          return (
            <CalculatorCard
              key={calculator.id}
              href={calculator.href}
              gradient={calculator.gradient}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {calculator.isPopular && (
                <PopularBadge>인기</PopularBadge>
              )}
              
              <CardIcon $background={calculator.background}>
                <IconComponent size={24} />
              </CardIcon>
              
              <CardTitle>{calculator.title}</CardTitle>
              <CardDescription>{calculator.description}</CardDescription>
              
              <CardStats>
                <TrendingDown size={16} />
                {calculator.stats}
              </CardStats>
              
              <CardAction>
                <ActionText>계산 시작하기</ActionText>
                <ArrowRight size={16} />
              </CardAction>
            </CalculatorCard>
          )
        })}
      </CalculatorGrid>
    </SectionContainer>
  )
}
