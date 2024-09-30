import React from 'react'

import { cn } from '@lib/util/cn'
import { cva } from 'cva'

const labelVariants = cva({
  base: 'font-normal',
  variants: {
    size: {
      xl: 'text-xl font-semibold',
      lg: 'text-lg font-normal',
      md: 'text-md font-normal',
      sm: 'text-sm font-medium',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  size?: 'xl' | 'lg' | 'md' | 'sm'
  className?: string
}

export function Label({ size, className, children, ...props }: LabelProps) {
  return (
    <label className={cn(labelVariants({ size }), className)} {...props}>
      {children}
    </label>
  )
}
