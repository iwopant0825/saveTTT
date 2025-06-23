'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, MessageCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // 에러 로깅 (실제 환경에서는 에러 추적 서비스로 전송)
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 에러 리포팅 (예: Sentry, LogRocket 등)
    if (typeof window !== 'undefined') {
      this.reportError(error, errorInfo);
    }
  }

  reportError = (error, errorInfo) => {
    // 에러 정보를 외부 서비스에 전송
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // 실제 구현에서는 fetch를 사용해 에러 로깅 API로 전송
    console.log('Error reported:', errorData);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error} 
        onRetry={this.handleRetry}
      />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, onRetry }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
          {...fadeInUp}
        >
          {/* 에러 아이콘 */}
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </motion.div>

          {/* 에러 메시지 */}
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-4"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            앗! 문제가 발생했습니다
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </motion.p>

          {/* 에러 상세 정보 (개발 모드에서만) */}
          {process.env.NODE_ENV === 'development' && error && (
            <motion.div 
              className="bg-gray-100 rounded-lg p-4 mb-6 text-left"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-gray-900 mb-2">개발자 정보:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-40">
                {error.message}
                {'\n\n'}
                {error.stack}
              </pre>
            </motion.div>
          )}

          {/* 액션 버튼 */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
            {...fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={onRetry}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              <span>다시 시도</span>
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              <span>홈으로 이동</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              <span>문의하기</span>
            </Link>
          </motion.div>

          {/* 도움말 */}
          <motion.div 
            className="text-sm text-gray-500"
            {...fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <p>문제가 계속 발생하면 아래 정보와 함께 문의해주세요:</p>
            <p className="mt-2 font-mono bg-gray-100 rounded p-2">
              오류 코드: ERR_{Date.now().toString(36).toUpperCase()}
            </p>
          </motion.div>
        </motion.div>

        {/* 문제 해결 팁 */}
        <motion.div 
          className="mt-6 bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            💡 문제 해결 방법
          </h2>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>페이지를 새로고침해보세요 (Ctrl+F5 또는 Cmd+R)</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>브라우저 캐시를 삭제해보세요</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>다른 브라우저에서 시도해보세요</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <span>문제가 지속되면 고객지원팀에 문의해주세요</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
