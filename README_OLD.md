# 절약왕 (SavingKing) 🏆

생활비 절약을 위한 올인원 계산기 웹사이트

![절약왕 로고](https://via.placeholder.com/400x200/3182CE/FFFFFF?text=절약왕)

## 📋 프로젝트 개요

절약왕은 개인의 생활비 절약을 도와주는 종합 계산기 플랫폼입니다. 통신비, 전기요금, 대출, 구독서비스 등 다양한 분야의 절약 계산기를 제공하여 사용자가 실질적인 절약을 할 수 있도록 돕습니다.

## ✨ 주요 기능

### 🏠 메인 페이지
- **히어로 섹션**: 매력적인 절약 메시지와 CTA
- **계산기 그리드**: 4개 주요 계산기 카드형 메뉴
- **실시간 통계**: 애니메이션 카운터로 보여주는 절약 현황
- **절약 팁**: 매일 업데이트되는 실용적인 절약 팁

### 📱 통신비 절약 계산기
- 3대 통신사 요금제 비교
- 현재 요금제 분석
- 최적 요금제 추천
- 절약액 시각화

### ⚡ 전기요금 절약 시뮬레이터
- 월 사용량 기반 분석
- 절약 방법별 시뮬레이션
- 계절별 사용량 예측
- 실용적인 절약 팁

### 💳 대출 갈아타기 계산기
- 현재 대출 조건 분석
- 갈아타기 시 절약액 계산
- 상환 시뮬레이션
- 은행별 금리 비교

### 📺 구독 서비스 관리
- 모든 구독 서비스 통합 관리
- 월/년 총 구독료 계산
- 불필요한 구독 알림
- 구독 갱신 캘린더

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Styled-components
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand

### Development
- **Language**: JavaScript (ES6+)
- **Linting**: ESLint + Next.js Config
- **Package Manager**: npm

### Deployment
- **Platform**: Vercel
- **Domain**: TBD

## 🚀 시작하기

### 필요 조건
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/savinggking.git
   cd savinggking
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# ESLint 검사
npm run lint
```

## 📁 프로젝트 구조

```
savinggking/
├── app/                          # Next.js 14 App Router
│   ├── components/               # 재사용 가능한 컴포넌트
│   │   ├── Header.js            # 네비게이션 헤더
│   │   ├── Footer.js            # 푸터
│   │   ├── HeroSection.js       # 메인 히어로 섹션
│   │   ├── CalculatorGrid.js    # 계산기 그리드
│   │   ├── StatsSection.js      # 실시간 통계
│   │   └── TipsSection.js       # 절약 팁 섹션
│   ├── globals/                 # 전역 설정
│   │   ├── globals.css          # 전역 CSS
│   │   └── StyledComponentsRegistry.js
│   ├── utils/                   # 유틸리티
│   │   └── theme.js            # 디자인 시스템 테마
│   ├── layout.js               # 루트 레이아웃
│   └── page.js                 # 메인 페이지
├── public/                     # 정적 파일
├── next.config.js             # Next.js 설정
├── package.json               # 프로젝트 의존성
└── README.md                  # 프로젝트 문서
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: 신뢰감 있는 블루 계열 (#3182CE)
- **Secondary**: 성장의 그린 계열 (#38A169)
- **Accent**: 주목도 높은 오렌지/옐로우 계열

### 타이포그래피
- **폰트**: Inter (Google Fonts)
- **크기**: 12px ~ 60px (반응형)
- **무게**: 300 ~ 700

### 애니메이션
- **Framer Motion**: 페이지 전환, 카운터, 호버 효과
- **Duration**: 150ms ~ 400ms
- **Easing**: ease-out 기본

## 📱 반응형 디자인

- **Mobile First**: 모바일 우선 설계
- **Breakpoints**: 
  - sm: 640px
  - md: 768px  
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🔧 개발 로드맵

### Phase 1: 기본 구조 ✅
- [x] Next.js 14 프로젝트 설정
- [x] 디자인 시스템 구축
- [x] 메인 페이지 레이아웃
- [x] 헤더/푸터 컴포넌트
- [x] 반응형 네비게이션

### Phase 2: 통신비 계산기 🚧
- [ ] 통신사 요금제 데이터
- [ ] 요금제 비교 로직
- [ ] 절약액 차트
- [ ] 결과 공유 기능

### Phase 3: 전기요금 계산기 📋
- [ ] 전기요금 계산 로직
- [ ] 절약 방법 시뮬레이션
- [ ] 월별 사용량 그래프
- [ ] 절약 팁 추천

### Phase 4: 대출 계산기 📋
- [ ] 대출 조건 입력 폼
- [ ] 갈아타기 시뮬레이션
- [ ] 상환 스케줄 테이블
- [ ] 은행별 금리 데이터

### Phase 5: 구독 관리 📋
- [ ] 구독 서비스 CRUD
- [ ] 로컬 스토리지 활용
- [ ] 알림 시스템
- [ ] 드래그 앤 드롭

### Phase 6: 최적화 📋
- [ ] SEO 최적화
- [ ] PWA 설정
- [ ] 성능 최적화
- [ ] 광고 영역 설정

## 💰 수익화 전략

### Google AdSense
- 각 페이지별 광고 영역 배치
- 네이티브 광고 통합
- 모바일 최적화 광고

### 제휴 마케팅
- 금융상품 추천 링크
- 통신사 요금제 링크
- 전자제품 절약 상품

### 프리미엄 기능
- 고급 분석 도구
- 개인화된 절약 리포트
- 광고 제거 옵션

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **이메일**: contact@savinggking.com
- **전화**: 1588-0000
- **주소**: 서울특별시 강남구 테헤란로 123

## 🙏 감사의 말

절약왕을 사용해주시는 모든 분들께 감사드립니다. 여러분의 피드백이 더 나은 서비스를 만드는 원동력입니다.

---

**절약왕과 함께 스마트한 절약을 시작하세요! 💪**
