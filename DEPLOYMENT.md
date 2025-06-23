# 절약왕 - 생활비 절약 계산기 배포 가이드

## 배포 전 체크리스트

### 1. 환경 변수 설정 (배포 전 필수)

**Google Analytics**
- `app/components/GoogleAnalytics.js`의 `GA_MEASUREMENT_ID` 값을 실제 Google Analytics ID로 변경
- 예: `G-XXXXXXXXXX` → `G-1234567890`

**Google AdSense**
- `app/layout.js`의 AdSense client ID 변경
- `app/components/AdSense.js`의 `data-ad-client` 값 변경
- 예: `ca-pub-XXXXXXXXXXXXXXXX` → `ca-pub-1234567890123456`

**사이트 검증 코드**
- `app/layout.js`의 `verification` 객체에서 실제 검증 코드로 변경:
  - Google Search Console 검증 코드
  - 네이버 웹마스터 도구 검증 코드

### 2. 메타데이터 최적화
- `app/layout.js`의 `metadataBase` URL을 실제 도메인으로 변경
- Open Graph 이미지(`/public/og-image.png`) 추가 (1200x630px)
- 파비콘들 추가:
  - `/public/favicon.ico`
  - `/public/apple-touch-icon.png`
  - `/public/favicon-32x32.png`
  - `/public/favicon-16x16.png`

### 3. PWA 아이콘 추가
다음 아이콘들을 `/public/icons/` 폴더에 추가:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### 4. Vercel 배포 설정

**package.json 스크립트 확인**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**vercel.json 설정 (선택사항)**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/**/*.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### 5. 성능 최적화 확인
- [x] 이미지 최적화 (Next.js Image 컴포넌트 사용)
- [x] 코드 분할 (페이지별 자동 분할)
- [x] CSS 최적화 (styled-components 사용)
- [x] 폰트 최적화 (Google Fonts preconnect)
- [x] PWA 최적화 (Service Worker, Manifest)

### 6. SEO 최적화 확인
- [x] 메타 태그 최적화
- [x] Open Graph 태그
- [x] Twitter Cards
- [x] 구조화된 데이터 (JSON-LD)
- [x] 로봇 메타 태그
- [x] 사이트맵 (동적 생성)
- [x] robots.txt

### 7. 접근성 확인
- [x] 시맨틱 HTML 구조
- [x] 키보드 네비게이션
- [x] ARIA 레이블
- [x] 색상 대비
- [x] 반응형 디자인

## 배포 단계

### 1. Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 2. 도메인 연결
1. Vercel 대시보드에서 도메인 설정
2. DNS 설정 (A 레코드 또는 CNAME)
3. SSL 인증서 자동 설정 확인

### 3. 웹마스터 도구 등록
1. **Google Search Console**
   - 사이트 등록
   - 사이트맵 제출: `https://yourdomain.com/sitemap.xml`
   - 검증 코드 meta 태그에 추가

2. **네이버 웹마스터 도구**
   - 사이트 등록
   - 사이트맵 제출
   - 검증 코드 meta 태그에 추가

### 4. 분석 도구 설정
1. **Google Analytics**
   - 계정 생성 및 추적 ID 발급
   - `GoogleAnalytics.js`에 실제 ID 적용

2. **Google AdSense**
   - 계정 승인 및 광고 단위 생성
   - `AdSense.js`에 실제 광고 슬롯 ID 적용

### 5. 성능 모니터링
- Google PageSpeed Insights 점수 확인
- Core Web Vitals 측정
- Lighthouse 감사 실행

## 배포 후 테스트

### 기능 테스트
- [ ] 모든 계산기 정상 작동
- [ ] 다크 모드 토글
- [ ] PWA 설치 프롬프트
- [ ] 공유 기능 (카카오톡, Facebook, Twitter 등)
- [ ] 반응형 디자인 (모바일, 태블릿, 데스크톱)

### 성능 테스트
- [ ] 페이지 로드 속도 < 3초
- [ ] First Contentful Paint < 1.5초
- [ ] Largest Contentful Paint < 2.5초
- [ ] Cumulative Layout Shift < 0.1

### SEO 테스트
- [ ] Google 검색 결과 노출
- [ ] Open Graph 이미지 표시
- [ ] 사이트맵 크롤링 성공

## 주요 URL
- 메인: `/`
- 사이트맵: `/sitemap.xml`
- 로봇: `/robots.txt`
- 매니페스트: `/manifest.json`
- 서비스 워커: `/sw.js`

## 지원 문의
배포 과정에서 문제가 발생하면 다음을 확인하세요:
1. 빌드 로그 오류 메시지
2. 브라우저 개발자 도구 콘솔
3. Vercel 함수 로그

---
*배포 가이드 v1.0 - 2025년 6월*
