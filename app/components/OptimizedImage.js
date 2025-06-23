import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.$rounded ? '8px' : '0'};
  background: #f3f4f6;
  
  ${props => props.$shadow && `
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `}
`

const PlaceholderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #9ca3af;
  font-size: 14px;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: ${props => props.$height || '200px'};
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// 최적화된 이미지 컴포넌트
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  placeholder = '이미지 로딩 중...',
  rounded = false,
  shadow = false,
  priority = false,
  quality = 75,
  sizes,
  fill = false,
  className = '',
  style = {},
  onLoad,
  onError,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = (e) => {
    setIsLoading(false)
    onLoad?.(e)
  }

  const handleError = (e) => {
    setIsLoading(false)
    setHasError(true)
    onError?.(e)
  }

  // 오류 발생시 플레이스홀더 표시
  if (hasError) {
    return (
      <ImageContainer 
        $rounded={rounded} 
        $shadow={shadow} 
        className={className}
        style={style}
      >
        <PlaceholderContainer $height={height ? `${height}px` : undefined}>
          <div>
            <div>🖼️</div>
            <div>이미지를 불러올 수 없습니다</div>
          </div>
        </PlaceholderContainer>
      </ImageContainer>
    )
  }

  return (
    <ImageContainer 
      $rounded={rounded} 
      $shadow={shadow} 
      className={className}
      style={style}
    >
      {isLoading && (
        <PlaceholderContainer $height={height ? `${height}px` : undefined}>
          <div>
            <LoadingSpinner />
            <div style={{ marginTop: '12px' }}>{placeholder}</div>
          </div>
        </PlaceholderContainer>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          objectFit: 'cover',
          ...style
        }}
        {...props}
      />
    </ImageContainer>
  )
}

// 미리 정의된 이미지 컴포넌트들
export const HeroImage = (props) => (
  <OptimizedImage
    {...props}
    priority={true}
    quality={90}
    rounded={true}
    shadow={true}
  />
)

export const ThumbnailImage = (props) => (
  <OptimizedImage
    {...props}
    quality={70}
    rounded={true}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)

export const IconImage = (props) => (
  <OptimizedImage
    {...props}
    quality={85}
    rounded={false}
    width={props.width || 64}
    height={props.height || 64}
  />
)
