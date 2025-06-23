'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'

const HeroContainer = styled.section`
  background: linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.secondary[500]} 100%);
  color: white;
  padding: ${spacing['2xl']} 0;
  position: relative;
  overflow: hidden;

  ${media.sm} {
    padding: ${spacing['3xl']} 0;
  }

  ${media.md} {
    padding: ${spacing['4xl']} 0;
  }

  ${media.lg} {
    padding: ${spacing['5xl']} 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};
  position: relative;
  z-index: 2;

  ${media.sm} {
    padding: 0 ${spacing.lg};
  }

  ${media.md} {
    padding: 0 ${spacing.xl};
  }
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};
  align-items: center;

  ${media.sm} {
    gap: ${spacing['2xl']};
  }

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing['3xl']};
  }
`

const HeroText = styled.div`
  text-align: center;

  ${media.lg} {
    text-align: left;
  }
`

const HeroTitle = styled(motion.h1)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  margin-bottom: ${spacing.md};

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

  ${media.xl} {
    font-size: ${typography.fontSize['6xl']};
  }
`

const HeroSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.base};
  color: rgba(255, 255, 255, 0.9);
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing.lg};

  ${media.sm} {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing.xl};
  }

  ${media.md} {
    font-size: ${typography.fontSize.xl};
    margin-bottom: ${spacing['2xl']};
  }
`

const HeroButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  align-items: center;

  ${media.sm} {
    flex-direction: row;
    justify-content: center;
    gap: ${spacing.md};
  }

  ${media.lg} {
    justify-content: flex-start;
  }
`

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: white;
  color: ${colors.primary[600]};
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${spacing.lg};
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  box-shadow: ${shadows.lg};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.xl};
    background: ${colors.gray[50]};
  }
`

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${spacing.lg};
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const HeroVisual = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: ${spacing.lg};
  padding: ${spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  position: relative;
`

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.md} auto;
`

const FeatureTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing.sm};
`

const FeatureText = styled.p`
  font-size: ${typography.fontSize.sm};
  color: rgba(255, 255, 255, 0.8);
  line-height: ${typography.lineHeight.normal};
`

const FloatingElements = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  pointer-events: none;

  ${media.md} {
    width: 400px;
    height: 400px;
  }
`

const FloatingCard = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${spacing.md};
  padding: ${spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`

export default function HeroSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <HeroContainer>
      <HeroContent>
        <HeroGrid>
          <HeroText>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <HeroTitle variants={itemVariants}>
                생활비 절약의
                <br />
                <motion.span
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, #FFD700, #FFA500)',
                      'linear-gradient(45deg, #FFA500, #FF6347)',
                      'linear-gradient(45deg, #FF6347, #FFD700)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  새로운 기준
                </motion.span>
              </HeroTitle>

              <HeroSubtitle variants={itemVariants}>
                통신비, 전기요금, 대출, 구독서비스까지
                <br />
                모든 생활비를 한 번에 분석하고 절약하세요
              </HeroSubtitle>

              <HeroButtons variants={itemVariants}>
                <PrimaryButton href="#calculators">
                  절약 시작하기
                  <ArrowRight size={20} />
                </PrimaryButton>
                <SecondaryButton href="/guide">
                  사용법 보기
                  <Sparkles size={20} />
                </SecondaryButton>
              </HeroButtons>
            </motion.div>
          </HeroText>

          <HeroVisual>
            <FloatingElements>
              <FloatingCard
                variants={floatingVariants}
                animate="animate"
                style={{ top: '10%', left: '0%' }}
              >
                <TrendingDown size={16} color="#10B981" />
                월 15만원 절약
              </FloatingCard>
              
              <FloatingCard
                variants={floatingVariants}
                animate="animate"
                style={{ top: '20%', right: '10%', animationDelay: '1s' }}
              >
                <Sparkles size={16} color="#F59E0B" />
                연 180만원 절약
              </FloatingCard>
              
              <FloatingCard
                variants={floatingVariants}
                animate="animate"
                style={{ bottom: '30%', left: '15%', animationDelay: '2s' }}
              >
                <TrendingDown size={16} color="#3B82F6" />
                통신비 30% 절약
              </FloatingCard>
              
              <FloatingCard
                variants={floatingVariants}
                animate="animate"
                style={{ bottom: '10%', right: '0%', animationDelay: '3s' }}
              >
                <Sparkles size={16} color="#EC4899" />
                전기요금 25% 절약
              </FloatingCard>
            </FloatingElements>

            <FeatureCard
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <FeatureIcon>
                <TrendingDown size={24} />
              </FeatureIcon>
              <FeatureTitle>실시간 절약 분석</FeatureTitle>
              <FeatureText>
                AI 기반 분석으로 개인 맞춤형
                절약 포인트를 찾아드립니다
              </FeatureText>
            </FeatureCard>
          </HeroVisual>
        </HeroGrid>
      </HeroContent>
    </HeroContainer>
  )
}
