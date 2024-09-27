import React from 'react'

import { clx, Text } from '@medusajs/ui'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: 'small' | 'medium' | 'large'
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  customTrigger = undefined,
  forceMountContent = undefined,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        'border-grey-20 group border-t last:mb-0 last:border-b',
        'py-3',
        className
      )}
    >
      <AccordionPrimitive.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Text className="text-sm text-ui-fg-subtle">{title}</Text>
            </div>
            <AccordionPrimitive.Trigger>
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <Text as="span" size="small" className="mt-1">
              {subtitle}
            </Text>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          'px-1 radix-state-closed:pointer-events-none radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open'
        )}
      >
        <div className="inter-base-regular group-radix-state-closed:animate-accordion-close">
          {description && <Text>{description}</Text>}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="active:text-violet-60 focus:border-violet-60 rounded-rounded text-grey-90 hover:bg-grey-5 active:bg-grey-5 disabled:text-grey-30 group relative bg-transparent p-[6px] disabled:bg-transparent">
      <div className="h-5 w-5">
        <span className="rounded-circle absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] bg-grey-50 duration-300 group-radix-state-open:rotate-90" />
        <span className="rounded-circle absolute inset-x-[31.75%] bottom-1/2 top-[48%] h-[1.5px] bg-grey-50 duration-300 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 group-radix-state-open:rotate-90" />
      </div>
    </div>
  )
}

export default Accordion
