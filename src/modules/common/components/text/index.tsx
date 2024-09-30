import { ComponentPropsWithoutRef } from 'react'

import { cn } from '@lib/util/cn'
import { cva } from 'cva'

const textVariants = cva({
  base: 'font-normal',
  variants: {
    size: {
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface TextProps<T extends 'p' | 'span' | 'div'> {
  as?: T
  size?: 'lg' | 'md' | 'sm'
}

export function Text<T extends 'p' | 'span' | 'div'>({
  as,
  size,
  className,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>> & TextProps<T>) {
  const Component = as ?? 'p'
  return (
    <Component className={cn(textVariants({ size }), className)} {...props}>
      {children}
    </Component>
  )
}
