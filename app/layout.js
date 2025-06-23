import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './globals/StyledComponentsRegistry'
import { ThemeProvider } from './utils/ThemeProvider'
import GoogleAnalytics from './components/GoogleAnalytics'
import AdBlockDetector from './components/AdBlockDetector'
import './globals/globals.css'
import './styles/mobile.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://savinggking.com'),
  title: '절약왕 - 생활비 절약 계산기 | 통신비 전기요금 대출 구독 관리',
  description: '통신비, 전기요금, 대출, 구독서비스 절약을 도와주는 올인원 계산기. 월 평균 10만원 절약 가능!',
  keywords: '절약, 계산기, 통신비, 전기요금, 대출, 구독서비스, 가계부, 금융관리, 생활비절약',
  author: '절약왕',
  openGraph: {
    title: '절약왕 - 생활비 절약 계산기',
    description: '통신비, 전기요금, 대출, 구독서비스 절약을 도와주는 올인원 계산기',
    url: 'https://savinggking.com',
    siteName: '절약왕',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '절약왕 - 생활비 절약 계산기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '절약왕 - 생활비 절약 계산기',
    description: '통신비, 전기요금, 대출, 구독서비스 절약을 도와주는 올인원 계산기',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // 실제 배포시 변경 필요
    other: {
      'naver-site-verification': 'your-naver-verification-code', // 네이버 웹마스터 도구
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* DNS Prefetch & Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/icons/icon-192x192.png" as="image" />
        <link rel="preload" href="/manifest.json" as="fetch" crossOrigin="anonymous" />
        
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link rel="canonical" href="https://savinggking.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        
        {/* PWA 메타 태그 */}
        <meta name="theme-color" content="#3182CE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="절약왕" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* iOS 아이콘 */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        
        {/* 마이크로소프트 타일 */}
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#3182CE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "절약왕",
              "description": "생활비 절약을 위한 올인원 계산기 서비스",
              "url": "https://savinggking.com",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "featureList": [
                "통신비 절약 계산기",
                "전기요금 시뮬레이터", 
                "대출 갈아타기 계산기",
                "구독 서비스 관리"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <AdBlockDetector />
        <ThemeProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}
