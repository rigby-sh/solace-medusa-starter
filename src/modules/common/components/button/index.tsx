import React, { forwardRef, ReactElement } from 'react'

import { cn } from '@lib/util/cn'
import { cva, VariantProps } from 'cva'

const buttonVariants = cva({
  base: 'rounded-3xl text-md px-4 py-3 transition-all duration-150 ease-in-out flex gap-2 items-center justify-center',
  variants: {
    variant: {
      filled:
        'bg-fg-primary hover:bg-fg-primary-hover active:bg-fg-primary-pressed text-static',
      ghost: 'bg-transparent hover:bg-hover active:bg-pressed !rounded-xl !p-4',
      tonal:
        'bg-fg-secondary text-action-primary hover:bg-fg-secondary-hover active:bg-fg-secondary-pressed [.dark_&]:bg-fg-tertiary [.dark_&]:hover:bg-fg-tertiary-hover [.dark_&]:active:bg-fg-tertiary-pressed [.dark_&]:text-static',
      text: 'bg-primary text-action-primary hover:text-action-primary-hover active:text-action-primary-pressed',
      destructive:
        'text-static bg-fg-primary-negative hover:bg-fg-primary-negative-hover active:bg-fg-primary-negative-pressed',
      icon: 'bg-transparent hover:bg-fg-secondary-hover active:bg-fg-secondary-pressed text-action-primary hover:text-action-primary-hover active:text-action-primary-pressed',
    },
    size: {
      sm: 'h-10',
      md: 'h-12',
    },
    withIcon: {
      true: '',
    },
    isLoading: {
      true: 'pointer-events-none',
    },
    disabled: {
      true: '!bg-disabled !text-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
  compoundVariants: [
    {
      withIcon: true,
      size: 'sm',
      className: '!p-[10px]',
    },
    {
      withIcon: true,
      size: 'md',
      className: '!p-[14px]',
    },
    {
      withIcon: true,
      variant: 'tonal',
      className:
        'bg-secondary text-basic-primary hover:bg-hover active:bg-pressed',
    },
    {
      withIcon: true,
      variant: 'icon',
      disabled: true,
      className: '!bg-transparent',
    },
  ],
})

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  asChild?: boolean
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  withIcon?: boolean
  testId?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      isLoading,
      className,
      children,
      asChild,
      withIcon,
      testId,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? ButtonSlot : 'button'

    const inner = asChild ? (
      children
    ) : (
      <>
        {isLoading ? (
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
            data-testid="spinner"
          />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </>
    )

    const buttonClassName = cn(
      buttonVariants({ ...props, isLoading, withIcon }),
      className
    )

    return (
      <Comp
        ref={ref}
        className={buttonClassName}
        data-testid={testId}
        {...props}
      >
        {inner}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export function ButtonSlot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  if (React.Children.count(children) > 1) {
    throw new Error('Only one child allowed')
  }
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: cn(props.className, children.props.className),
    })
  }
  return null
}
