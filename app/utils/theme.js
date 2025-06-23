// 컬러 팔레트
export const colors = {
  // Primary Colors (신뢰감 있는 블루)
  primary: {
    50: '#EBF8FF',
    100: '#BEE3F8',
    200: '#90CDF4',
    300: '#63B3ED',
    400: '#4299E1',
    500: '#3182CE', // 메인 블루
    600: '#2B77CB',
    700: '#2C5282',
    800: '#2A4365',
    900: '#1A365D',
  },
  
  // Secondary Colors (성장과 절약의 그린)
  secondary: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169', // 메인 그린
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  },
  
  // Accent Colors
  accent: {
    orange: '#FF6B35',
    yellow: '#FFD23F',
    purple: '#8B5CF6',
    pink: '#EC4899',
  },
  
  // Status Color Palettes
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  yellow: {
    50: '#FEFCE8',
    100: '#FEF3C7',
    200: '#FEE68C',
    300: '#FDE047',
    400: '#FACC15',
    500: '#EAB308',
    600: '#CA8A04',
    700: '#A16207',
    800: '#854D0E',
    900: '#713F12',
  },
  
  // Neutral Colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Basic Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Background
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },
  
  // Text
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    inverse: '#FFFFFF',
  }
}

// 타이포그래피
export const typography = {
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  }
}

// 간격 (spacing)
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
}

// 그림자 (shadows)
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
}

// 테두리 반지름 (border radius)
export const borderRadius = {
  sm: '0.25rem',   // 4px
  base: '0.375rem', // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
}

// 다크모드 컬러 팔레트
export const darkColors = {
  // Dark mode specific colors
  background: {
    primary: '#0F172A',    // slate-900
    secondary: '#1E293B',  // slate-800
    tertiary: '#334155',   // slate-700
    card: '#1E293B',
    hover: '#2D3748',
  },
  
  text: {
    primary: '#F8FAFC',    // slate-50
    secondary: '#CBD5E1',  // slate-300
    muted: '#94A3B8',      // slate-400
    accent: '#60A5FA',     // blue-400
  },
  
  border: {
    primary: '#334155',    // slate-700
    secondary: '#475569',  // slate-600
    accent: '#3B82F6',     // blue-500
  }
}

// 테마별 색상 맵핑
export const themeColors = {
  light: {
    background: {
      primary: colors.gray[50],
      secondary: 'white',
      tertiary: colors.gray[100],
      card: 'white',
      hover: colors.gray[50],
    },
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[700],
      muted: colors.gray[500],
      accent: colors.primary[600],
    },
    border: {
      primary: colors.gray[200],
      secondary: colors.gray[300],
      accent: colors.primary[500],
    }
  },
  dark: darkColors
}

// 애니메이션 (transitions)
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },
  
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  }
}

// 브레이크포인트 (breakpoints)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// 미디어 쿼리 헬퍼
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
}

// 테마 헬퍼 함수들
export const getThemeColors = (isDark = false) => {
  return isDark ? themeColors.dark : themeColors.light;
}

// 다크모드 테마 생성 함수
export const createThemeVariables = (isDark = false) => {
  const lightColors = {
    background: colors.white,
    surface: colors.gray[50],
    text: colors.gray[900],
    textSecondary: colors.gray[700],
    textMuted: colors.gray[500],
    border: colors.gray[200],
    borderSecondary: colors.gray[300],
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    secondary: colors.secondary[600],
    accent: colors.accent.orange,
  };

  const darkColors = {
    background: colors.gray[900],
    surface: colors.gray[800],
    text: colors.gray[100],
    textSecondary: colors.gray[300],
    textMuted: colors.gray[400],
    border: colors.gray[700],
    borderSecondary: colors.gray[600],
    primary: colors.primary[400],
    primaryHover: colors.primary[300],
    secondary: colors.secondary[400],
    accent: colors.accent.orange,
  };

  const currentColors = isDark ? darkColors : lightColors;

  return {
    '--color-background': currentColors.background,
    '--color-surface': currentColors.surface,
    '--color-text': currentColors.text,
    '--color-text-secondary': currentColors.textSecondary,
    '--color-text-muted': currentColors.textMuted,
    '--color-border': currentColors.border,
    '--color-border-secondary': currentColors.borderSecondary,
    '--color-primary': currentColors.primary,
    '--color-primary-hover': currentColors.primaryHover,
    '--color-secondary': currentColors.secondary,
    '--color-accent': currentColors.accent,
  };
};

// 테마 객체 (전체 테마를 하나로 묶음)
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
  media,
};
