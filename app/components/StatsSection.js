'use client'

import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Calculator, Award, DollarSign, Target } from 'lucide-react'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'

const StatsContainer = styled.section`
  background: linear-gradient(135deg, ${colors.primary[50]}, ${colors.secondary[50]});
  border-radius: ${spacing['2xl']};
  padding: ${spacing['3xl']} ${spacing.xl};
  margin: ${spacing['4xl']} 0;
  position: relative;
  overflow: hidden;

  ${media.md} {
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(59,130,246,0.1)"/></pattern></defs><rect width="60" height="60" fill="url(%23dots)"/></svg>');
    opacity: 0.5;
  }
`

const StatsContent = styled.div`
  position: relative;
  z-index: 2;
`

const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing['2xl']};
`

const StatsTitle = styled(motion.h2)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const StatsSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};

  ${media.md} {
    font-size: ${typography.fontSize.lg};
  }
`

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StatCard = styled(motion.div)`
  background: ${colors.background.primary};
  border-radius: ${spacing.lg};
  padding: ${spacing.xl};
  text-align: center;
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.gray[200]};
  position: relative;
  overflow: hidden;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.accent};
  }
`

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.$background};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.md} auto;
  transition: transform ${transitions.duration.normal} ${transitions.easing.easeOut};

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`

const StatNumber = styled(motion.div)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xs};

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const StatLabel = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: ${spacing.xs};
`

const StatChange = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
  font-size: ${typography.fontSize.xs};
  color: ${colors.secondary[600]};
  font-weight: ${typography.fontWeight.medium};
`

// 애니메이션 카운터 훅
function useAnimatedCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [hasAnimated, setHasAnimated] = useState(false)

  const animate = () => {
    if (hasAnimated) return
    
    setHasAnimated(true)
    const increment = end / (duration / 16)
    let current = start
    
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        current = end
        clearInterval(timer)
      }
      setCount(Math.floor(current))
    }, 16)
    
    return () => clearInterval(timer)
  }

  return [count, animate]
}

// 통계 데이터
const statsData = [
  {
    id: 'users',
    icon: Users,
    number: 15432,
    label: '누적 사용자',
    suffix: '명',
    change: '+12%',
    accent: colors.primary[500],
    background: colors.primary[500]
  },
  {
    id: 'savings',
    icon: DollarSign,
    number: 2850,
    label: '총 절약 금액',
    suffix: '만원',
    change: '+24%',
    accent: colors.secondary[500],
    background: colors.secondary[500]
  },
  {
    id: 'calculations',
    icon: Calculator,
    number: 48726,
    label: '절약 계산 횟수',
    suffix: '회',
    change: '+18%',
    accent: colors.accent.orange,
    background: colors.accent.orange
  },
  {
    id: 'satisfaction',
    icon: Award,
    number: 96,
    label: '만족도',
    suffix: '%',
    change: '+3%',
    accent: colors.accent.purple,
    background: colors.accent.purple
  },
  {
    id: 'monthly-avg',
    icon: Target,
    number: 18,
    label: '평균 월 절약액',
    suffix: '만원',
    change: '+8%',
    accent: colors.accent.pink,
    background: colors.accent.pink
  },
  {
    id: 'monthly-users',
    icon: TrendingUp,
    number: 3247,
    label: '이번 달 신규 사용자',
    suffix: '명',
    change: '+31%',
    accent: colors.info,
    background: colors.info
  }
]

export default function StatsSection() {
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

  return (
    <StatsContainer>
      <StatsContent>
        <StatsHeader>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <StatsTitle variants={itemVariants}>
              실시간 절약 현황
            </StatsTitle>
            <StatsSubtitle variants={itemVariants}>
              절약왕과 함께하는 사용자들의 실제 절약 성과를 확인하세요
            </StatsSubtitle>
          </motion.div>
        </StatsHeader>

        <StatsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {statsData.map((stat) => {
            const IconComponent = stat.icon
            
            return (
              <StatCard
                key={stat.id}
                variants={itemVariants}
                accent={stat.accent}
                whileHover={{ scale: 1.02 }}
              >
                <StatIcon $background={stat.background}>
                  <IconComponent size={20} />
                </StatIcon>
                
                <AnimatedStatNumber
                  number={stat.number}
                  suffix={stat.suffix}
                />
                
                <StatLabel>{stat.label}</StatLabel>
                
                <StatChange>
                  <TrendingUp size={12} />
                  전월 대비 {stat.change}
                </StatChange>
              </StatCard>
            )
          })}
        </StatsGrid>
      </StatsContent>
    </StatsContainer>
  )
}

// 애니메이션 숫자 컴포넌트
function AnimatedStatNumber({ number, suffix }) {
  const [displayNumber, animateNumber] = useAnimatedCounter(number)
  const [inView, setInView] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true)
          animateNumber()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animateNumber, inView])

  return (
    <StatNumber ref={ref}>
      {displayNumber.toLocaleString()}{suffix}
    </StatNumber>
  )
}
