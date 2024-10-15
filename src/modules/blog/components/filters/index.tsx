'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { createUrl } from '@lib/util/urls'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/common/components/accordion'
import { Box } from '@modules/common/components/box'
import Divider from '@modules/common/components/divider'
import { Label } from '@modules/common/components/label'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
} from '@modules/common/components/radio'
import { ChevronDownIcon } from '@modules/common/icons'
import { omit } from 'lodash'

import RefinementList from '../refinement-list'
import SearchBox from '../search-box'

type FiltersProps = {
  data: { value: string; label: string }[]
  countryCode: string
}

const Filters = ({ data, countryCode }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const allCategories = [
    {
      value: 'all-posts',
      label: 'All posts',
    },
    ...data,
  ]

  // Get current category value from URL params (only one selected value is allowed)
  const selectedCategory = searchParams.get('category') || 'all-posts'
  const searchParamsObj = omit(
    Object.fromEntries(searchParams.entries()),
    'page' // Remove pagination when changing filters
  )

  // Clear search params when all posts
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const category = searchParams.get('category')

    if (category === 'all-posts') {
      params.delete('category')
    }

    router.push(`?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <div className="w-full bg-primary medium:sticky medium:top-24 medium:px-1.5">
      <Box className="my-6 medium:my-0 medium:px-3.5 medium:py-5">
        <SearchBox countryCode={countryCode} />
      </Box>
      <Divider className="hidden medium:block" />
      <Box className="block medium:hidden">
        <RefinementList
          options={allCategories}
          sortBy={selectedCategory}
          queryName="category"
        />
      </Box>
      {/* Desktop view */}
      <Accordion
        type="single"
        collapsible
        defaultValue={isOpen ? 'content' : undefined}
        onValueChange={(value) => setIsOpen(!!value)}
        className="hidden medium:block"
      >
        <AccordionItem
          value="content"
          className="rounded-none border-none medium:px-3.5 medium:py-5"
        >
          <AccordionTrigger className="flex w-full justify-between medium:py-2">
            <span className="text-lg font-medium">Category</span>
            <span>
              {isOpen ? (
                <ChevronDownIcon className="h-5 w-5 rotate-180" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <Box className="mt-4 flex flex-col space-y-2">
              <RadioGroupRoot value={selectedCategory}>
                {allCategories.map((cat) => {
                  // Generate new URL parameters for the selected category
                  const newSearchParamsObject =
                    cat.value === 'all-posts'
                      ? omit(searchParamsObj, 'category')
                      : { ...searchParamsObj, category: cat.value }

                  const href = createUrl(
                    pathname,
                    new URLSearchParams(newSearchParamsObject)
                  )

                  return (
                    <Box
                      key={cat.value}
                      className="flex items-center gap-2 p-1"
                    >
                      <Link href={href} aria-label="Choose a category">
                        <RadioGroupItem
                          id={cat.value}
                          value={cat.value}
                          aria-label="Choose a category"
                        >
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                      </Link>
                      <Label
                        htmlFor={cat.value}
                        className="cursor-pointer"
                        style={{ fontSize: '16px' }}
                      >
                        {cat.label}
                      </Label>
                    </Box>
                  )
                })}
              </RadioGroupRoot>
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Filters
