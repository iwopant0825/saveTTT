'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Smartphone } from 'lucide-react';
import { trackPWAInstall } from './GoogleAnalytics';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // iOS 확인
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // 이미 설치되어 있는지 확인
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);

    // 이전에 dismiss했는지 확인
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    setDismissed(dismissed === 'true');

    // beforeinstallprompt 이벤트 리스너
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // 조건에 따라 프롬프트 표시
      if (!isStandalone && !dismissed) {
        setTimeout(() => setShowPrompt(true), 3000); // 3초 후 표시
      }
    };

    // appinstalled 이벤트 리스너
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA 설치 승인됨');
      trackPWAInstall();
    } else {
      console.log('PWA 설치 거부됨');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = (temporary = false) => {
    setShowPrompt(false);
    
    if (!temporary) {
      localStorage.setItem('pwa-install-dismissed', 'true');
      setDismissed(true);
    }
  };

  // 설치됨 또는 지원하지 않거나 dismiss된 경우 표시하지 않음
  if (isInstalled || dismissed || (!deferredPrompt && !isIOS)) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <>
          {/* 데스크톱/안드로이드용 프롬프트 */}
          {!isIOS && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    절약왕 앱 설치
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    홈 화면에 추가하여 더 빠르고 편리하게 이용하세요!
                  </p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleInstall}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      설치하기
                    </button>
                    <button
                      onClick={() => handleDismiss(true)}
                      className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                    >
                      나중에
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDismiss(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* iOS용 프롬프트 */}
          {isIOS && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-indigo-600" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">
                  절약왕을 홈 화면에 추가하세요
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Safari 하단의 <strong>공유</strong> 버튼을 누르고 <strong>&ldquo;홈 화면에 추가&rdquo;</strong>를 선택하세요.
                </p>
                
                <div className="flex items-center justify-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">📤</span>
                    </div>
                    <span className="text-sm text-gray-600">→</span>
                    <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-xs">+</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDismiss(true)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    나중에
                  </button>
                  <button
                    onClick={() => handleDismiss(false)}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    확인
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

// PWA 상태 표시 컴포넌트
export function PWAStatus() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkPWAStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInAppBrowser = window.navigator.standalone === true;
      setIsInstalled(isStandalone || isInAppBrowser);
    };

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    checkPWAStatus();
    handleOnlineStatus();

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  if (!isInstalled) return null;

  return (
    <div className="fixed top-16 right-4 z-40">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        isOnline 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isOnline ? '🟢 온라인' : '🔴 오프라인'}
      </div>
    </div>
  );
}
