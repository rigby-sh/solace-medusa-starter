'use client'

import { useState } from 'react'

import { cn } from '@lib/util/cn'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { SearchIcon, SolaceLogo } from '@modules/common/icons'
import SideMenu from '@modules/layout/components/side-menu'
import { SearchDialog } from '@modules/search/components/search-dialog'
import SearchDropdown from '@modules/search/components/search-dropdown'

import Navigation from './navigation'

export default function NavContent(props: any) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <Box className="flex large:hidden">
        <SideMenu
          productCategories={props.productCategories}
          collections={props.collections}
          strapiCollections={props.strapiCollections}
        />
      </Box>
      {!isSearchOpen && (
        <Navigation
          countryCode={props.countryCode}
          productCategories={props.productCategories}
          collections={props.collections}
          strapiCollections={props.strapiCollections}
        />
      )}
      {isSearchOpen && (
        <SearchDropdown
          setIsOpen={setIsSearchOpen}
          recommendedProducts={props.products}
          isOpen={isSearchOpen}
          countryCode={props.countryCode}
        />
      )}
      <SearchDialog
        recommendedProducts={props.products}
        countryCode={props.countryCode}
        isOpen={isSearchOpen}
        handleOpenDialogChange={setIsSearchOpen}
      />
      <Box
        className={cn('relative block', {
          'medium:absolute medium:left-1/2 medium:top-1/2 medium:-translate-x-1/2 medium:-translate-y-1/2':
            !isSearchOpen,
          'right-0 z-40': isSearchOpen,
        })}
      >
        <LocalizedClientLink href="/">
          <SolaceLogo className="h-6 medium:h-7" />
        </LocalizedClientLink>
      </Box>
      {!isSearchOpen && (
        <Button
          variant="icon"
          withIcon
          className="ml-auto h-auto !p-2 xsmall:!p-3.5"
          onClick={() => setIsSearchOpen(true)}
          data-testid="search-button"
        >
          <SearchIcon />
        </Button>
      )}
    </>
  )
}
