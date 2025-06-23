# 절약왕 - 생활비 절약 계산기 🏆💰

월 평균 10만원 절약을 도와주는 올인원 생활비 절약 계산기입니다.

## 🌟 주요 기능

### 💳 통신비 절약 계산기
- 현재 요금제와 추천 요금제 비교
- 월/연 절약액 시뮬레이션
- 통신사별 최적 요금제 추천

### ⚡ 전기요금 시뮬레이터
- 전력 사용량별 요금 계산
- 누진세 구간별 상세 분석
- 절약 팁 및 권장사항 제공

### 🏦 대출 갈아타기 계산기
- 현재 대출과 신규 대출 비교
- 갈아타기 수수료 포함 계산
- 총 이자 절약액 분석

### 📱 구독 서비스 관리
- 모든 구독 서비스 통합 관리
- 월/연 총 비용 분석
- 사용하지 않는 구독 알림

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **PWA**: Service Worker + Manifest

## 🎨 핵심 특징

### 📱 Progressive Web App (PWA)
- 오프라인 지원
- 모바일 설치 가능
- 네이티브 앱 경험

### 🌙 다크 모드 지원
- 시스템 설정 자동 감지
- 수동 토글 가능
- 사용자 설정 저장

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
