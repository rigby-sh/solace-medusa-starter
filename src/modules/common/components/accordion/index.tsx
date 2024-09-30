import { ElementRef, forwardRef } from 'react'

import { cn } from '@lib/util/cn'
import * as RadixAccordion from '@radix-ui/react-accordion'

export const Accordion = RadixAccordion.Root

export const AccordionItem = forwardRef<
  ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadixAccordion.Item
      ref={forwardedRef}
      className={cn(
        className,
        'rounded-[20px] border-[.5px] border-basic-primary bg-transparent'
      )}
      {...props}
    >
      {children}
    </RadixAccordion.Item>
  )
})
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = forwardRef<
  ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadixAccordion.Header className="w-full">
      <RadixAccordion.Trigger
        ref={forwardedRef}
        {...props}
        className={cn(
          className,
          'flex w-full items-center justify-between gap-10 pb-2'
        )}
      >
        {children}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
})
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = forwardRef<
  ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadixAccordion.Content
      ref={forwardedRef}
      {...props}
      className="all overflow-hidden transition data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down"
    >
      <div className={cn(className, 'pb-2')}>{children}</div>
    </RadixAccordion.Content>
  )
})
AccordionContent.displayName = 'AccordionContent'
