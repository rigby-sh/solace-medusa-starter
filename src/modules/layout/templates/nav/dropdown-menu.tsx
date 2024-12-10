import React from 'react'

import { cn } from '@lib/util/cn'
import { formatNameForTestId } from '@lib/util/formatNameForTestId'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
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
  customContent?: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  activeItem,
  children,
  customContent,
  isOpen,
  onOpenChange,
}) => {
  const renderSubcategories = (categories: CategoryItem[]) => (
    <Container className="flex flex-col gap-6 !px-14 !pb-8 !pt-5">
      <Button
        variant="tonal"
        className="w-max !px-3 !py-2"
        onClick={() => onOpenChange(false)}
        asChild
      >
        <LocalizedClientLink href={`${activeItem?.handle ?? '/'}`}>
          Shop all{' '}
          {activeItem?.name === 'Shop' || activeItem?.name === 'Collections'
            ? ''
            : activeItem?.name}
        </LocalizedClientLink>
      </Button>
      <div className="grid grid-cols-4 gap-8">
        {categories.map((subItem, index) => (
          <div key={index} className="flex flex-col gap-2">
            <NavigationItem
              href={subItem.handle}
              className="w-max py-2 text-lg text-basic-primary !duration-150 hover:border-b hover:border-action-primary"
              data-testid={formatNameForTestId(
                `${subItem.name}-category-title`
              )}
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
                    data-testid={formatNameForTestId(
                      `${childItem.name}-category-item`
                    )}
                  >
                    {childItem.name}
                  </NavigationItem>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  )

  return (
    <div
      className="flex"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      {children}
      {item.category_children && (
        <Box
          className={cn(
            'absolute left-0 top-full z-50 w-full translate-y-0 bg-primary shadow-lg transition-all duration-300',
            isOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none invisible opacity-0'
          )}
        >
          {customContent ?? renderSubcategories(item.category_children)}
        </Box>
      )}
    </div>
  )
}

export default DropdownMenu
