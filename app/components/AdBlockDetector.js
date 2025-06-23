'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, AlertTriangle } from 'lucide-react'

const AdBlockOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
`

const AdBlockModal = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  margin: 20px;
  text-align: center;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  
  svg {
    width: 64px;
    height: 64px;
    color: #f59e0b;
  }
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16px;
`

const Description = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  ${props => props.$primary ? `
    background: #8b5cf6;
    color: white;
    
    &:hover {
      background: #7c3aed;
    }
  ` : `
    background: transparent;
    color: #6b7280;
    border-color: #d1d5db;
    
    &:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }
  `}
`

const HiddenTestAd = styled.div`
  width: 1px;
  height: 1px;
  position: absolute;
  left: -9999px;
  top: -9999px;
`

export default function AdBlockDetector() {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userDismissed, setUserDismissed] = useState(false)

  useEffect(() => {
    // 브라우저에서만 실행
    if (typeof window === 'undefined') return

    // 사용자가 이미 모달을 닫았는지 확인
    const dismissed = localStorage.getItem('adblock-dismissed')
    if (dismissed) {
      setUserDismissed(true)
      return
    }

    // 광고 차단 감지 테스트
    const detectAdBlock = async () => {
      try {
        // 테스트 광고 요소 생성
        const testAd = document.createElement('div')
        testAd.innerHTML = '&nbsp;'
        testAd.className = 'adsbox'
        testAd.style.position = 'absolute'
        testAd.style.left = '-9999px'
        testAd.style.top = '-9999px'
        testAd.style.width = '1px'
        testAd.style.height = '1px'
        
        document.body.appendChild(testAd)

        // 잠시 대기 후 확인
        setTimeout(() => {
          const isBlocked = testAd.offsetHeight === 0 || 
                           testAd.offsetWidth === 0 || 
                           testAd.style.display === 'none' ||
                           testAd.style.visibility === 'hidden'

          if (isBlocked) {
            setIsAdBlockDetected(true)
            setShowModal(true)
          }

          // 테스트 요소 제거
          document.body.removeChild(testAd)
        }, 100)

        // 추가 테스트: Google AdSense 스크립트 로드 확인
        const scriptTest = document.createElement('script')
        scriptTest.src = 'https://googleads.g.doubleclick.net/pagead/id'
        scriptTest.onerror = () => {
          setIsAdBlockDetected(true)
          if (!userDismissed) {
            setShowModal(true)
          }
        }
        document.head.appendChild(scriptTest)

        // 스크립트 정리
        setTimeout(() => {
          if (document.head.contains(scriptTest)) {
            document.head.removeChild(scriptTest)
          }
        }, 3000)

      } catch (error) {
        console.log('AdBlock 감지 중 오류:', error)
      }
    }

    // 페이지 로드 후 감지 실행
    setTimeout(detectAdBlock, 1000)
  }, [userDismissed])

  const handleDismiss = (permanent = false) => {
    setShowModal(false)
    if (permanent) {
      localStorage.setItem('adblock-dismissed', 'true')
      setUserDismissed(true)
    }
  }

  const handleWhitelist = () => {
    // 광고 차단 해제 안내 후 페이지 새로고침
    alert('광고 차단을 해제한 후 페이지를 새로고침해 주세요.')
    handleDismiss(true)
  }

  return (
    <>
      {/* 숨겨진 테스트 광고 */}
      <HiddenTestAd className="adsbox">
        &nbsp;
      </HiddenTestAd>

      {/* 광고 차단 감지 모달 */}
      <AnimatePresence>
        {showModal && isAdBlockDetected && !userDismissed && (
          <AdBlockOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleDismiss()}
          >
            <AdBlockModal
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => handleDismiss()}>
                <X size={20} />
              </CloseButton>

              <IconContainer>
                <AlertTriangle />
              </IconContainer>

              <Title>광고 차단기가 감지되었습니다</Title>
              
              <Description>
                저희 사이트는 무료 서비스를 제공하기 위해 광고 수익에 의존하고 있습니다. 
                광고 차단기를 비활성화하거나 저희 사이트를 화이트리스트에 추가해 주시면 
                계속해서 무료로 서비스를 이용하실 수 있습니다.
              </Description>

              <ButtonGroup>
                <Button $primary onClick={handleWhitelist}>
                  <Shield size={16} style={{ marginRight: '8px' }} />
                  광고 허용하기
                </Button>
                <Button onClick={() => handleDismiss(true)}>
                  계속 사용하기
                </Button>
              </ButtonGroup>
            </AdBlockModal>
          </AdBlockOverlay>
        )}
      </AnimatePresence>
    </>
  )
}
