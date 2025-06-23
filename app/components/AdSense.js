'use client'

import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const AdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  min-height: ${props => props.$height || '280px'};
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  
  ${props => props.$responsive && `
    width: 100%;
    max-width: 100%;
  `}
`

const AdPlaceholder = styled.div`
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  padding: 20px;
`

// Google AdSense 컴포넌트
export default function AdSenseAd({ 
  adSlot = 'YOUR-AD-SLOT-ID', 
  adFormat = 'auto',
  responsive = true,
  height = '280px',
  className = ''
}) {
  const adRef = useRef(null)
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (isProduction && typeof window !== 'undefined') {
      try {
        // AdSense 광고 로드
        if (window.adsbygoogle) {
          window.adsbygoogle.push({})
        }
      } catch (error) {
        console.error('AdSense 광고 로드 실패:', error)
      }
    }
  }, [isProduction])

  // 개발 환경에서는 플레이스홀더 표시
  if (!isProduction) {
    return (
      <AdContainer $height={height} $responsive={responsive} className={className}>
        <AdPlaceholder>
          <div>📢 광고 영역</div>
          <div>AdSense 광고가 여기에 표시됩니다</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>
            슬롯 ID: {adSlot}
          </div>
        </AdPlaceholder>
      </AdContainer>
    )
  }

  return (
    <AdContainer $height={height} $responsive={responsive} className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'block',
          width: '100%',
          height: responsive ? 'auto' : height 
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 배포시 변경 필요
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      />
    </AdContainer>
  )
}

// 특정 크기 광고 컴포넌트들
export const BannerAd = (props) => (
  <AdSenseAd 
    {...props}
    adFormat="rectangle"
    height="280px"
  />
)

export const SidebarAd = (props) => (
  <AdSenseAd 
    {...props}
    adFormat="vertical"
    height="600px"
    responsive={false}
  />
)

export const InlineAd = (props) => (
  <AdSenseAd 
    {...props}
    adFormat="fluid"
    height="250px"
  />
)
