import { ElementRef, forwardRef, HTMLAttributes } from 'react'

import { cn } from '@lib/util/cn'
import { XIcon } from '@modules/common/icons'
import * as RadixDialog from '@radix-ui/react-dialog'

import { Button } from '../button'

export const Dialog = RadixDialog.Root

export const DialogTrigger = RadixDialog.Trigger

export const DialogPortal = RadixDialog.Portal

export const DialogClose = forwardRef<
  ElementRef<typeof RadixDialog.Close>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Close>
>(({ className, children, ...props }, forwardedRef) => {
  const inner = children ?? (
    <Button withIcon variant="icon" size="sm">
      <XIcon />
    </Button>
  )

  return (
    <RadixDialog.Close
      ref={forwardedRef}
      className={cn(
        className,
        'absolute right-4 top-2.5 small:right-4 small:top-4'
      )}
      asChild
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
        'fixed left-[50%] top-[50%] z-50 flex h-full max-h-full w-full max-w-[600px] translate-x-[-50%] translate-y-[-50%] flex-col bg-primary shadow-black-basic small:max-h-[654px] small:rounded-[20px]'
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
        'w-full text-wrap border-t-[.5px] border-basic-primary p-4 small:p-5'
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
    <RadixDialog.Title
      className={cn(
        className,
        'w-full border-b-[.5px] border-basic-primary p-4 pr-16 small:p-5'
      )}
      {...props}
    >
      {children}
    </RadixDialog.Title>
  )
}
DialogHeader.displayName = 'DialogHeader'

export function DialogBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        className,
        'h-full overflow-y-auto text-wrap p-4 small:p-5'
      )}
      {...props}
    >
      {children}
    </div>
  )
}
DialogBody.displayName = 'DialogBody'
