'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, UserCheck } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors, spacing, typography, shadows, media } from '../utils/theme'

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

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing['4xl']} ${spacing.lg};

  ${media.md} {
    padding: ${spacing['5xl']} ${spacing.xl};
  }
`

const ContentSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing['2xl']};
`

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
  padding-bottom: ${spacing.md};
  border-bottom: 2px solid ${colors.gray[200]};
`

const SubTitle = styled.h3`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: ${spacing.xl} 0 ${spacing.md} 0;
`

const Content = styled.div`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.lg};

  p {
    margin-bottom: ${spacing.md};
  }

  ul, ol {
    margin: ${spacing.md} 0;
    padding-left: ${spacing.xl};
  }

  li {
    margin-bottom: ${spacing.xs};
  }

  strong {
    color: ${colors.text.primary};
    font-weight: ${typography.fontWeight.semibold};
  }
`

const LastUpdated = styled.div`
  background: ${colors.gray[100]};
  border-radius: ${spacing.md};
  padding: ${spacing.md};
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  text-align: center;
  margin-bottom: ${spacing.xl};
`

export default function Privacy() {
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
              <Shield size={32} style={{ marginRight: '12px', display: 'inline' }} />
              개인정보처리방침
            </HeroTitle>
          </HeroContent>
        </HeroSection>

        <Container>
          <LastUpdated>
            최종 업데이트: 2024년 6월 23일
          </LastUpdated>

          <ContentSection>
            <SectionTitle>1. 개인정보의 수집 및 이용목적</SectionTitle>
            <Content>
              <p>
                절약왕(이하 &ldquo;회사&rdquo;)은 다음의 목적을 위하여 개인정보를 처리합니다. 
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              
              <SubTitle>가. 홈페이지 회원가입 및 관리</SubTitle>
              <p>
                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 
                서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
              </p>

              <SubTitle>나. 재화 또는 서비스 제공</SubTitle>
              <p>
                서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산을 목적으로 개인정보를 처리합니다.
              </p>

              <SubTitle>다. 고충처리</SubTitle>
              <p>
                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.
              </p>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>2. 처리하는 개인정보의 항목</SectionTitle>
            <Content>
              <SubTitle>가. 필수항목</SubTitle>
              <ul>
                <li>이름, 이메일, 휴대전화번호</li>
                <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
              </ul>

              <SubTitle>나. 선택항목</SubTitle>
              <ul>
                <li>생년월일, 성별</li>
                <li>마케팅 및 광고에 활용</li>
              </ul>

              <SubTitle>다. 자동 수집 정보</SubTitle>
              <p>
                인터넷 서비스 이용과정에서 다음 정보들이 자동으로 생성되어 수집될 수 있습니다:
              </p>
              <ul>
                <li>IP 주소, 쿠키, MAC 주소, 서비스 이용 기록</li>
                <li>방문 기록, 불량 이용 기록</li>
              </ul>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>3. 개인정보의 처리 및 보유기간</SectionTitle>
            <Content>
              <p>
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 
                동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>

              <SubTitle>가. 회원 가입 및 관리</SubTitle>
              <ul>
                <li>보존기간: 회원 탈퇴 시까지</li>
                <li>단, 다음의 경우에는 해당 기간 종료 시까지</li>
                <li>관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료 시까지</li>
                <li>홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지</li>
              </ul>

              <SubTitle>나. 재화 또는 서비스 제공</SubTitle>
              <ul>
                <li>보존기간: 재화·서비스 공급완료 및 요금결제·정산 완료 시까지</li>
                <li>단, 다음의 경우에는 해당 기간 종료 시까지</li>
                <li>「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등에 관한 기록: 5년</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ul>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
            <Content>
              <p>
                회사는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 
                정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>

              <p><strong>현재 회사는 개인정보를 제3자에게 제공하지 않습니다.</strong></p>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>5. 개인정보처리의 위탁</SectionTitle>
            <Content>
              <p>
                회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
              </p>

              <SubTitle>가. 호스팅 서비스</SubTitle>
              <ul>
                <li>위탁받는 자 (수탁자): Vercel Inc.</li>
                <li>위탁하는 업무의 내용: 웹사이트 호스팅 및 관리</li>
              </ul>

              <SubTitle>나. 이메일 발송 서비스</SubTitle>
              <ul>
                <li>위탁받는 자 (수탁자): Google LLC</li>
                <li>위탁하는 업무의 내용: 이메일 발송 서비스</li>
              </ul>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>6. 정보주체의 권리·의무 및 행사방법</SectionTitle>
            <Content>
              <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>

              <ol>
                <li>개인정보 처리현황 통지요구</li>
                <li>개인정보 열람요구</li>
                <li>오류 등이 있을 경우 정정·삭제요구</li>
                <li>처리정지요구</li>
              </ol>

              <p>
                제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 
                회사는 이에 대해 지체없이 조치하겠습니다.
              </p>

              <p>
                정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 
                완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
              </p>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>7. 개인정보의 안전성 확보조치</SectionTitle>
            <Content>
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>

              <SubTitle>가. 관리적 조치</SubTitle>
              <ul>
                <li>내부관리계획 수립·시행, 정기적 직원 교육 등</li>
              </ul>

              <SubTitle>나. 기술적 조치</SubTitle>
              <ul>
                <li>개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
              </ul>

              <SubTitle>다. 물리적 조치</SubTitle>
              <ul>
                <li>전산실, 자료보관실 등의 접근통제</li>
              </ul>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>8. 개인정보보호책임자</SectionTitle>
            <Content>
              <p>
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 
                불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
              </p>

              <SubTitle>개인정보보호책임자</SubTitle>
              <ul>
                <li>성명: 홍길동</li>
                <li>직책: 개인정보보호책임자</li>
                <li>연락처: 02-1234-5678, privacy@savinggking.com</li>
              </ul>

              <p>
                정보주체는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 
                피해구제 등에 관한 사항을 개인정보보호책임자에게 문의하실 수 있습니다. 
                회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
              </p>
            </Content>
          </ContentSection>

          <ContentSection>
            <SectionTitle>9. 개인정보처리방침의 변경</SectionTitle>
            <Content>
              <p>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 
                정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </Content>
          </ContentSection>
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
