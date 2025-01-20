import React, { forwardRef, ReactElement } from 'react'

import { cn } from '@lib/util/cn'
import { Slot } from '@lib/util/slot'
import { cva, VariantProps } from 'cva'

const chipsVariants = cva({
  base: 'border-primary text-md text-basic-primary flex items-center justify-center gap-2 rounded-full border bg-primary px-4 py-1.5 transition-all duration-150 ease-in-out hover:bg-hover',
  variants: {
    selected: {
      true: 'text-basic-primary border-action-primary bg-fg-secondary hover:bg-fg-secondary-pressed',
    },
    disabled: {
      true: 'pointer-events-none border-disabled text-disabled',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      selected: true,
      className: 'border-disabled bg-disabled text-disabled',
    },
    {
      disabled: true,
      selected: false,
      className: 'border-disabled bg-disabled text-disabled',
    },
  ],
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof chipsVariants> {
  selected?: boolean
  children: React.ReactNode
  asChild?: boolean
  leftIcon?: ReactElement<any>
  rightIcon?: ReactElement<any>
  className?: string
  disabled?: boolean
  testId?: string
}

export const Chips = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, testId, className, leftIcon, rightIcon, ...props }, ref) => {
    const Comp = props.asChild ? Slot : 'button'

    const inner = (
      <>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </>
    )

    const chipsClassName = cn(chipsVariants({ ...props }), className)

    return (
      <Comp
        ref={ref}
        className={chipsClassName}
        data-testid={testId}
        {...props}
      >
        {inner}
      </Comp>
    )
  }
)

Chips.displayName = 'Chips'
