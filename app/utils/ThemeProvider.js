'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createThemeVariables } from './theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 초기 테마 설정 (localStorage에서 읽기)
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  // 테마 변경 시 localStorage에 저장 및 CSS 변수 업데이트
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // CSS 커스텀 속성 업데이트
    const root = document.documentElement;
    const themeVariables = createThemeVariables(isDark);
    
    Object.entries(themeVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // body 클래스 토글
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 테마 감지 훅
export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemTheme;
}
