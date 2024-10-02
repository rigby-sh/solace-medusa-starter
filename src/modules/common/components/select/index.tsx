'use client'

import React from 'react'

import { cn } from '@lib/util/cn'
import Divider from '@modules/common/components/divider'
import { Label } from '@modules/common/components/label'
import { Text } from '@modules/common/components/text'
import { ChevronDownIcon, TickThinIcon } from '@modules/common/icons'
import * as SelectPrimitive from '@radix-ui/react-select'

import {
  ContentProps,
  GroupProps,
  ItemProps,
  RootProps,
  TriggerProps,
} from './types'

const SelectContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  error?: string
} | null>(null)

export const Select = ({
  children,
  value,
  onValueChange,
  error,
  className,
}: RootProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, isOpen, setIsOpen, error }}
    >
      <div ref={ref} className={className}>
        <SelectPrimitive.Root
          value={value}
          onValueChange={onValueChange}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          {children}
        </SelectPrimitive.Root>
      </div>
    </SelectContext.Provider>
  )
}
Select.displayName = 'Select'

/**
 * Used to label a group of items.
 */
export const SelectLabel: React.FC<
  React.ComponentPropsWithoutRef<typeof Label>
> = ({ className, children, ...props }) => {
  const context = React.useContext(SelectContext)

  return (
    <Label
      className={cn(
        'text-sm font-medium text-secondary',
        { 'text-negative': context?.error },
        className
      )}
      {...props}
    >
      {children}
    </Label>
  )
}
SelectLabel.displayName = 'SelectLabel'

/**
 * The trigger that toggles the select.
 */
export const SelectTrigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error('Trigger must be used within a Select')

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        onClick={() => context.setIsOpen(!context.isOpen)}
        className={cn(
          'border-primary flex w-full items-center justify-between gap-2 border !bg-secondary px-4 py-3 text-md focus-within:ring-0 focus-within:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
          { 'border-negative focus:border-negative': context.error },
          { 'border-action-primary': context.isOpen },
          className
        )}
        {...props}
      >
        {children}
        <span className="flex items-center gap-2.5">
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-5 w-5 text-basic-primary" />
          </SelectPrimitive.Icon>
        </span>
      </SelectPrimitive.Trigger>
    )
  }
)
SelectTrigger.displayName = 'SelectTrigger'

/**
 * The value of the select.
 */
export const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Value
    ref={ref}
    className={cn('select-value text-md text-basic-primary', className)}
    {...props}
  />
))
SelectValue.displayName = 'SelectValue'

/**
 * The content of the select (with the options).
 */
export const SelectContent = ({
  children,
  className,
  position = 'popper',
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  ...props
}: ContentProps) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'z-10 max-h-[300px] w-max border border-action-primary bg-primary py-2',
          className
        )}
        position={position}
        side={side}
        sideOffset={sideOffset}
        align={align}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center bg-primary py-0.5 text-secondary">
          <ChevronDownIcon className="h-4.5 w-4.5 rotate-180 text-basic-primary" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="w-full">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-auto cursor-default items-center justify-center bg-primary py-0.5 text-secondary">
          <ChevronDownIcon className="h-4.5 w-4.5 text-basic-primary" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}
SelectContent.displayName = 'SelectContent'

/**
 * Groups multiple items together.
 */
export const SelectGroup = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<GroupProps>
>(({ children, label, className }, ref) => (
  <SelectPrimitive.Group ref={ref}>
    {label && (
      <SelectPrimitive.Label
        className={cn('w-full p-4 text-md text-basic-primary', className)}
      >
        {label}
      </SelectPrimitive.Label>
    )}
    {children}
  </SelectPrimitive.Group>
))
SelectGroup.displayName = 'SelectGroup'

/**
 * An item in the select.
 */
export const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ value, children, className, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error('Item must be used within a Select')

    return (
      <SelectPrimitive.Item
        ref={ref}
        value={value}
        className={cn(
          'duration-250 flex w-full cursor-pointer items-center justify-between gap-2 p-4 text-lg text-basic-primary !outline-none transition-all ease-in-out hover:bg-hover focus:bg-hover',
          className
        )}
        {...props}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="pl-4">
          <TickThinIcon className="h-5 w-5" />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    )
  }
)
SelectItem.displayName = 'SelectItem'

/**
 * Used to be helper text.
 */
export const SelectDescription: React.FC<
  React.ComponentPropsWithoutRef<typeof Text>
> = ({ className, children, ...props }) => {
  const context = React.useContext(SelectContext)

  return (
    <Text
      as="p"
      className={cn(
        'mt-2 text-sm font-medium text-secondary',
        { 'text-negative': context?.error },
        className
      )}
      {...props}
    >
      {context?.error || children}
    </Text>
  )
}
SelectDescription.displayName = 'SelectDescription'

/**
 * Used to separate groups of items.
 */
export const SelectSeparator: React.FC<
  React.ComponentPropsWithoutRef<typeof Divider>
> = ({ className, ...props }) => <Divider className={className} {...props} />
SelectSeparator.displayName = 'SelectSeparator'
