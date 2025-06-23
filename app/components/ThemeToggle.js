'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  // 하이드레이션 이슈 방지
  if (!mounted) {
    return (
      <div className={`w-12 h-6 bg-gray-200 rounded-full ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isDark ? 'bg-indigo-600' : 'bg-gray-300'
      } ${className}`}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <motion.div
        className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
        animate={{
          x: isDark ? 24 : 2
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon size={12} className="text-yellow-400" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
}

// 아이콘만 있는 간단한 버전
export function SimpleThemeToggle({ size = 24, className = '' }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className={`w-6 h-6 bg-gray-200 rounded ${className}`} />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
      >
        {isDark ? (
          <Moon size={size} className="text-indigo-400" />
        ) : (
          <Sun size={size} className="text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
}

// 드롭다운 메뉴용 테마 선택기
export function ThemeSelector() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  const options = [
    { value: 'light', label: '라이트 모드', icon: Sun },
    { value: 'dark', label: '다크 모드', icon: Moon },
  ];

  return (
    <div className="space-y-1">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = (option.value === 'dark') === isDark;
        
        return (
          <button
            key={option.value}
            onClick={() => {
              if (isSelected) return;
              toggleTheme();
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
              isSelected 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Icon size={16} />
            <span>{option.label}</span>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
