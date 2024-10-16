'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'

import { createNavigation } from '@lib/constants'
import { StoreCollection, StoreProductCategory } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@modules/common/components/dialog'
import Divider from '@modules/common/components/divider'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import {
  ArrowLeftIcon,
  BarsIcon,
  ChevronRightIcon,
  XIcon,
} from '@modules/common/icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { CollectionsData } from 'types/strapi'

interface CategoryItem {
  name: string
  handle: string
}

const SideMenu = ({
  productCategories,
  collections,
  strapiCollections,
}: {
  productCategories: StoreProductCategory[]
  collections: StoreCollection[]
  strapiCollections: CollectionsData
}) => {
  const [categoryStack, setCategoryStack] = useState<CategoryItem[]>([])
  const currentCategory = categoryStack[categoryStack.length - 1] || null
  const [isOpen, setIsOpen] = useState(false)

  const navigation = useMemo(
    () => createNavigation(productCategories, collections),
    [productCategories, collections]
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

      const lastCategoryIndex = categories.findLastIndex(
        (cat) => cat.type === 'parent_category'
      )

      const strapiCollection = strapiCollections.data.find(
        (cmsCollection) => cmsCollection.Handle === item.handle_id
      )

      return item.type === 'collection' && strapiCollection ? (
        <LocalizedClientLink
          key={index}
          href={item.handle}
          className="relative mb-2"
          onClick={() => handleOpenDialogChange(false)}
        >
          <Image
            src={strapiCollection.Image.url}
            alt={strapiCollection.Title}
            width={600}
            height={160}
            className="h-[160px] w-full object-cover"
          />
          <Box className="absolute bottom-6 left-6">
            <Heading as="h3" className="text-2xl text-static">
              {strapiCollection.Title}
            </Heading>
          </Box>
        </LocalizedClientLink>
      ) : (
        <>
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-between"
            onClick={
              hasChildren
                ? () =>
                    handleCategoryClick({
                      name: item.name,
                      handle: item.handle,
                    })
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
          {index === lastCategoryIndex && (
            <Divider className="my-4 -ml-4 w-[calc(100%+2rem)]" />
          )}
        </>
      )
    })
  }

  const getActiveCategories = () => {
    let currentCategories = [
      ...(navigation[0]?.category_children || []),
      ...navigation.slice(1),
    ]

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

  const shouldRenderButton =
    !currentCategory || currentCategory.name !== 'Collections'

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="icon"
          withIcon
          className="flex h-auto !p-2 xsmall:!p-3.5 large:hidden"
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
          <DialogHeader className="flex items-center gap-4 !p-4 text-xl text-basic-primary small:text-2xl">
            {currentCategory && (
              <Button variant="tonal" withIcon size="sm" onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            )}
            {currentCategory?.name || 'Menu'}
            <Button
              onClick={() => handleOpenDialogChange(false)}
              variant="icon"
              withIcon
              size="sm"
              className="ml-auto p-2"
            >
              <XIcon />
            </Button>
          </DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Menu modal</DialogTitle>
          </VisuallyHidden.Root>
          <DialogBody className="overflow-y-auto p-4 small:p-5">
            <Box className="flex flex-col">
              {shouldRenderButton && (
                <Button
                  variant="tonal"
                  className="mb-4 w-max"
                  size="sm"
                  onClick={() => handleOpenDialogChange(false)}
                  asChild={!!currentCategory}
                >
                  <LocalizedClientLink
                    href={
                      currentCategory ? `${currentCategory.handle}` : `/shop`
                    }
                  >
                    Shop all{' '}
                    {currentCategory && currentCategory.name !== 'Shop'
                      ? currentCategory.name
                      : ''}
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
