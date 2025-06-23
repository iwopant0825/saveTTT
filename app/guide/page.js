'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { BookOpen, Phone, Bolt, CreditCard, Users, ArrowRight, CheckCircle, Play } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors, spacing, typography, shadows, media, transitions } from '../utils/theme'

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

const GuideSection = styled.section`
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
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  ${media.md} {
    font-size: ${typography.fontSize['3xl']};
  }
`

const GuideGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const GuideCard = styled(motion.div)`
  background: ${colors.gray[50]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  border-left: 4px solid ${props => props.$color || colors.primary[500]};
`

const GuideIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.$background || colors.primary[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md};
  color: ${props => props.$color || colors.primary[600]};
`

const GuideTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.sm};
`

const GuideDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing.md};
`

const StepsList = styled.ol`
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
`

const StepItem = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  
  &::before {
    content: counter(step-counter);
    background: ${colors.primary[500]};
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.h4`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xs};
`

const StepDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
`

const TipBox = styled.div`
  background: ${colors.secondary[50]};
  border: 1px solid ${colors.secondary[200]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  margin: ${spacing.lg} 0;
`

const TipTitle = styled.h4`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.secondary[700]};
  margin-bottom: ${spacing.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`

const TipContent = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.secondary[600]};
  line-height: ${typography.lineHeight.relaxed};
`

const VideoEmbed = styled.div`
  background: ${colors.gray[900]};
  border-radius: ${spacing.md};
  padding: ${spacing['4xl']} ${spacing.lg};
  text-align: center;
  color: white;
  margin: ${spacing.lg} 0;
`

const VideoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
`

export default function Guide() {
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
        {/* 히어로 섹션 */}
        <HeroSection>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen size={32} style={{ marginRight: '12px', display: 'inline' }} />
              사용법 가이드
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              절약왕의 모든 기능을 효과적으로 활용하는 방법을 알아보세요
              <br />
              단계별 가이드로 누구나 쉽게 따라할 수 있습니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          {/* 서비스 별 가이드 */}
          <GuideSection>
            <SectionTitle>
              <BookOpen size={28} />
              서비스별 사용법
            </SectionTitle>
            
            <GuideGrid>
              <GuideCard
                $color={colors.primary[500]}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GuideIcon $background={colors.primary[100]} $color={colors.primary[600]}>
                  <Phone size={24} />
                </GuideIcon>
                <GuideTitle>통신비 절약 계산기</GuideTitle>
                <GuideDescription>
                  현재 요금제를 입력하고 최적의 요금제를 찾아보세요
                </GuideDescription>
                
                <StepsList>
                  <StepItem>
                    <StepContent>
                      <StepTitle>현재 통신사 선택</StepTitle>
                      <StepDescription>SKT, KT, LG U+ 중 현재 사용 중인 통신사를 선택하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>월 요금 입력</StepTitle>
                      <StepDescription>현재 지불하고 있는 월 요금을 정확히 입력하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>결과 확인</StepTitle>
                      <StepDescription>추천 요금제와 절약 가능한 금액을 확인하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                </StepsList>

                <TipBox>
                  <TipTitle>
                    <CheckCircle size={16} />
                    절약 팁
                  </TipTitle>
                  <TipContent>
                    가족 요금제나 약정 할인을 함께 고려하면 더 많은 절약이 가능합니다!
                  </TipContent>
                </TipBox>
              </GuideCard>

              <GuideCard
                $color={colors.accent.orange}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GuideIcon $background={`${colors.accent.orange}20`} $color={colors.accent.orange}>
                  <Bolt size={24} />
                </GuideIcon>
                <GuideTitle>전기요금 절약 시뮬레이터</GuideTitle>
                <GuideDescription>
                  월 사용량과 절약 방법을 설정해 절약 효과를 확인하세요
                </GuideDescription>
                
                <StepsList>
                  <StepItem>
                    <StepContent>
                      <StepTitle>월 사용량 설정</StepTitle>
                      <StepDescription>슬라이더를 이용해 월 전기 사용량(kWh)을 설정하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>절약 방법 선택</StepTitle>
                      <StepDescription>LED 교체, 단열 보강 등 실행 가능한 절약 방법을 선택하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>절약 효과 확인</StepTitle>
                      <StepDescription>월별 절약 금액과 연간 절약 효과를 확인하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                </StepsList>

                <TipBox>
                  <TipTitle>
                    <CheckCircle size={16} />
                    절약 팁
                  </TipTitle>
                  <TipContent>
                    여름/겨울 피크 시간대(오후 2-5시, 오후 7-10시) 사용을 줄이면 더 효과적입니다!
                  </TipContent>
                </TipBox>
              </GuideCard>

              <GuideCard
                $color={colors.secondary[500]}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GuideIcon $background={colors.secondary[100]} $color={colors.secondary[600]}>
                  <CreditCard size={24} />
                </GuideIcon>
                <GuideTitle>대출 갈아타기 계산기</GuideTitle>
                <GuideDescription>
                  현재 대출 조건을 입력하고 갈아타기 효과를 계산하세요
                </GuideDescription>
                
                <StepsList>
                  <StepItem>
                    <StepContent>
                      <StepTitle>대출 정보 입력</StepTitle>
                      <StepDescription>현재 대출 잔액, 금리, 남은 기간을 정확히 입력하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>희망 금리 선택</StepTitle>
                      <StepDescription>은행별 금리를 비교하고 갈아탈 금리를 선택하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>절약 효과 분석</StepTitle>
                      <StepDescription>월 상환액 차이와 총 절약 금액을 확인하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                </StepsList>

                <TipBox>
                  <TipTitle>
                    <CheckCircle size={16} />
                    절약 팁
                  </TipTitle>
                  <TipContent>
                    중도상환 수수료와 신규 대출 수수료를 고려해서 실제 절약 효과를 계산하세요!
                  </TipContent>
                </TipBox>
              </GuideCard>

              <GuideCard
                $color={colors.accent.purple}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GuideIcon $background={`${colors.accent.purple}20`} $color={colors.accent.purple}>
                  <Users size={24} />
                </GuideIcon>
                <GuideTitle>구독 서비스 관리</GuideTitle>
                <GuideDescription>
                  모든 구독 서비스를 등록하고 체계적으로 관리하세요
                </GuideDescription>
                
                <StepsList>
                  <StepItem>
                    <StepContent>
                      <StepTitle>구독 서비스 추가</StepTitle>
                      <StepDescription>Netflix, Spotify 등 사용 중인 모든 구독 서비스를 추가하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>카테고리 분류</StepTitle>
                      <StepDescription>동영상, 음악, 게임 등 카테고리별로 분류해 관리하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                  <StepItem>
                    <StepContent>
                      <StepTitle>지출 분석</StepTitle>
                      <StepDescription>월/연 총 지출과 카테고리별 지출을 분석하세요</StepDescription>
                    </StepContent>
                  </StepItem>
                </StepsList>

                <TipBox>
                  <TipTitle>
                    <CheckCircle size={16} />
                    절약 팁
                  </TipTitle>
                  <TipContent>
                    3개월 이상 사용하지 않은 서비스는 해지를 고려해보세요. 필요할 때 다시 가입할 수 있습니다!
                  </TipContent>
                </TipBox>
              </GuideCard>
            </GuideGrid>
          </GuideSection>

          {/* 동영상 가이드 */}
          <GuideSection>
            <SectionTitle>
              <Play size={28} />
              동영상 가이드
            </SectionTitle>
            
            <VideoEmbed>
              <VideoPlaceholder>
                <Play size={64} />
                <h3>절약왕 사용법 동영상</h3>
                <p>5분만에 배우는 절약왕 완전 정복 (준비 중)</p>
              </VideoPlaceholder>
            </VideoEmbed>
          </GuideSection>

          {/* FAQ */}
          <GuideSection>
            <SectionTitle>자주 묻는 질문</SectionTitle>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              <TipBox>
                <TipTitle>Q. 계산 결과가 정확한가요?</TipTitle>
                <TipContent>
                  A. 모든 계산은 공식 요금표와 금리를 기반으로 하며, 실제 절약 효과와 유사합니다. 다만 개인별 상황에 따라 차이가 있을 수 있으니 참고용으로 활용하세요.
                </TipContent>
              </TipBox>

              <TipBox>
                <TipTitle>Q. 개인정보가 저장되나요?</TipTitle>
                <TipContent>
                  A. 입력하신 정보는 서버에 저장되지 않으며, 브라우저의 로컬 스토리지에만 임시 저장됩니다. 브라우저를 종료하거나 캐시를 삭제하면 모든 정보가 삭제됩니다.
                </TipContent>
              </TipBox>

              <TipBox>
                <TipTitle>Q. 모바일에서도 사용할 수 있나요?</TipTitle>
                <TipContent>
                  A. 네, 절약왕은 반응형 웹사이트로 제작되어 스마트폰, 태블릿, PC 모든 기기에서 최적화된 환경으로 이용하실 수 있습니다.
                </TipContent>
              </TipBox>

              <TipBox>
                <TipTitle>Q. 계산 결과를 저장하거나 공유할 수 있나요?</TipTitle>
                <TipContent>
                  A. 현재는 브라우저 내 임시 저장만 지원하며, 향후 업데이트를 통해 결과 저장 및 공유 기능을 제공할 예정입니다.
                </TipContent>
              </TipBox>
            </div>
          </GuideSection>
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
