'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { useClearFiltersUrl } from '@lib/hooks/use-clear-filters-url'
import { Button } from '@modules/common/components/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@modules/common/components/dialog'
import { FilterIcon } from '@modules/common/icons/filter'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

export default function ProductFiltersDrawer({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const clearAllUrl = useClearFiltersUrl()

  const handleOpenDialogChange = (open: boolean) => {
    setIsOpen(open)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild>
        <Button variant="tonal" className="flex small:hidden">
          <FilterIcon />
          Filters
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="!max-h-full !max-w-full !rounded-none"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex items-center gap-4 text-xl text-basic-primary small:text-2xl">
            Filters
            <DialogClose className="right-4" />
          </DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Filters Modal</DialogTitle>
          </VisuallyHidden.Root>
          <DialogBody className="overflow-y-auto p-5">{children}</DialogBody>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <Button variant="tonal" onClick={() => setIsOpen(false)} asChild>
              <Link href={clearAllUrl}>Clear filters</Link>
            </Button>
            <Button onClick={() => setIsOpen(false)}>View products</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
