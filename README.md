# 절약왕 - 생활비 절약 계산기 🏆💰

월 평균 10만원 절약을 도워주는 **완전한 풀스택** 생활비 절약 계산기입니다.

## 🌟 주요 기능

### 💳 통신비 절약 계산기
- **실제 API 연동**: 통신사별 실제 요금제 데이터
- 현재 요금제와 추천 요금제 비교
- 월/연 절약액 시뮬레이션
- 통신사별 최적 요금제 추천
- 실시간 요금 계산 및 분석

### ⚡ 전기요금 시뮬레이터
- **실제 한전 요금제 적용**: 2024년 기준 누진제 요금표
- 전력 사용량별 정확한 요금 계산
- 누진세 구간별 상세 분석
- 절약 팁 및 권장사항 제공
- 월별 사용량 예측 및 비교

### 🏦 대출 갈아타기 계산기
- **실제 금융 계산 로직**: 원리금균등상환 방식
- 현재 대출과 신규 대출 정확한 비교
- 갈아타기 수수료 포함 계산
- 총 이자 절약액 분석
- 은행별 실제 금리 데이터

### 📱 구독 서비스 관리
- **지능형 구독 분석**: API 기반 최적화 제안
- 모든 구독 서비스 통합 관리
- 월/연 총 비용 분석
- 사용하지 않는 구독 알림
- 대안 서비스 추천

## 🚀 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **PWA**: Service Worker + Manifest

### Backend & API
- **API Routes**: Next.js 14 API Routes
- **통신비 API**: `/api/telecom` - 요금제 비교, 절약 계산, 추천
- **전기요금 API**: `/api/electricity` - 누진제 계산, 절약 분석
- **대출 API**: `/api/loan` - 대출 계산, 갈아타기 분석, 추천
- **구독 API**: `/api/subscription` - 구독 분석, 최적화, 대안 제안
- **캐싱**: 메모리 기반 응답 캐싱 (5분 TTL)

## 🎨 핵심 특징

### � 완전한 백엔드 구현
- **실제 작동하는 API**: 모든 계산기가 실제 백엔드 로직 사용
- **성능 최적화**: API 응답 캐싱, 디바운싱
- **에러 처리**: 완전한 로딩/에러 상태 관리
- **실시간 계산**: 입력값 변경 시 즉시 재계산

### �📱 Progressive Web App (PWA)
- 오프라인 지원
- 모바일 설치 가능
- 네이티브 앱 경험

### 🌙 다크 모드 지원
- 시스템 설정 자동 감지
- 수동 토글 가능
- 사용자 설정 저장

### ⚡ 성능 최적화
- **Next.js 14 최신 기능**: App Router, Server Components
- **빠른 네비게이션**: Link prefetch, DNS prefetch
- **최적화된 빌드**: CSS/패키지 최적화
- **리소스 프리로드**: 중요 리소스 사전 로딩

### 📱 완벽한 모바일 반응형
- **Mobile First**: 모바일 우선 설계
- **터치 최적화**: 44px 이상 터치 영역, 터치 피드백
- **반응형 브레이크포인트**: 
  - Mobile: 320px~639px
  - Tablet: 640px~1023px  
  - Desktop: 1024px+
- **Safe Area 지원**: iPhone X 이상 노치 대응
- **PWA 모바일 지원**: 앱처럼 설치 가능

### 📤 소셜 공유
- 카카오톡, Facebook, Twitter, LinkedIn
- 클립보드 복사
- 네이티브 공유 API 지원

### 📊 Google Analytics 통합
- 사용자 행동 분석
- 계산기 사용 추적
- 공유 및 PWA 설치 추적

### 💰 광고 통합
- Google AdSense 지원
- 광고 차단 감지
- 사용자 친화적 광고 배치

## 🛠️ 개발 환경 설정

### 설치
```bash
git clone https://github.com/yourusername/savinggking.git
cd savinggking
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
npm start
```

### 린트
```bash
npm run lint
```

## 📱 반응형 디자인

- **모바일**: 320px ~ 768px
- **태블릿**: 768px ~ 1024px  
- **데스크톱**: 1024px ~

## 🔧 환경 설정

### Google Analytics
```javascript
// app/components/GoogleAnalytics.js
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // 실제 ID로 변경
```

### Google AdSense
```javascript
// app/layout.js
// AdSense client ID 변경 필요
```

## 📄 주요 페이지

- `/` - 메인 페이지
- `/telecom` - 통신비 계산기
- `/electricity` - 전기요금 계산기
- `/loan` - 대출 계산기
- `/subscription` - 구독 관리
- `/guide` - 사용 가이드
- `/terms` - 이용약관
- `/privacy` - 개인정보처리방침

## 🌐 SEO 최적화

- **메타 태그**: 완전 최적화
- **Open Graph**: 소셜 미디어 최적화
- **구조화된 데이터**: JSON-LD 스키마
- **사이트맵**: 자동 생성 (`/sitemap.xml`)
- **로봇**: 검색엔진 최적화 (`/robots.txt`)

## 📈 성능 최적화

- **이미지**: Next.js Image 컴포넌트
- **폰트**: Google Fonts 최적화
- **코드 분할**: 페이지별 자동 분할
- **캐싱**: Service Worker 캐싱 전략
- **압축**: 빌드 시 자동 최적화

## 🚀 배포

### Vercel 배포
```bash
npm i -g vercel
vercel
```

상세한 배포 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

## 📦 프로젝트 구조

```
app/
├── components/          # 재사용 컴포넌트
│   ├── Header.js       # 네비게이션 헤더
│   ├── Footer.js       # 푸터
│   ├── ThemeToggle.js  # 다크모드 토글
│   ├── ShareButton.js  # 공유 버튼
│   ├── PWAManager.js   # PWA 관리
│   ├── AdSense.js      # 광고 컴포넌트
│   └── ...
├── utils/              # 유틸리티
│   ├── theme.js        # 테마 설정
│   └── ThemeProvider.js # 테마 컨텍스트
├── globals/            # 전역 설정
├── telecom/           # 통신비 계산기
├── electricity/       # 전기요금 계산기
├── loan/             # 대출 계산기
├── subscription/     # 구독 관리
├── layout.js         # 루트 레이아웃
├── page.js          # 메인 페이지
└── ...

public/
├── manifest.json     # PWA 매니페스트
├── sw.js            # 서비스 워커
├── icons/           # PWA 아이콘들
└── ...
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 문의

- **이메일**: contact@savinggking.com
- **웹사이트**: https://savinggking.com
- **GitHub**: https://github.com/yourusername/savinggking

---

💡 **절약왕으로 똑똑한 절약 생활을 시작하세요!**
# saveTT
# saveTT
# saveTT
