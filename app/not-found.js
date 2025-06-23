'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, Calculator } from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import { colors, spacing, typography, shadows, media, transitions } from './utils/theme'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px;
  background: ${colors.gray[50]};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${spacing['4xl']} ${spacing.lg};
  text-align: center;
`

const ErrorCard = styled(motion.div)`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['4xl']};
  box-shadow: ${shadows.xl};
`

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary[500]};
  line-height: 1;
  margin-bottom: ${spacing.lg};

  ${media.md} {
    font-size: 12rem;
  }
`

const ErrorTitle = styled(motion.h2)`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const ErrorDescription = styled(motion.p)`
  font-size: ${typography.fontSize.lg};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing['2xl']};
`

const ActionButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  align-items: center;

  ${media.sm} {
    flex-direction: row;
    justify-content: center;
  }
`

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${colors.primary[500]};
  color: white;
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${spacing.md};
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    background: ${colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }
`

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${colors.gray[100]};
  color: ${colors.text.primary};
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${spacing.md};
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    background: ${colors.gray[200]};
    transform: translateY(-2px);
  }
`

const SuggestionSection = styled(motion.div)`
  margin-top: ${spacing['3xl']};
  padding-top: ${spacing['2xl']};
  border-top: 1px solid ${colors.gray[200]};
`

const SuggestionTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
`

const SuggestionLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const SuggestionLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  border-radius: ${spacing.md};
  background: ${colors.gray[50]};
  color: ${colors.text.primary};
  text-decoration: none;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    background: ${colors.primary[50]};
    color: ${colors.primary[600]};
  }
`

export default function NotFound() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <>
      <Header />
      <MainContainer>
        <ErrorContainer>
          <ErrorCard
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ErrorCode variants={itemVariants}>404</ErrorCode>
            
            <ErrorTitle variants={itemVariants}>
              페이지를 찾을 수 없습니다
            </ErrorTitle>
            
            <ErrorDescription variants={itemVariants}>
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              <br />
              아래 링크를 통해 원하시는 페이지로 이동해보세요.
            </ErrorDescription>

            <ActionButtons variants={itemVariants}>
              <PrimaryButton href="/">
                <Home size={20} />
                홈으로 돌아가기
              </PrimaryButton>
              <SecondaryButton href="javascript:history.back()">
                <ArrowLeft size={20} />
                이전 페이지로
              </SecondaryButton>
            </ActionButtons>

            <SuggestionSection variants={itemVariants}>
              <SuggestionTitle>인기 서비스</SuggestionTitle>
              <SuggestionLinks>
                <SuggestionLink href="/telecom">
                  <Calculator size={16} />
                  통신비 절약 계산기
                </SuggestionLink>
                <SuggestionLink href="/electricity">
                  <Calculator size={16} />
                  전기요금 시뮬레이터
                </SuggestionLink>
                <SuggestionLink href="/loan">
                  <Calculator size={16} />
                  대출 갈아타기 계산기
                </SuggestionLink>
                <SuggestionLink href="/subscription">
                  <Calculator size={16} />
                  구독 서비스 관리
                </SuggestionLink>
              </SuggestionLinks>
            </SuggestionSection>
          </ErrorCard>
        </ErrorContainer>
      </MainContainer>
      <Footer />
    </>
  )
}
