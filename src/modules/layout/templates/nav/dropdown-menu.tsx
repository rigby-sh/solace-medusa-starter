import React from 'react'

import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { NavigationItem } from '@modules/common/components/navigation-item'

interface CategoryItem {
  name: string
  handle: string
  category_children?: CategoryItem[]
}

interface DropdownMenuProps {
  item: CategoryItem
  activeItem: {
    name: string
    handle: string
  }
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  activeItem,
  children,
  isOpen,
  onOpenChange,
}) => {
  const renderSubcategories = (categories: CategoryItem[]) => (
    <div className="flex flex-col gap-6 px-14 py-5">
      {activeItem && (
        <Button
          variant="tonal"
          className="w-max !px-3 !py-2"
          onClick={() => onOpenChange(false)}
          asChild
        >
          <LocalizedClientLink href={`${activeItem.handle}`}>
            Shop all{' '}
            {activeItem.name === 'Shop' || activeItem.name === 'Collections'
              ? ''
              : activeItem.name}
          </LocalizedClientLink>
        </Button>
      )}
      <div className="grid grid-cols-4 gap-8">
        {categories.map((subItem, index) => (
          <div key={index} className="flex flex-col">
            <NavigationItem
              href={subItem.handle}
              className="py-2 text-lg text-basic-primary"
            >
              {subItem.name}
            </NavigationItem>
            {subItem.category_children && (
              <div className="flex flex-col">
                {subItem.category_children.map((childItem, childIndex) => (
                  <NavigationItem
                    key={childIndex}
                    href={childItem.handle}
                    className="py-1.5 text-md text-secondary"
                  >
                    {childItem.name}
                  </NavigationItem>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div
      className="flex"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      {children}
      {item.category_children && isOpen && (
        <Box className="absolute left-0 top-full z-50 w-screen bg-white shadow-lg">
          {renderSubcategories(item.category_children)}
        </Box>
      )}
    </div>
  )
}

export default DropdownMenu
