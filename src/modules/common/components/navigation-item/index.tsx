import { ComponentProps, ReactNode } from 'react'

import { cn } from '@lib/util/cn'
import { Slot } from '@lib/util/slot'
import { cva, VariantProps } from 'cva'

const NavigationItemVariants = cva({
  base: 'hover:text-action-primary-hover transition-all duration-200 ease-in-out',
  variants: {
    variant: {
      primary: 'text-lg text-basic-primary',
      secondary: 'text-md text-secondary',
    },
    disabled: {
      true: 'pointer-events-none text-disabled',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface NavigationItemProps
  extends ComponentProps<'a'>,
    VariantProps<typeof NavigationItemVariants> {
  asChild?: boolean
  className?: string
  children?: ReactNode
}

export function NavigationItem({
  className,
  children,
  asChild,
  disabled,
  variant,
  ...props
}: NavigationItemProps) {
  const Comp = asChild ? Slot : 'a'

  const disabledProps = disabled
    ? {
        'aria-disabled': true,
        tabIndex: -1,
      }
    : {}

  return (
    <Comp
      {...props}
      {...disabledProps}
      className={cn(NavigationItemVariants({ variant, disabled }), className)}
    >
      {children}
    </Comp>
  )
}

NavigationItem.displayName = 'NavigationItem'
