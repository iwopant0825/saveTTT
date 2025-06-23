'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing['3xl']};

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`

const ContactSection = styled.section`
  background: white;
  border-radius: ${spacing.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
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

const ContactForm = styled.form`
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
`

const Input = styled.input`
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
  }

  &:invalid {
    border-color: ${colors.red[300]};
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
    border-color: ${colors.primary[500]};
  }
`

const Textarea = styled.textarea`
  padding: ${spacing.md};
  border: 2px solid ${colors.gray[200]};
  border-radius: ${spacing.md};
  font-size: ${typography.fontSize.base};
  min-height: 120px;
  resize: vertical;
  transition: border-color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
  }
`

const SubmitButton = styled(motion.button)`
  background: ${colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${spacing.md};
  padding: ${spacing.md} ${spacing.xl};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};

  &:hover {
    background: ${colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }

  &:disabled {
    background: ${colors.gray[400]};
    cursor: not-allowed;
    transform: none;
  }
`

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`

const ContactCard = styled(motion.div)`
  background: ${colors.gray[50]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  border-left: 4px solid ${props => props.$color || colors.primary[500]};
`

const ContactIcon = styled.div`
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

const ContactTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.sm};
`

const ContactDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing.sm};
`

const ContactDetails = styled.div`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
`

const SuccessMessage = styled(motion.div)`
  background: ${colors.secondary[50]};
  border: 1px solid ${colors.secondary[200]};
  border-radius: ${spacing.md};
  padding: ${spacing.lg};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: ${colors.secondary[700]};
  margin-bottom: ${spacing.lg};
`

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현에서는 서버로 데이터를 전송
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: ''
      })
    }, 2000)
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
              <MessageCircle size={32} style={{ marginRight: '12px', display: 'inline' }} />
              문의하기
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              궁금한 점이나 문의사항이 있으시면 언제든지 연락주세요
              <br />
              빠른 시간 내에 친절하게 답변드리겠습니다
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Container>
          <ContactGrid>
            {/* 문의 폼 */}
            <ContactSection>
              <SectionTitle>
                <Send size={28} />
                메시지 보내기
              </SectionTitle>

              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle size={20} />
                  메시지가 성공적으로 전송되었습니다. 빠른 시간 내에 답변드리겠습니다.
                </SuccessMessage>
              )}

              <ContactForm onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="category">문의 유형</Label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">문의 유형을 선택하세요</option>
                    <option value="general">일반 문의</option>
                    <option value="technical">기술 지원</option>
                    <option value="bug">버그 신고</option>
                    <option value="feature">기능 제안</option>
                    <option value="partnership">제휴 문의</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="subject">제목 *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="문의 제목을 입력하세요"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">메시지 *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="문의 내용을 상세히 작성해주세요"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>전송 중...</>
                  ) : (
                    <>
                      <Send size={20} />
                      메시지 전송
                    </>
                  )}
                </SubmitButton>
              </ContactForm>
            </ContactSection>

            {/* 연락처 정보 */}
            <ContactSection>
              <SectionTitle>
                <Phone size={28} />
                연락처 정보
              </SectionTitle>

              <ContactInfoSection>
                <ContactCard
                  $color={colors.primary[500]}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ContactIcon $background={colors.primary[100]} $color={colors.primary[600]}>
                    <Mail size={24} />
                  </ContactIcon>
                  <ContactTitle>이메일</ContactTitle>
                  <ContactDescription>
                    가장 빠른 응답을 원하시면 이메일로 문의해주세요
                  </ContactDescription>
                  <ContactDetails>contact@savinggking.com</ContactDetails>
                </ContactCard>

                <ContactCard
                  $color={colors.secondary[500]}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ContactIcon $background={colors.secondary[100]} $color={colors.secondary[600]}>
                    <Phone size={24} />
                  </ContactIcon>
                  <ContactTitle>전화 상담</ContactTitle>
                  <ContactDescription>
                    평일 09:00-18:00 (점심시간 12:00-13:00 제외)
                  </ContactDescription>
                  <ContactDetails>1588-0000</ContactDetails>
                </ContactCard>

                <ContactCard
                  $color={colors.accent.orange}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ContactIcon $background={`${colors.accent.orange}20`} $color={colors.accent.orange}>
                    <MapPin size={24} />
                  </ContactIcon>
                  <ContactTitle>오시는 길</ContactTitle>
                  <ContactDescription>
                    방문 상담은 사전 예약 후 이용 가능합니다
                  </ContactDescription>
                  <ContactDetails>
                    서울특별시 강남구 테헤란로 123
                    <br />
                    절약왕 빌딩 10층
                  </ContactDetails>
                </ContactCard>

                <ContactCard
                  $color={colors.accent.purple}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ContactIcon $background={`${colors.accent.purple}20`} $color={colors.accent.purple}>
                    <Clock size={24} />
                  </ContactIcon>
                  <ContactTitle>응답 시간</ContactTitle>
                  <ContactDescription>
                    문의하신 내용에 대해 빠르게 답변드립니다
                  </ContactDescription>
                  <ContactDetails>
                    이메일: 24시간 이내
                    <br />
                    전화: 즉시 응답
                  </ContactDetails>
                </ContactCard>
              </ContactInfoSection>
            </ContactSection>
          </ContactGrid>
        </Container>
      </MainContainer>
      <Footer />
    </>
  )
}
