'use client'

import { useEffect, useMemo, useState } from 'react'

import { createNavigation } from '@lib/constants'
import { cn } from '@lib/util/cn'
import { StoreCollection, StoreProductCategory } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { NavigationItem } from '@modules/common/components/navigation-item'

import DropdownMenu from './dropdown-menu'

export default function Navigation({
  countryCode,
  productCategories,
  collections,
}: {
  countryCode: string
  productCategories: StoreProductCategory[]
  collections: StoreCollection[]
}) {
  const [openDropdown, setOpenDropdown] = useState<{
    name: string
    handle: string
  } | null>(null)

  const navigation = useMemo(
    () => createNavigation(productCategories, collections),
    [productCategories, collections]
  )

  // Check if any dropdown with children is open
  const isExpandedDropdownOpen = useMemo(() => {
    if (!openDropdown) return false
    const openItem = navigation.find(
      (item) => item.handle === openDropdown.handle
    )
    return (
      openItem &&
      openItem.category_children &&
      openItem.category_children.length > 0
    )
  }, [openDropdown, navigation])

  // Prevent scrolling when a dropdown with children is open
  useEffect(() => {
    document.body.style.overflow = isExpandedDropdownOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpandedDropdownOpen])

  return (
    <Box className="hidden gap-4 large:flex">
      {navigation.map((item: any, index: number) => (
        <DropdownMenu
          key={index}
          item={item}
          activeItem={openDropdown}
          isOpen={openDropdown?.name === item.name}
          onOpenChange={(open) => {
            setOpenDropdown(
              open ? { name: item.name, handle: item.handle } : null
            )
          }}
        >
          <NavigationItem
            href={`/${countryCode}${item.handle}`}
            className={cn('!py-7 px-2')}
          >
            {item.name}
          </NavigationItem>
        </DropdownMenu>
      ))}
    </Box>
  )
}
