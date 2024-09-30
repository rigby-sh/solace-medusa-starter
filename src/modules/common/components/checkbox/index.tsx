import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@lib/util/cn'
import { MinusHeavyIcon } from '@modules/common/icons/minus-heavy'
import { TickHeavyIcon } from '@modules/common/icons/tick-heavy'
import * as RadixCheckbox from '@radix-ui/react-checkbox'

export const Checkbox = forwardRef<
  ElementRef<typeof RadixCheckbox.Root>,
  ComponentPropsWithoutRef<typeof RadixCheckbox.Root> & {
    onChange?: (checked: boolean) => void
  }
>(({ className, checked, onChange, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      'data-[state=unchecked]:border-primary data-[state=checked]:bg-fg-primary data-[state=indeterminate]:bg-fg-primary data-[state=unchecked]:bg-secondary data-[state=checked]:hover:bg-fg-primary-hover data-[state=indeterminate]:hover:bg-fg-primary-hover data-[state=unchecked]:hover:bg-hover m-2.5 flex h-5 w-5 items-center justify-center data-[state=unchecked]:border',
      {
        '!bg-disabled cursor-not-allowed !border-none': props.disabled,
      },

      className
    )}
    onCheckedChange={onChange}
    checked={checked}
    {...props}
  >
    <CheckboxIndicator checked={checked} disabled={props.disabled} />
  </RadixCheckbox.Root>
))

Checkbox.displayName = 'Checkbox'

const CheckboxIndicator = forwardRef<
  ElementRef<typeof RadixCheckbox.Indicator>,
  ComponentPropsWithoutRef<typeof RadixCheckbox.Indicator> & {
    checked?: boolean | 'indeterminate'
    disabled?: boolean
  }
>(({ className, checked, ...props }, ref) => (
  <RadixCheckbox.Indicator
    ref={ref}
    className={cn('flex items-center justify-center', className)}
    {...props}
  >
    {checked === 'indeterminate' ? (
      <MinusHeavyIcon
        className={cn('text-static h-3.5 w-3.5', {
          'text-disabled': props.disabled,
        })}
      />
    ) : (
      <TickHeavyIcon
        className={cn('text-static h-3.5 w-3.5', {
          'text-disabled': props.disabled,
        })}
      />
    )}
  </RadixCheckbox.Indicator>
))

CheckboxIndicator.displayName = 'CheckboxIndicator'
