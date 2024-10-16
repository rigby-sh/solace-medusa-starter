'use client'

import React, { ChangeEvent } from 'react'

import { Box } from '@modules/common/components/box'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@modules/common/components/select'
import { Text } from '@modules/common/components/text'

type SortingProps = {
  options: {
    value: string
    label: string
  }[]
  sortBy: string
  queryName?: string
  setQueryParams: (name: string, value: string) => void
}

const Sorting = ({
  options,
  sortBy,
  queryName,
  setQueryParams,
}: SortingProps) => {
  const queryParamName = queryName ?? 'sortBy'

  const handleChange = (
    e: ChangeEvent<HTMLButtonElement> | string,
    close?: () => void
  ) => {
    const newSortBy = close
      ? ((e as ChangeEvent<HTMLButtonElement>).target.value as string)
      : (e as string)
    setQueryParams(queryParamName, newSortBy as string)

    if (close) {
      setTimeout(close, 500)
    }
  }

  return (
    <Box className="relative !z-30 flex items-center gap-4">
      <Text size="md" className="hidden text-secondary medium:block">
        Sort by:
      </Text>
      <Select
        value={sortBy}
        onValueChange={(e: string) => handleChange(e)}
        className="w-[calc(100vw-32px)] small:w-[calc(100vw-112px)] medium:w-[200px]"
      >
        <SelectTrigger aria-label="Sort by">
          <SelectValue
            placeholder={
              options && options.length > 0 ? options[0].label : 'Select'
            }
          />
        </SelectTrigger>
        <SelectContent className="!z-30 w-[calc(100vw-32px)] small:w-[calc(100vw-112px)] medium:w-[200px]">
          {options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Box>
  )
}

export default Sorting
