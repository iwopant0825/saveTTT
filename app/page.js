'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingDown, Calculator, Users, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import CalculatorGrid from './components/CalculatorGrid'
import StatsSection from './components/StatsSection'
import TipsSection from './components/TipsSection'
import PWAInstallPrompt, { PWAStatus } from './components/PWAInstallPrompt'
import PWAManager from './components/PWAManager'
import AdSenseAd, { BannerAd, InlineAd } from './components/AdSense'
import { colors, spacing, media } from './utils/theme'

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 70px; /* Header height */
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};

  ${media.sm} {
    padding: 0 ${spacing.lg};
  }

  ${media.md} {
    padding: 0 ${spacing.xl};
  }
`

const SectionSpacing = styled.div`
  margin: ${spacing['2xl']} 0;

  ${media.sm} {
    margin: ${spacing['3xl']} 0;
  }

  ${media.md} {
    margin: ${spacing['4xl']} 0;
  }

  ${media.lg} {
    margin: ${spacing['5xl']} 0;
  }
`

export default function HomePage() {
  return (
    <>
      <PWAManager />
      <PWAStatus />
      <Header />
      <MainContainer>
        {/* 히어로 섹션 */}
        <HeroSection />

        <ContentWrapper>
          {/* 계산기 그리드 */}
          <SectionSpacing>
            <CalculatorGrid />
          </SectionSpacing>

          {/* 상단 배너 광고 */}
          <SectionSpacing>
            <BannerAd adSlot="1234567890" />
          </SectionSpacing>

          {/* 실시간 통계 */}
          <SectionSpacing>
            <StatsSection />
          </SectionSpacing>

          {/* 인라인 광고 */}
          <SectionSpacing>
            <InlineAd adSlot="0987654321" />
          </SectionSpacing>

          {/* 절약 팁 */}
          <SectionSpacing>
            <TipsSection />
          </SectionSpacing>
        </ContentWrapper>
      </MainContainer>
      <Footer />
      <PWAInstallPrompt />
    </>
  )
}
