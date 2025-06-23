'use client'

import styled from 'styled-components'
import { Calculator, Mail, Phone, MapPin, ExternalLink, Bolt } from 'lucide-react'
import Link from 'next/link'
import { colors, spacing, typography, media } from '../utils/theme'

const FooterContainer = styled.footer`
  background: ${colors.gray[900]};
  color: ${colors.text.inverse};
  padding: ${spacing['2xl']} 0 ${spacing.md} 0;
  margin-top: ${spacing['2xl']};

  ${media.sm} {
    padding: ${spacing['3xl']} 0 ${spacing.lg} 0;
    margin-top: ${spacing['3xl']};
  }

  ${media.md} {
    margin-top: ${spacing['4xl']};
  }
`

const FooterContent = styled.div`
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

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.xl};
    margin-bottom: ${spacing.xl};
  }

  ${media.md} {
    grid-template-columns: 2fr 1fr 1fr;
    gap: ${spacing['2xl']};
    margin-bottom: ${spacing['2xl']};
  }

  ${media.lg} {
    gap: ${spacing['3xl']};
  }
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  ${media.sm} {
    gap: ${spacing.lg};
  }
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary[400]};
  margin-bottom: ${spacing.sm};

  ${media.sm} {
    gap: ${spacing.sm};
    font-size: ${typography.fontSize.xl};
    margin-bottom: ${spacing.md};
  }

  ${media.md} {
    font-size: ${typography.fontSize['2xl']};
  }
`

const FooterDescription = styled.p`
  color: ${colors.gray[400]};
  line-height: ${typography.lineHeight.relaxed};
  font-size: ${typography.fontSize.sm};
`

const SectionTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing.md};
  color: ${colors.text.inverse};
`

const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.gray[400]};
  text-decoration: none;
  font-size: ${typography.fontSize.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary[400]};
  }
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: ${colors.gray[400]};
  font-size: ${typography.fontSize.sm};
  margin-bottom: ${spacing.sm};
`

const AdSpace = styled.div`
  background: ${colors.gray[800]};
  border-radius: ${spacing.sm};
  padding: ${spacing.xl};
  text-align: center;
  border: 2px dashed ${colors.gray[700]};
  margin-bottom: ${spacing['2xl']};
`

const AdText = styled.p`
  color: ${colors.gray[500]};
  font-size: ${typography.fontSize.sm};
`

const FooterBottom = styled.div`
  padding-top: ${spacing.xl};
  border-top: 1px solid ${colors.gray[800]};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  text-align: center;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`

const Copyright = styled.p`
  color: ${colors.gray[500]};
  font-size: ${typography.fontSize.sm};
`

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${spacing.lg};

  ${media.md} {
    justify-content: flex-end;
  }
`

const FooterBottomLink = styled(Link)`
  color: ${colors.gray[500]};
  text-decoration: none;
  font-size: ${typography.fontSize.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary[400]};
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* 광고 영역 */}
        <AdSpace>
          <AdText>광고 영역 - Google AdSense</AdText>
        </AdSpace>

        <FooterTop>
          {/* 회사 정보 */}
          <FooterSection>
            <div>
              <FooterLogo>
                <Calculator size={28} />
                절약왕
              </FooterLogo>
              <FooterDescription>
                생활비 절약을 위한 다양한 계산기를 제공하여 더 나은 금융 관리를 도와드립니다.
                통신비, 전기요금, 대출, 구독서비스까지 모든 생활비를 효율적으로 관리하세요.
              </FooterDescription>
            </div>
            
            <div>
              <ContactInfo>
                <Mail size={16} />
                contact@savinggking.com
              </ContactInfo>
              <ContactInfo>
                <Phone size={16} />
                1588-0000
              </ContactInfo>
              <ContactInfo>
                <MapPin size={16} />
                서울특별시 강남구 테헤란로 123
              </ContactInfo>
            </div>
          </FooterSection>

          {/* 서비스 링크 */}
          <FooterSection>
            <SectionTitle>계산기 서비스</SectionTitle>
            <FooterLink href="/telecom">
              <Phone size={16} />
              통신비 절약 계산기
            </FooterLink>
            <FooterLink href="/electricity">
              <Bolt size={16} />
              전기요금 시뮬레이터
            </FooterLink>
            <FooterLink href="/loan">
              <Calculator size={16} />
              대출 갈아타기 계산기
            </FooterLink>
            <FooterLink href="/subscription">
              <ExternalLink size={16} />
              구독 서비스 관리
            </FooterLink>
          </FooterSection>

          {/* 고객지원 */}
          <FooterSection>
            <SectionTitle>고객지원</SectionTitle>
            <FooterLink href="/help">
              자주 묻는 질문
            </FooterLink>
            <FooterLink href="/guide">
              사용법 가이드
            </FooterLink>
            <FooterLink href="/contact">
              문의하기
            </FooterLink>
            <FooterLink href="/feedback">
              피드백 보내기
            </FooterLink>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © 2024 절약왕(SavingKing). All rights reserved.
          </Copyright>
          
          <FooterLinks>
            <FooterBottomLink href="/privacy">
              개인정보처리방침
            </FooterBottomLink>
            <FooterBottomLink href="/terms">
              이용약관
            </FooterBottomLink>
            <FooterBottomLink href="/sitemap-page">
              사이트맵
            </FooterBottomLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}
