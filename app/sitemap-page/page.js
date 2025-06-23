'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function SitemapPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const siteStructure = [
    {
      category: 'main',
      title: '메인 페이지',
      icon: '🏠',
      color: 'bg-blue-500',
      pages: [
        {
          title: '홈',
          url: '/',
          description: '절약왕 메인 페이지, 전체 서비스 소개',
          lastModified: '2024-01-01'
        }
      ]
    },
    {
      category: 'calculators',
      title: '절약 계산기',
      icon: '🧮',
      color: 'bg-green-500',
      pages: [
        {
          title: '통신비 절약 계산기',
          url: '/telecom',
          description: '휴대폰, 인터넷 요금제 비교 및 절약 시뮬레이션',
          lastModified: '2024-01-01'
        },
        {
          title: '전기요금 절약 계산기',
          url: '/electricity',
          description: '전력 사용량 분석 및 절약 방법 제안',
          lastModified: '2024-01-01'
        },
        {
          title: '대출 재융자 계산기',
          url: '/loan',
          description: '대출 금리 비교 및 재융자 효과 분석',
          lastModified: '2024-01-01'
        },
        {
          title: '구독서비스 관리',
          url: '/subscription',
          description: '구독 서비스 현황 분석 및 최적화',
          lastModified: '2024-01-01'
        }
      ]
    },
    {
      category: 'info',
      title: '정보 및 가이드',
      icon: '📚',
      color: 'bg-purple-500',
      pages: [
        {
          title: '이용 가이드',
          url: '/guide',
          description: '서비스 사용법 및 팁 안내',
          lastModified: '2024-01-01'
        }
      ]
    },
    {
      category: 'support',
      title: '고객 지원',
      icon: '🛠️',
      color: 'bg-orange-500',
      pages: [
        {
          title: '문의하기',
          url: '/contact',
          description: '서비스 문의 및 피드백',
          lastModified: '2024-01-01'
        },
        {
          title: '피드백',
          url: '/feedback',
          description: '서비스 개선 의견 제출',
          lastModified: '2024-01-01'
        },
        {
          title: '도움말/FAQ',
          url: '/help',
          description: '자주 묻는 질문 및 도움말',
          lastModified: '2024-01-01'
        }
      ]
    },
    {
      category: 'legal',
      title: '약관 및 정책',
      icon: '⚖️',
      color: 'bg-gray-500',
      pages: [
        {
          title: '이용약관',
          url: '/terms',
          description: '서비스 이용 약관 및 조건',
          lastModified: '2024-01-01'
        },
        {
          title: '개인정보처리방침',
          url: '/privacy',
          description: '개인정보 수집 및 처리 방침',
          lastModified: '2024-01-01'
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: '전체', icon: '🌐' },
    { id: 'main', label: '메인', icon: '🏠' },
    { id: 'calculators', label: '계산기', icon: '🧮' },
    { id: 'info', label: '정보', icon: '📚' },
    { id: 'support', label: '지원', icon: '🛠️' },
    { id: 'legal', label: '약관', icon: '⚖️' }
  ];

  const filteredStructure = activeCategory === 'all' 
    ? siteStructure 
    : siteStructure.filter(section => section.category === activeCategory);

  const totalPages = siteStructure.reduce((total, section) => total + section.pages.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-lg border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-gray-900 mb-4"
              {...fadeInUp}
            >
              🗺️ 사이트맵
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              절약왕의 모든 페이지를 한눈에 확인하세요
            </motion.p>
            <motion.div
              className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                총 {totalPages}개 페이지
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {siteStructure.length}개 카테고리
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리 필터</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Site Structure */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {filteredStructure.map((section, index) => (
            <motion.div
              key={section.category}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <div className={`${section.color} p-6`}>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{section.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                    <p className="text-white/80 text-sm">
                      {section.pages.length}개 페이지
                    </p>
                  </div>
                </div>
              </div>

              {/* Pages List */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.pages.map((page, pageIndex) => (
                    <motion.div
                      key={page.url}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pageIndex * 0.1 }}
                      className="group border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link
                            href={page.url}
                            className="block group-hover:text-indigo-600 transition-colors"
                          >
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600">
                              {page.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {page.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-1"></span>
                                URL: {page.url}
                              </span>
                              <span className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-1"></span>
                                업데이트: {page.lastModified}
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="ml-4">
                          <Link
                            href={page.url}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-12 bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 접근</h3>
            <p className="text-gray-600 mb-6">
              자주 사용하는 기능들로 바로 이동하세요
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/telecom"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-2xl mb-2">📱</div>
                <div className="text-sm font-medium">통신비 절약</div>
              </Link>
              <Link
                href="/electricity"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium">전기요금 절약</div>
              </Link>
              <Link
                href="/loan"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🏦</div>
                <div className="text-sm font-medium">대출 재융자</div>
              </Link>
              <Link
                href="/subscription"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-2xl mb-2">📺</div>
                <div className="text-sm font-medium">구독 관리</div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* SEO Info */}
        <motion.div 
          className="mt-8 bg-gray-50 rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              🔍 <strong>검색엔진 최적화:</strong> 이 사이트맵은 사용자와 검색엔진 모두를 위한 것입니다.
            </p>
            <p>
              📄 <strong>XML 사이트맵:</strong> <Link href="/sitemap.xml" className="text-indigo-600 hover:underline">/sitemap.xml</Link>에서 
              기계 판독용 사이트맵을 확인할 수 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
