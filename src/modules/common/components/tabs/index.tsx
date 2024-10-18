import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@lib/util/cn'
import * as RadixTabs from '@radix-ui/react-tabs'

export const Tabs = forwardRef<
  React.ElementRef<typeof RadixTabs.Root>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Root>
>(({ className, children, ...props }, ref) => (
  <RadixTabs.Root ref={ref} className={cn('w-full', className)} {...props}>
    {children}
  </RadixTabs.Root>
))

Tabs.displayName = 'Tabs'

export const TabsList = forwardRef<
  ElementRef<typeof RadixTabs.List>,
  ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, children, ...props }, ref) => (
  <RadixTabs.List ref={ref} className={className} {...props}>
    {children}
  </RadixTabs.List>
))

TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      'text-primary w-full px-2 py-3 text-lg data-[state=active]:border-b data-[state=active]:border-action-primary data-[state=active]:text-action-primary',
      className
    )}
    {...props}
  >
    {children}
  </RadixTabs.Trigger>
))

TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = forwardRef<
  ElementRef<typeof RadixTabs.Content>,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, children, ...props }, ref) => (
  <RadixTabs.Content ref={ref} className={cn('w-full', className)} {...props}>
    {children}
  </RadixTabs.Content>
))

TabsContent.displayName = 'TabsContent'
