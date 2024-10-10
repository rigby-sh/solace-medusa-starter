import React from 'react'
import Image from 'next/image'

import { Text } from '@modules/common/components/text'
import clsx from 'clsx'

type ThumbnailProps<T extends React.ElementType = 'a'> = {
  as?: T
  thumbnail?: string | null
  size?: 'small' | 'big' | 'full'
  more?: string
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  'as' | 'thumbnail' | 'size' | 'more'
>

export default function OrderThumbnail<T extends React.ElementType = 'a'>({
  as,
  thumbnail,
  size = 'small',
  more,
  className,
  ...props
}: ThumbnailProps<T>) {
  const Component = as || 'a'

  return (
    <Component
      as={as}
      className={clsx(
        'relative overflow-hidden border border-basic-primary bg-primary p-2 transition-all duration-300 ease-in-out',
        className,
        {
          'hover:border-action-primary hover:bg-fg-secondary active:border-action-primary active:bg-primary':
            !more,
        },
        {
          'h-[56px] w-[48px]': size === 'small',
          'h-[92px] w-[80px]': size === 'big',
          'h-full w-full': size === 'full',
        }
      )}
      {...props}
    >
      {more ? (
        <Text className="flex h-full w-full items-center justify-center text-lg text-basic-primary">
          {more}
        </Text>
      ) : (
        <ImageOrPlaceholder image={thumbnail} size={size} />
      )}
    </Component>
  )
}

const ImageOrPlaceholder = ({
  image,
}: Pick<ThumbnailProps, 'size'> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 h-full w-full object-cover object-center"
      draggable={false}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      loading="eager"
      width={500}
      height={500}
    />
  ) : (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-action-primary border-t-transparent" />
    </div>
  )
}
