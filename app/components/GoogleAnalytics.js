'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Google Analytics 설정
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // 실제 배포시 변경 필요

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Google Analytics 스크립트 로드
    if (typeof window !== 'undefined') {
      // gtag 함수 초기화
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag = gtag

      // Google Analytics 설정
      gtag('js', new Date())
      gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  useEffect(() => {
    // 페이지 변경 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [pathname])

  return (
    <>
      {/* Google Analytics 스크립트 */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// 이벤트 추적 유틸리티 함수들
export const trackEvent = (action, category = 'general', label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackCalculatorUsage = (calculatorType, amount = 0) => {
  trackEvent('calculator_use', 'engagement', calculatorType, amount)
}

export const trackShare = (platform, page) => {
  trackEvent('share', 'social', `${platform}_${page}`)
}

export const trackPWAInstall = () => {
  trackEvent('pwa_install', 'engagement', 'install_prompt')
}
