'use client'

import React, { useMemo, useState } from 'react'

import { createNavigation } from '@lib/constants'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@modules/common/components/dialog'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import {
  ArrowLeftIcon,
  BarsIcon,
  ChevronRightIcon,
} from '@modules/common/icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

interface CategoryItem {
  name: string
  handle: string
}

const SideMenu = (props: any) => {
  const [categoryStack, setCategoryStack] = useState<CategoryItem[]>([])
  const currentCategory = categoryStack[categoryStack.length - 1] || null
  const [isOpen, setIsOpen] = useState(false)

  const navigation = useMemo(
    () => createNavigation(props.productCategories, props.collections),
    [props.productCategories, props.collections]
  )

  const handleCategoryClick = (category: CategoryItem) => {
    setCategoryStack([
      ...categoryStack,
      { name: category.name, handle: category.handle },
    ])
  }

  const handleBack = () => {
    setCategoryStack(categoryStack.slice(0, -1))
  }

  const handleOpenDialogChange = (open: boolean) => {
    setIsOpen(open)

    if (!open) {
      setCategoryStack([])
    }
  }

  const renderCategories = (categories: any[]) => {
    return categories.map((item, index) => {
      const hasChildren =
        item.category_children && item.category_children.length > 0

      return (
        <Button
          key={index}
          variant="ghost"
          className="w-full justify-between"
          onClick={
            hasChildren
              ? () =>
                  handleCategoryClick({ name: item.name, handle: item.handle })
              : () => handleOpenDialogChange(false)
          }
          asChild={!hasChildren}
        >
          {hasChildren ? (
            <>
              <span className="flex items-center gap-4">
                {item.icon && item.icon}
                {item.name}
              </span>
              <ChevronRightIcon className="h-5 w-5" />
            </>
          ) : (
            <LocalizedClientLink href={item.handle}>
              <span className="flex items-center gap-4">
                {item.icon && item.icon}
                {item.name}
              </span>
            </LocalizedClientLink>
          )}
        </Button>
      )
    })
  }

  const getActiveCategories = () => {
    let currentCategories = navigation

    for (const category of categoryStack) {
      const found = currentCategories.find(
        (item) => item.name === category.name
      )
      if (found?.category_children) {
        currentCategories = found.category_children.map((category) => ({
          ...category,
          icon: null,
        }))
      } else {
        break
      }
    }
    return currentCategories
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="icon"
          withIcon
          className="flex h-auto !p-2.5 xsmall:!p-4 large:hidden"
        >
          <BarsIcon />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="!max-h-full !max-w-full !rounded-none"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex items-center gap-4 text-xl text-basic-primary small:text-2xl">
            {currentCategory && (
              <Button variant="tonal" withIcon size="sm" onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            )}
            {currentCategory?.name || 'Menu'}
            <DialogClose className="right-4" />
          </DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Menu modal</DialogTitle>
          </VisuallyHidden.Root>
          <DialogBody className="p-4 small:p-5">
            <Box className="flex flex-col">
              {currentCategory && (
                <Button
                  variant="tonal"
                  className="mb-4 w-max"
                  onClick={() => handleOpenDialogChange(false)}
                  asChild
                >
                  <LocalizedClientLink href={`${currentCategory.handle}`}>
                    Shop all{' '}
                    {currentCategory.name === 'Shop' ||
                    currentCategory.name === 'Collections'
                      ? ''
                      : currentCategory.name}
                  </LocalizedClientLink>
                </Button>
              )}
              {renderCategories(getActiveCategories())}
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default SideMenu
