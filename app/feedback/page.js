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

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: 'suggestion',
    rating: 5,
    category: 'general',
    title: '',
    description: '',
    email: '',
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'suggestion', label: '개선 제안', icon: '💡', color: 'bg-blue-500' },
    { id: 'bug', label: '버그 신고', icon: '🐛', color: 'bg-red-500' },
    { id: 'feature', label: '기능 요청', icon: '✨', color: 'bg-purple-500' },
    { id: 'compliment', label: '칭찬/감사', icon: '👏', color: 'bg-green-500' },
    { id: 'complaint', label: '불만사항', icon: '😕', color: 'bg-orange-500' }
  ];

  const categories = [
    { id: 'general', label: '전체 서비스' },
    { id: 'telecom', label: '통신비 계산기' },
    { id: 'electricity', label: '전기요금 계산기' },
    { id: 'loan', label: '대출 계산기' },
    { id: 'subscription', label: '구독 관리' },
    { id: 'ui', label: 'UI/UX' },
    { id: 'performance', label: '성능/속도' },
    { id: 'mobile', label: '모바일 버전' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제로는 API 호출을 할 곳
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">감사합니다!</h2>
          <p className="text-gray-600 mb-6">
            소중한 피드백을 보내주셔서 감사합니다. 
            더 나은 서비스를 만들기 위해 검토하겠습니다.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  type: 'suggestion',
                  rating: 5,
                  category: 'general',
                  title: '',
                  description: '',
                  email: '',
                  anonymous: false
                });
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              추가 피드백 보내기
            </button>
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
              💬 피드백
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              여러분의 의견이 절약왕을 더 좋게 만듭니다
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Stats */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 피드백 현황</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">이번 달 접수</span>
                  <span className="text-lg font-bold text-indigo-600">127개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">처리 완료</span>
                  <span className="text-lg font-bold text-green-600">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">평균 응답 시간</span>
                  <span className="text-lg font-bold text-orange-600">2.3일</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 인기 개선사항</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-sm text-gray-700">다크모드 지원</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-sm text-gray-700">PDF 내보내기</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-sm text-gray-700">알림 기능</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div 
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <motion.h2 
                variants={fadeInUp}
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                피드백 보내기
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    피드백 유형 *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {feedbackTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleInputChange('type', type.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.type === type.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Rating */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    서비스 만족도 *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleInputChange('rating', star)}
                        className={`text-2xl transition-colors ${
                          star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="ml-3 text-sm text-gray-600">
                      {formData.rating}점 / 5점
                    </span>
                  </div>
                </motion.div>

                {/* Category */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    관련 카테고리
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Title */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="피드백 제목을 입력해주세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </motion.div>

                {/* Description */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    상세 내용 *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="자세한 내용을 설명해주세요..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    최소 10자 이상 입력해주세요 ({formData.description.length}/1000)
                  </p>
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    이메일 (선택)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="답변 받을 이메일 (선택사항)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={formData.anonymous}
                  />
                </motion.div>

                {/* Anonymous Option */}
                <motion.div variants={fadeInUp}>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => {
                        handleInputChange('anonymous', e.target.checked);
                        if (e.target.checked) {
                          handleInputChange('email', '');
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">익명으로 제출</span>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fadeInUp} className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.title || !formData.description || formData.description.length < 10}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>전송 중...</span>
                      </div>
                    ) : (
                      '피드백 보내기'
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div 
          className="mt-12 bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            💡 더 나은 피드백을 위한 팁
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">구체적으로</h4>
              <p className="text-sm text-gray-600">어떤 부분에서 문제가 발생했는지 구체적으로 설명해주세요</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">환경 정보</h4>
              <p className="text-sm text-gray-600">사용 중인 기기, 브라우저 정보를 포함해주세요</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📸</div>
              <h4 className="font-semibold text-gray-900 mb-2">스크린샷</h4>
              <p className="text-sm text-gray-600">문제 상황의 스크린샷이 있다면 이메일로 첨부해주세요</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💖</div>
              <h4 className="font-semibold text-gray-900 mb-2">건설적으로</h4>
              <p className="text-sm text-gray-600">개선 방향에 대한 제안도 함께 해주시면 더욱 좋습니다</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
