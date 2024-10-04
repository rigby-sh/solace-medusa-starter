import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@lib/util/cn'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { cva, VariantProps } from 'cva'

export default function Radio({
  checked,
  'data-testid': dataTestId,
}: {
  checked: boolean
  'data-testid'?: string
}) {
  return (
    <>
      <button
        type="button"
        role="radio"
        aria-checked="true"
        data-state={checked ? 'checked' : 'unchecked'}
        className="group relative flex h-5 w-5 items-center justify-center outline-none"
        data-testid={dataTestId || 'radio-button'}
      >
        <div className="group-hover:shadow-borders-strong-with-shadow group-data-[state=checked]:shadow-borders-interactive flex h-[14px] w-[14px] items-center justify-center rounded-full bg-ui-bg-base shadow-borders-base transition-all group-focus:!shadow-borders-interactive-with-focus group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-borders-base group-data-[state=checked]:bg-ui-bg-interactive">
          {checked && (
            <span
              data-state={checked ? 'checked' : 'unchecked'}
              className="group flex items-center justify-center"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-ui-bg-base shadow-details-contrast-on-bg-interactive group-disabled:bg-ui-fg-disabled group-disabled:shadow-none"></div>
            </span>
          )}
        </div>
      </button>
    </>
  )
}

export const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadioGroup.Root>,
  ComponentPropsWithoutRef<typeof RadioGroup.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadioGroup.Root
      {...props}
      ref={forwardedRef}
      className={cn('flex flex-col', className)}
    />
  )
})

RadioGroupRoot.displayName = 'RadioGroupRoot'

const RadioGroupItemVariants = cva({
  base: 'flex h-5 w-5 items-center justify-center rounded-full border border-basic-primary  bg-secondary transition-all duration-150 ease-in-out hover:bg-hover group-data-[state=checked]:hover:bg-secondary',
  variants: {
    disabled: {
      true: 'bg-disabled hover:bg-disabled',
    },
    invalid: {
      true: 'border-negative',
    },
  },
})

interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroup.Item>,
    VariantProps<typeof RadioGroupItemVariants> {
  disabled?: boolean
  className?: string
}

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroup.Item>,
  RadioGroupItemProps
>(({ className, disabled, invalid, ...props }, forwardedRef) => {
  return (
    <RadioGroup.Item
      {...props}
      disabled={disabled}
      ref={forwardedRef}
      className="group relative m-2.5 flex h-5 w-5 items-center justify-center outline-none"
    >
      <div
        className={cn(RadioGroupItemVariants({ disabled, invalid }), className)}
      >
        {props.children}
      </div>
    </RadioGroup.Item>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'

const RadioGroupIndicatorVariants = cva({
  base: 'h-5 w-5 rounded-full border-[6px] border-action-primary transition-all duration-150 ease-in-out hover:border-action-primary-hover',
  variants: {
    disabled: {
      true: 'border-disabled bg-fg-disabled',
    },
  },
})

interface RadioGroupIndicatorProps
  extends ComponentPropsWithoutRef<typeof RadioGroup.Indicator>,
    VariantProps<typeof RadioGroupIndicatorVariants> {
  disabled?: boolean
  className?: string
}

export const RadioGroupIndicator = forwardRef<
  ElementRef<typeof RadioGroup.Indicator>,
  RadioGroupIndicatorProps
>(({ className, disabled, ...props }, forwardedRef) => {
  return (
    <RadioGroup.Indicator
      ref={forwardedRef}
      {...props}
      className="flex items-center justify-center"
    >
      <div
        className={cn(className, RadioGroupIndicatorVariants({ disabled }))}
      ></div>
    </RadioGroup.Indicator>
  )
})

RadioGroupIndicator.displayName = 'RadioGroupIndicator'
