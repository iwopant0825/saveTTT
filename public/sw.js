const CACHE_NAME = 'savinggking-v1.0.0';
const STATIC_CACHE_NAME = 'savinggking-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'savinggking-dynamic-v1.0.0';

// 캐시할 정적 자원들
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico',
  // 주요 페이지들
  '/telecom',
  '/electricity', 
  '/loan',
  '/subscription',
  '/guide',
  '/contact',
  '/privacy',
  '/terms',
  '/help',
  '/feedback',
  // 오프라인 페이지
  '/offline'
];

// 설치 이벤트 - 정적 자원 캐시
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// 활성화 이벤트 - 오래된 캐시 정리
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 같은 origin 요청만 처리
  if (url.origin !== self.location.origin) {
    return;
  }

  // 네비게이션 요청 (페이지 로딩)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // API 요청
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // 정적 자원 요청
  event.respondWith(handleStaticRequest(request));
});

// 네비게이션 요청 처리 (페이지)
async function handleNavigationRequest(request) {
  try {
    // 네트워크 우선 시도
    const networkResponse = await fetch(request);
    
    // 성공하면 동적 캐시에 저장
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // 네트워크 실패 시 캐시에서 찾기
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 캐시에도 없으면 오프라인 페이지 반환
    return caches.match('/offline') || new Response(
      createOfflineHTML(),
      { 
        headers: { 'Content-Type': 'text/html' },
        status: 200
      }
    );
  }
}

// API 요청 처리
async function handleApiRequest(request) {
  try {
    // API는 항상 네트워크 우선
    const networkResponse = await fetch(request);
    
    // GET 요청만 캐시
    if (request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // GET 요청이면 캐시 확인
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // 오프라인 상태 응답
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: '인터넷 연결을 확인해주세요' 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 503
      }
    );
  }
}

// 정적 자원 요청 처리
async function handleStaticRequest(request) {
  // 캐시 우선 전략
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // 캐시에 없으면 네트워크에서 가져와서 캐시
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    // 정적 자원을 찾을 수 없는 경우
    return new Response('자원을 찾을 수 없습니다', { status: 404 });
  }
}

// 오프라인 HTML 생성
function createOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>오프라인 - 절약왕</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .container { max-width: 400px; }
        .icon { font-size: 4rem; margin-bottom: 1rem; }
        h1 { font-size: 1.5rem; margin-bottom: 1rem; }
        p { opacity: 0.9; margin-bottom: 2rem; line-height: 1.6; }
        .button {
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .button:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📱</div>
        <h1>오프라인 상태입니다</h1>
        <p>인터넷 연결을 확인하고 다시 시도해주세요.<br>일부 기능은 오프라인에서도 사용할 수 있습니다.</p>
        <a href="/" class="button" onclick="window.location.reload()">다시 시도</a>
      </div>
    </body>
    </html>
  `;
}

// 백그라운드 동기화 (데이터 저장용)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // 오프라인 상태에서 저장된 데이터를 서버에 동기화
    const pendingData = await getStoredData();
    if (pendingData.length > 0) {
      await syncDataToServer(pendingData);
      await clearStoredData();
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// 푸시 알림 처리
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : '절약왕에서 새로운 알림이 있습니다',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'open',
        title: '확인하기'
      },
      {
        action: 'close', 
        title: '닫기'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('절약왕', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// 유틸리티 함수들
async function getStoredData() {
  // IndexedDB나 localStorage에서 오프라인 데이터 가져오기
  return [];
}

async function syncDataToServer(data) {
  // 서버에 데이터 동기화
  console.log('Syncing data to server:', data);
}

async function clearStoredData() {
  // 동기화된 데이터 삭제
  console.log('Clearing synced data');
}
