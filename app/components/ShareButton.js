'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Facebook, Twitter, Linkedin } from 'lucide-react';
import { trackShare } from './GoogleAnalytics';

export default function ShareButton({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = '절약왕 - 생활비 절약 계산기',
  description = '통신비, 전기요금, 대출, 구독서비스 절약을 도와주는 올인원 계산기',
  className = '',
  size = 'medium'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const shareOptions = [
    {
      name: '카카오톡',
      icon: MessageCircle,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      action: () => shareKakao(url, title, description)
    },
    {
      name: '페이스북',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => shareFacebook(url)
    },
    {
      name: '트위터',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => shareTwitter(url, title)
    },
    {
      name: '링크드인',
      icon: Linkedin,
      color: 'bg-blue-800 hover:bg-blue-900',
      action: () => shareLinkedIn(url, title, description)
    },
    {
      name: '링크 복사',
      icon: copied ? Check : Copy,
      color: copied ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-700',
      action: () => copyToClipboard(url)
    }
  ];

  // 카카오톡 공유
  const shareKakao = (url, title, description) => {
    if (typeof window !== 'undefined' && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: `${window.location.origin}/og-image.png`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
      trackShare('kakao', window.location.pathname);
    } else {
      // 카카오 SDK가 없는 경우 카카오톡 앱 스킴 사용
      const kakaoURL = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      window.open(kakaoURL, '_blank');
    }
    setIsOpen(false);
  };

  // 페이스북 공유
  const shareFacebook = (url) => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookURL, '_blank', 'width=600,height=400');
    trackShare('facebook', window.location.pathname);
    setIsOpen(false);
  };

  // 트위터 공유
  const shareTwitter = (url, title) => {
    const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(twitterURL, '_blank', 'width=600,height=400');
    trackShare('twitter', window.location.pathname);
    setIsOpen(false);
  };

  // 링크드인 공유
  const shareLinkedIn = (url, title, description) => {
    const linkedInURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInURL, '_blank', 'width=600,height=400');
    trackShare('linkedin', window.location.pathname);
    setIsOpen(false);
  };

  // 클립보드에 복사
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackShare('clipboard', window.location.pathname);
    } catch (err) {
      // 클립보드 API가 지원되지 않는 경우
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackShare('clipboard', window.location.pathname);
    }
    setIsOpen(false);
  };

  // 네이티브 공유 API 사용 (모바일)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.log('공유가 취소되었습니다.');
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleNativeShare}
        className={`${sizeClasses[size]} bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="공유하기"
      >
        <Share2 size={iconSizes[size]} />
      </motion.button>

      {/* 공유 옵션 팝업 */}
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 공유 옵션 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 min-w-max"
          >
            <div className="text-xs text-gray-600 mb-2 px-2 font-medium">공유하기</div>
            <div className="grid grid-cols-5 gap-2">
              {shareOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.name}
                    onClick={option.action}
                    className={`${option.color} text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={option.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon size={18} />
                  </motion.button>
                );
              })}
            </div>
            
            {/* 화살표 */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
          </motion.div>
        </>
      )}
    </div>
  );
}

// 간단한 텍스트 공유 버튼
export function SimpleShareButton({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = '절약왕에서 확인해보세요!',
  className = '' 
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      <span className="text-sm font-medium">
        {copied ? '복사됨!' : '공유하기'}
      </span>
    </button>
  );
}

// 결과 공유용 컴포넌트
export function ResultShareButton({ 
  result, 
  calculatorType,
  className = '' 
}) {
  const getShareText = () => {
    switch (calculatorType) {
      case 'telecom':
        return `절약왕에서 통신비를 계산해봤어요! 월 ${result.savings?.toLocaleString()}원 절약 가능해요! 🎉`;
      case 'electricity':
        return `절약왕에서 전기요금을 분석해봤어요! 월 ${result.savings?.toLocaleString()}원 절약할 수 있어요! ⚡`;
      case 'loan':
        return `절약왕에서 대출 재융자를 계산해봤어요! 총 ${result.totalSavings?.toLocaleString()}원 절약 가능해요! 🏦`;
      case 'subscription':
        return `절약왕에서 구독서비스를 분석해봤어요! 월 ${result.unusedCost?.toLocaleString()}원 절약할 수 있어요! 📺`;
      default:
        return '절약왕에서 생활비를 절약해보세요! 💰';
    }
  };

  return (
    <ShareButton
      title={getShareText()}
      description="지금 바로 절약왕에서 여러분도 절약해보세요!"
      className={className}
    />
  );
}
