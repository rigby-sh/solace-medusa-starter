'use client'

import React, { ChangeEvent } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { Box } from '@modules/common/components/box'
import FilterRadioGroup from '@modules/common/components/filter-radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@modules/common/components/select'
import { Text } from '@modules/common/components/text'
import { SortIcon } from '@modules/common/icons/sort'

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at'

type SortProductsProps = {
  sortBy: SortOptions | string
  setQueryParams: (name: string, value: SortOptions) => void
}

const sortOptions = [
  {
    value: 'created_at',
    label: 'New in',
  },
  {
    value: 'price_asc',
    label: 'Price: Low-High',
  },
  {
    value: 'price_desc',
    label: 'Price: High-Low',
  },
]

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLButtonElement> | SortOptions,
    close?: () => void
  ) => {
    const newSortBy = close
      ? ((e as ChangeEvent<HTMLButtonElement>).target.value as SortOptions)
      : (e as SortOptions)
    setQueryParams('sortBy', newSortBy as SortOptions)

    if (close) {
      setTimeout(close, 500)
    }
  }

  return (
    <Box className="flex items-center gap-4">
      <Text size="md" className="hidden text-secondary small:block">
        Sort by:
      </Text>
      <Select
        value={sortBy}
        onValueChange={(e: SortOptions) => handleChange(e)}
        className="hidden w-[200px] small:block"
      >
        <SelectTrigger>
          <SelectValue placeholder="New in" />
        </SelectTrigger>
        <SelectContent className="w-[200px]">
          {sortOptions.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative z-20 flex w-full justify-end small:hidden">
        <Menu>
          {({ close }) => (
            <>
              <Menu.Button className="flex w-full items-center justify-center gap-2 rounded-full bg-fg-secondary py-3.5 text-md text-basic-primary">
                <SortIcon />
                Sort
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 top-[25px] z-10 mt-8 border border-action-primary">
                  <Menu.Item>
                    <FilterRadioGroup
                      items={sortOptions}
                      value={sortBy}
                      handleChange={(e) => handleChange(e, close)}
                    />
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </Box>
  )
}

export default SortProducts
