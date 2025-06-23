'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

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

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'general', label: '일반적인 질문', icon: '❓', color: 'bg-blue-500' },
    { id: 'calculators', label: '계산기 사용법', icon: '🧮', color: 'bg-green-500' },
    { id: 'technical', label: '기술적 문제', icon: '⚙️', color: 'bg-orange-500' },
    { id: 'account', label: '계정 관련', icon: '👤', color: 'bg-purple-500' },
    { id: 'privacy', label: '개인정보 보호', icon: '🔒', color: 'bg-gray-500' }
  ];

  const faqs = {
    general: [
      {
        id: 1,
        question: '절약왕은 무료로 사용할 수 있나요?',
        answer: '네, 절약왕의 모든 기능은 완전히 무료로 제공됩니다. 회원가입도 필요하지 않으며, 언제든지 자유롭게 이용하실 수 있습니다.',
        tags: ['무료', '서비스', '이용료']
      },
      {
        id: 2,
        question: '계산 결과가 정확한가요?',
        answer: '계산 결과는 입력하신 정보를 바탕으로 한 시뮬레이션입니다. 실제 상황에서는 다양한 변수가 있을 수 있으므로, 최종 결정 전에 해당 업체에 직접 확인하시는 것을 권장합니다.',
        tags: ['정확성', '계산', '결과']
      },
      {
        id: 3,
        question: '어떤 브라우저에서 사용할 수 있나요?',
        answer: 'Chrome, Firefox, Safari, Edge 등 모든 주요 브라우저에서 사용하실 수 있습니다. 모바일 브라우저에서도 원활하게 동작합니다.',
        tags: ['브라우저', '호환성', '모바일']
      },
      {
        id: 4,
        question: '데이터가 저장되나요?',
        answer: '입력하신 개인정보는 브라우저 로컬에만 저장되며, 서버로 전송되지 않습니다. 브라우저를 닫거나 캐시를 삭제하면 데이터가 사라집니다.',
        tags: ['데이터', '저장', '개인정보']
      }
    ],
    calculators: [
      {
        id: 5,
        question: '통신비 계산기는 어떻게 사용하나요?',
        answer: '현재 사용 중인 요금제 정보를 입력하면, 다양한 요금제와 비교하여 절약 가능한 금액을 보여드립니다. 사용량 패턴에 따른 맞춤 추천도 제공합니다.',
        tags: ['통신비', '요금제', '비교']
      },
      {
        id: 6,
        question: '전기요금 계산기의 사용량은 어디서 확인하나요?',
        answer: '전기요금 고지서나 한국전력공사 사이버지점에서 월별 사용량을 확인할 수 있습니다. 최근 3-6개월의 평균 사용량을 입력하시면 더 정확한 결과를 얻을 수 있습니다.',
        tags: ['전기요금', '사용량', '고지서']
      },
      {
        id: 7,
        question: '대출 계산기에서 어떤 정보가 필요한가요?',
        answer: '현재 대출 잔액, 금리, 남은 기간과 비교할 새로운 대출 조건을 입력하시면 됩니다. 대출 종류(주택담보, 신용대출 등)에 따라 적합한 상품을 추천해드립니다.',
        tags: ['대출', '금리', '재융자']
      },
      {
        id: 8,
        question: '구독서비스 관리는 어떤 기능인가요?',
        answer: '현재 구독 중인 서비스들을 등록하여 월별 지출을 한눈에 보고, 사용하지 않는 서비스를 찾아 절약할 수 있도록 도와드립니다.',
        tags: ['구독', '관리', '절약']
      }
    ],
    technical: [
      {
        id: 9,
        question: '페이지가 느리게 로딩됩니다',
        answer: '브라우저 캐시를 삭제하거나 페이지를 새로고침해보세요. 지속적인 문제가 있다면 다른 브라우저를 사용해보시거나 고객지원에 문의해주세요.',
        tags: ['속도', '로딩', '성능']
      },
      {
        id: 10,
        question: '계산 버튼이 작동하지 않습니다',
        answer: '모든 필수 항목이 입력되었는지 확인해주세요. JavaScript가 비활성화되어 있다면 활성화해주시고, 광고 차단 프로그램이 있다면 일시 해제해보세요.',
        tags: ['버튼', '오류', '입력']
      },
      {
        id: 11,
        question: '모바일에서 화면이 제대로 보이지 않습니다',
        answer: '화면을 세로 모드로 회전시켜보시거나, 브라우저 확대/축소 설정을 100%로 맞춰보세요. 여전히 문제가 있다면 사용 기기 정보와 함께 문의해주세요.',
        tags: ['모바일', '화면', '반응형']
      }
    ],
    account: [
      {
        id: 12,
        question: '회원가입이 필요한가요?',
        answer: '현재는 회원가입 없이 모든 서비스를 이용하실 수 있습니다. 향후 개인화된 서비스 제공을 위해 회원 기능이 추가될 예정입니다.',
        tags: ['회원가입', '계정', '로그인']
      },
      {
        id: 13,
        question: '내 데이터를 다른 기기에서도 볼 수 있나요?',
        answer: '현재는 브라우저 로컬 저장방식이므로 다른 기기에서는 확인할 수 없습니다. 회원 서비스 도입 시 클라우드 동기화 기능을 제공할 예정입니다.',
        tags: ['동기화', '기기', '데이터']
      }
    ],
    privacy: [
      {
        id: 14,
        question: '개인정보는 어떻게 보호되나요?',
        answer: '입력하신 모든 정보는 브라우저에만 저장되며 외부로 전송되지 않습니다. 자세한 내용은 개인정보처리방침을 참고해주세요.',
        tags: ['개인정보', '보호', '보안']
      },
      {
        id: 15,
        question: '쿠키나 추적 기술을 사용하나요?',
        answer: '서비스 개선을 위한 기본적인 분석 쿠키만 사용하며, 개인을 식별할 수 있는 정보는 수집하지 않습니다.',
        tags: ['쿠키', '추적', '분석']
      }
    ]
  };

  const allFAQs = Object.values(faqs).flat();

  const filteredFAQs = searchTerm
    ? allFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : faqs[activeCategory] || [];

  const quickLinks = [
    { title: '시작하기', url: '/guide', icon: '🚀' },
    { title: '계산기 사용법', url: '/guide#calculators', icon: '🧮' },
    { title: '문의하기', url: '/contact', icon: '📞' },
    { title: '피드백', url: '/feedback', icon: '💭' }
  ];

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
              🆘 도움말 & FAQ
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-6"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              자주 묻는 질문과 문제 해결 방법을 찾아보세요
            </motion.p>

            {/* Search */}
            <motion.div 
              className="max-w-md mx-auto"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="질문이나 키워드를 검색하세요..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchTerm('');
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      activeCategory === category.id && !searchTerm
                        ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 링크</h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-sm font-medium">{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchTerm ? `"${searchTerm}" 검색 결과` : categories.find(c => c.id === activeCategory)?.label}
                </h2>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `${filteredFAQs.length}개의 결과를 찾았습니다` 
                    : `${filteredFAQs.length}개의 질문과 답변`
                  }
                </p>
              </motion.div>

              {/* FAQ List */}
              <motion.div variants={staggerContainer} className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      variants={fadeInUp}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <div className={`transform transition-transform duration-200 ${
                            expandedFAQ === faq.id ? 'rotate-180' : ''
                          }`}>
                            ▼
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {faq.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                        >
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    variants={fadeInUp}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      검색 결과가 없습니다
                    </h3>
                    <p className="text-gray-600 mb-6">
                      다른 검색어를 사용해보시거나 카테고리를 선택해보세요
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      검색 초기화
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Contact Support */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl mb-4">💌</div>
              <h3 className="text-xl font-bold mb-2">원하는 답을 찾지 못하셨나요?</h3>
              <p className="mb-6 opacity-90">
                언제든지 문의해주세요. 빠르고 친절하게 도와드리겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  📞 문의하기
                </Link>
                <Link
                  href="/feedback"
                  className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium border border-white/30"
                >
                  💭 피드백 보내기
                </Link>
              </div>
            </motion.div>

            {/* Popular Articles */}
            <motion.div 
              className="mt-8 bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">인기 도움말</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guide" className="group p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📚</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600">서비스 시작하기</h4>
                      <p className="text-sm text-gray-600">절약왕 사용법 가이드</p>
                    </div>
                  </div>
                </Link>
                <Link href="/telecom" className="group p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600">통신비 절약하기</h4>
                      <p className="text-sm text-gray-600">요금제 비교 및 절약 팁</p>
                    </div>
                  </div>
                </Link>
                <Link href="/electricity" className="group p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600">전기요금 절약하기</h4>
                      <p className="text-sm text-gray-600">전력 사용량 최적화</p>
                    </div>
                  </div>
                </Link>
                <Link href="/privacy" className="group p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🔒</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600">개인정보 보호</h4>
                      <p className="text-sm text-gray-600">데이터 처리 방침</p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
