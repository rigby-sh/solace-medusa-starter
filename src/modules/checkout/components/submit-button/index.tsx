'use client'

import React from 'react'

import { Button } from '@modules/common/components/button'
import { useFormStatus } from 'react-dom'

export function SubmitButton({
  children,
  variant = 'filled',
  className,
  'data-testid': dataTestId,
}: {
  children: React.ReactNode
  variant?:
    | 'filled'
    | 'ghost'
    | 'tonal'
    | 'text'
    | 'destructive'
    | 'icon'
    | null
  className?: string
  'data-testid'?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant || 'filled'}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
