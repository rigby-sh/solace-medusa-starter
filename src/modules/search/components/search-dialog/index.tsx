import { Fragment, useEffect, useState } from 'react'

import { StoreProduct } from '@medusajs/types'
import { Button } from '@modules/common/components/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@modules/common/components/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@modules/common/components/tabs'
import { ArrowLeftIcon } from '@modules/common/icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { ControlledSearchBox } from '../search-box'
import { RecentSearches } from '../search-dropdown/recent-searches'
import { RecommendedItem } from '../search-dropdown/recommended-item'

export const SearchDialog = ({
  isOpen,
  handleOpenDialogChange,
  countryCode,
  recommendedProducts,
}: {
  countryCode: string
  isOpen: boolean
  handleOpenDialogChange: (value: boolean) => void
  recommendedProducts: StoreProduct[]
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 900)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (isLargeScreen) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="!max-h-full !max-w-full !rounded-none"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex items-center gap-4 !border-b-0 !p-4 text-xl text-basic-primary small:text-2xl">
            <Button
              withIcon
              variant="text"
              onClick={() => handleOpenDialogChange(false)}
            >
              <ArrowLeftIcon />
            </Button>
            <ControlledSearchBox
              countryCode={countryCode}
              open={isOpen}
              closeSearch={() => handleOpenDialogChange(false)}
            />
          </DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Search modal</DialogTitle>
          </VisuallyHidden.Root>
          <DialogBody className="overflow-y-auto">
            <Tabs defaultValue="tab1">
              <TabsList className="flex shrink-0 rounded-t-md bg-primary">
                <TabsTrigger
                  value="tab1"
                  className="border-b border-basic-primary text-basic-primary data-[state=active]:border-action-primary"
                >
                  Search results
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="border-b border-basic-primary text-basic-primary data-[state=active]:border-action-primary"
                >
                  Recommended
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className="grow p-4 outline-none small:p-6"
                value="tab1"
              >
                <RecentSearches
                  handleOpenDialogChange={handleOpenDialogChange}
                />
              </TabsContent>
              <TabsContent
                className="grow p-4 outline-none small:p-6"
                value="tab2"
              >
                <div className="grid gap-3">
                  {recommendedProducts.map((item, id) => {
                    return (
                      <Fragment key={id}>
                        <RecommendedItem
                          item={item}
                          handleOpenDialogChange={handleOpenDialogChange}
                        />
                      </Fragment>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
