'use client';

import { useEffect } from 'react';

export default function PWAManager() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // 업데이트 확인
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // 새로운 서비스 워커가 설치됨 - 사용자에게 새로고침 요청
                  if (confirm('새로운 버전이 사용 가능합니다. 새로고침하시겠습니까?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });

      // 서비스 워커 메시지 리스너
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          // 캐시가 업데이트됨을 사용자에게 알림
          console.log('캐시가 업데이트되었습니다');
        }
      });

      // 온라인/오프라인 상태 감지
      const handleOnline = () => {
        console.log('온라인 상태입니다');
        // 오프라인에서 온라인으로 전환 시 데이터 동기화
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
          navigator.serviceWorker.ready.then((registration) => {
            return registration.sync.register('background-sync');
          });
        }
      };

      const handleOffline = () => {
        console.log('오프라인 상태입니다');
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return null;
}
