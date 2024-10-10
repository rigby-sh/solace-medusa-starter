'use client'

import { useState } from 'react'
import Image from 'next/image'

export const LoadingImage = ({
  src,
  alt,
  priority,
  sizes,
  className,
}: {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
}) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <Image
        src={src}
        fill
        sizes={sizes}
        alt={alt}
        className={className}
        priority={priority}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
