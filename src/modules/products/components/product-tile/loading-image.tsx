'use client'

import { useState } from 'react'
import Image from 'next/image'

export const LoadingImage = ({
  src,
  alt,
  priority,
  loading,
  sizes,
  className,
  onClick,
}: {
  src: string
  alt: string
  priority?: boolean
  loading?: 'eager' | 'lazy'
  sizes?: string
  className?: string
  onClick?: () => void
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative h-full w-full" onClick={onClick}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <Image
        src={src}
        fill
        sizes={sizes}
        alt={alt}
        className={className}
        priority={priority}
        loading={loading}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
