'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Home, Calculator, BookOpen, Phone } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };

  const offlineFeatures = [
    {
      icon: Calculator,
      title: '계산기 기능',
      description: '기본적인 계산기 기능은 오프라인에서도 사용 가능합니다',
      available: true
    },
    {
      icon: BookOpen,
      title: '가이드 보기',
      description: '이전에 방문한 가이드 페이지를 확인할 수 있습니다',
      available: true
    },
    {
      icon: Phone,
      title: '연락처 정보',
      description: '고객지원 연락처 정보를 확인할 수 있습니다',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 메인 카드 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8"
          {...fadeInUp}
        >
          {/* 상태 아이콘 */}
          <motion.div 
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              isOnline ? 'bg-green-100' : 'bg-red-100'
            }`}
            animate={{ 
              scale: isOnline ? [1, 1.1, 1] : [1, 0.95, 1],
              rotate: isOnline ? 0 : [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isOnline ? (
              <Wifi className="w-10 h-10 text-green-600" />
            ) : (
              <WifiOff className="w-10 h-10 text-red-600" />
            )}
          </motion.div>

          {/* 메시지 */}
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-4"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {isOnline ? '연결이 복구되었습니다!' : '인터넷 연결이 끊어졌습니다'}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            {isOnline 
              ? '이제 모든 기능을 정상적으로 사용할 수 있습니다.'
              : '네트워크 연결을 확인하고 다시 시도해주세요. 일부 기능은 오프라인에서도 사용 가능합니다.'
            }
          </motion.p>

          {/* 액션 버튼 */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleRetry}
              disabled={isOnline}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isOnline 
                  ? 'bg-green-600 text-white cursor-default' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }`}
            >
              <RefreshCw 
                className={`w-5 h-5 ${!isOnline && retryCount > 0 ? 'animate-spin' : ''}`} 
              />
              <span>{isOnline ? '연결됨' : '다시 시도'}</span>
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              <span>홈으로 이동</span>
            </Link>
          </motion.div>

          {/* 재시도 횟수 표시 */}
          {retryCount > 0 && !isOnline && (
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              재시도 횟수: {retryCount}번
            </motion.p>
          )}
        </motion.div>

        {/* 오프라인 기능 안내 */}
        {!isOnline && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔧 오프라인에서 사용 가능한 기능
            </h2>
            
            <div className="space-y-4">
              {offlineFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      feature.available ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      feature.available ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        feature.available ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        feature.available ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${
                        feature.available ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 연결 팁 */}
        {!isOnline && (
          <motion.div 
            className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 연결 문제 해결 팁</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Wi-Fi 또는 모바일 데이터 연결을 확인해주세요</li>
              <li>• 라우터를 재시작해보세요</li>
              <li>• 다른 웹사이트가 정상적으로 작동하는지 확인해주세요</li>
              <li>• 브라우저 캐시를 삭제해보세요</li>
              <li>• VPN을 사용 중이라면 잠시 해제해보세요</li>
            </ul>
          </motion.div>
        )}

        {/* 문의 정보 */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-600">
            문제가 지속되면{' '}
            <a 
              href="mailto:contact@savinggking.com" 
              className="text-indigo-600 hover:underline font-medium"
            >
              contact@savinggking.com
            </a>
            {' '}으로 문의해주세요
          </p>
        </motion.div>
      </div>
    </div>
  );
}
