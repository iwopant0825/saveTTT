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

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'definitions', title: '용어 정의', icon: '📖' },
    { id: 'service', title: '서비스 이용', icon: '💻' },
    { id: 'account', title: '계정 관리', icon: '👤' },
    { id: 'data', title: '데이터 처리', icon: '📊' },
    { id: 'payment', title: '결제 및 환불', icon: '💳' },
    { id: 'liability', title: '책임 제한', icon: '⚖️' },
    { id: 'modification', title: '약관 변경', icon: '📝' },
    { id: 'termination', title: '서비스 종료', icon: '🚫' }
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
              📋 이용약관
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              절약왕 서비스 이용에 관한 약관 및 조건입니다
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500 mt-2"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              최종 업데이트: 2024년 1월 1일
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">목차</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-12">
              {/* Introduction */}
              <motion.section variants={fadeInUp} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">서비스 이용약관 동의</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    본 약관은 절약왕(이하 &ldquo;회사&rdquo;)이 제공하는 생활비 절약 계산기 서비스(이하 &ldquo;서비스&rdquo;)의 
                    이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                    <p className="text-blue-800 text-sm">
                      💡 <strong>중요:</strong> 본 서비스를 이용하시기 전에 반드시 전체 약관을 읽어보시기 바랍니다.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* 용어 정의 */}
              <motion.section variants={fadeInUp} id="definitions" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📖</span>
                  제1조 (용어 정의)
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">1. &ldquo;서비스&rdquo;</h4>
                    <p className="text-gray-600 text-sm">
                      회사가 제공하는 통신비, 전기요금, 대출, 구독서비스 등의 절약 계산기 및 관련 정보 서비스
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">2. &ldquo;이용자&rdquo;</h4>
                    <p className="text-gray-600 text-sm">
                      본 약관에 따라 회사가 제공하는 서비스를 받는 개인 또는 법인
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">3. &ldquo;계산 결과&rdquo;</h4>
                    <p className="text-gray-600 text-sm">
                      이용자가 입력한 정보를 바탕으로 제공되는 절약 시뮬레이션 및 분석 결과
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* 서비스 이용 */}
              <motion.section variants={fadeInUp} id="service" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">💻</span>
                  제2조 (서비스 이용)
                </h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. 서비스 제공</h4>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                      <li>• 회사는 24시간 연중무휴로 서비스를 제공합니다</li>
                      <li>• 정기점검, 시스템 업그레이드 등으로 서비스가 일시 중단될 수 있습니다</li>
                      <li>• 서비스 중단 시 사전 공지를 원칙으로 합니다</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. 이용자 의무</h4>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                      <li>• 정확한 정보를 입력해야 합니다</li>
                      <li>• 서비스를 부정한 목적으로 이용할 수 없습니다</li>
                      <li>• 타인의 권리를 침해하는 행위를 금지합니다</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* 계정 관리 */}
              <motion.section variants={fadeInUp} id="account" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">👤</span>
                  제3조 (계정 관리)
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>현재 버전:</strong> 본 서비스는 별도의 회원가입 없이 이용 가능합니다. 
                    향후 회원 서비스 제공 시 별도 약관이 적용됩니다.
                  </p>
                </div>
              </motion.section>

              {/* 데이터 처리 */}
              <motion.section variants={fadeInUp} id="data" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📊</span>
                  제4조 (데이터 처리)
                </h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. 데이터 수집</h4>
                    <p className="text-gray-600 text-sm">
                      서비스 개선을 위해 익명화된 사용 통계를 수집할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. 데이터 보안</h4>
                    <p className="text-gray-600 text-sm">
                      입력된 개인정보는 브라우저 로컬에만 저장되며, 서버로 전송되지 않습니다.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* 결제 및 환불 */}
              <motion.section variants={fadeInUp} id="payment" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">💳</span>
                  제5조 (결제 및 환불)
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    <strong>무료 서비스:</strong> 현재 모든 서비스는 무료로 제공됩니다. 
                    향후 유료 서비스 도입 시 별도 안내드리겠습니다.
                  </p>
                </div>
              </motion.section>

              {/* 책임 제한 */}
              <motion.section variants={fadeInUp} id="liability" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">⚖️</span>
                  제6조 (책임 제한)
                </h2>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">중요 고지사항</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• 계산 결과는 참고용이며, 실제 결과와 다를 수 있습니다</li>
                      <li>• 최종 결정은 이용자 본인의 판단에 따라 이루어져야 합니다</li>
                      <li>• 회사는 계산 결과로 인한 손해에 대해 책임지지 않습니다</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* 약관 변경 */}
              <motion.section variants={fadeInUp} id="modification" className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📝</span>
                  제7조 (약관 변경)
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    회사는 필요에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지 후 
                    7일 경과 시 효력이 발생합니다.
                  </p>
                </div>
              </motion.section>

              {/* 서비스 종료 */}
              <motion.section variants={fadeInUp} id="termination">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🚫</span>
                  제8조 (서비스 종료)
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    회사는 경영상의 이유로 서비스를 종료할 수 있으며, 이 경우 30일 전 공지합니다.
                  </p>
                </div>
              </motion.section>

              {/* Footer Actions */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gray-50 rounded-xl p-6 mt-12"
              >
                <div className="text-center space-y-4">
                  <p className="text-gray-600 text-sm">
                    본 약관에 동의하지 않으실 경우 서비스 이용을 중단해 주시기 바랍니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      문의하기
                    </Link>
                    <Link
                      href="/"
                      className="bg-white text-indigo-600 px-6 py-3 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
                    >
                      홈으로 돌아가기
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
