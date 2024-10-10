import { ElementRef, forwardRef, HTMLAttributes } from 'react'

import { cn } from '@lib/util/cn'
import { XIcon } from '@modules/common/icons'
import * as RadixDialog from '@radix-ui/react-dialog'

import { Button } from '../button'

export const Dialog = RadixDialog.Root

export const DialogTrigger = RadixDialog.Trigger

export const DialogPortal = RadixDialog.Portal
export const DialogTitle = RadixDialog.Title

export const DialogClose = forwardRef<
  ElementRef<typeof RadixDialog.Close>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Close>
>(({ className, children, ...props }, forwardedRef) => {
  const inner = children ?? (
    <Button withIcon variant="tonal" className="bg-transparent outline-none">
      <XIcon />
    </Button>
  )
  return (
    <RadixDialog.Close
      asChild
      ref={forwardedRef}
      className={cn(className, 'absolute h-12 w-12')}
      {...props}
    >
      {inner}
    </RadixDialog.Close>
  )
})
DialogClose.displayName = 'DialogClose'

export const DialogOverlay = forwardRef<
  ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadixDialog.Overlay
      ref={forwardedRef}
      className={cn(className, 'fixed inset-0 z-50 bg-black/40')}
      {...props}
    />
  )
})
DialogOverlay.displayName = 'DialogOverlay'

export const DialogContent = forwardRef<
  ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadixDialog.Content
      ref={forwardedRef}
      className={cn(
        className,
        'fixed left-[50%] top-[50%] z-50 flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col overflow-y-auto overflow-x-hidden bg-primary shadow-black-basic'
      )}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  )
})
DialogContent.displayName = 'DialogContent'

export function DialogFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        className,
        'w-full text-wrap border-t-[.5px] border-basic-primary p-5'
      )}
      {...props}
    >
      {children}
    </div>
  )
}
DialogFooter.displayName = 'DialogFooter'

export function DialogHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        className,
        'relative w-full border-b-[.5px] border-basic-primary p-5 pr-16'
      )}
      {...props}
    >
      {children}
    </div>
  )
}
DialogHeader.displayName = 'DialogHeader'

export function DialogBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className, 'h-full w-full text-wrap')} {...props}>
      {children}
    </div>
  )
}
DialogBody.displayName = 'DialogBody'
