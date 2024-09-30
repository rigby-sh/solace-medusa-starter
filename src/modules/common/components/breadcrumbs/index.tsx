import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@lib/util/cn'
import { Slot } from '@lib/util/slot'

export const Breadcrumbs = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, forwardedRef) => {
  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      aria-label="breadcrumbs"
      ref={forwardedRef}
      {...props}
    >
      {props.children}
    </div>
  )
})
Breadcrumbs.displayName = 'Breadcrumbs'

export const BreadcrumbsList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, forwardedRef) => {
  return (
    <ol
      ref={forwardedRef}
      className={cn('flex items-center justify-center gap-3', className)}
      {...props}
    >
      {props.children}
    </ol>
  )
})
BreadcrumbsList.displayName = 'BreadcrumbsList'

export const BreadcrumbsItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>((props, forwardedRef) => {
  return (
    <li ref={forwardedRef} {...props}>
      {props.children}
    </li>
  )
})
BreadcrumbsItem.displayName = 'BreadcrumbsItem'

interface BreadcrumbsLinkProps extends ComponentPropsWithoutRef<'a'> {
  asChild?: boolean
}

export const BreadcrumbsLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbsLinkProps
>(({ asChild, className, ...props }, forwardedRef) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      className={cn('cursor-pointer', className)}
      ref={forwardedRef}
      {...props}
    >
      {props.children}
    </Comp>
  )
})
BreadcrumbsLink.displayName = 'BreadcrumbsLink'

export const BreadcrumbsSeparator = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>((props, forwardedRef) => {
  return (
    <li role="presentation" aria-hidden="true" ref={forwardedRef} {...props}>
      {props.children ?? '/'}
    </li>
  )
})
BreadcrumbsSeparator.displayName = 'BreadcrumbsSeparator'

export const BreadcrumbsStatic = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, forwardedRef) => {
  return (
    <span
      role="link"
      aria-hidden="true"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-secondary', className)}
      ref={forwardedRef}
      {...props}
    >
      {props.children}
    </span>
  )
})
BreadcrumbsStatic.displayName = 'BreadcrumbsStatic'
