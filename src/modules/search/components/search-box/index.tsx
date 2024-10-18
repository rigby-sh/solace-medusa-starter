'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { XMarkMini } from '@medusajs/icons'
import { Box } from '@modules/common/components/box'
import { Input } from '@modules/common/components/input'

export const ControlledSearchBox = ({
  countryCode,
  open,
  closeSearch,
}: {
  countryCode: string
  open: boolean
  closeSearch: () => void
}) => {
  const [query, setQuery] = useState<string | undefined>('')
  const router = useRouter()
  const inputRef = useRef(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (query) {
      const localSearches =
        JSON.parse(localStorage.getItem('recentSearches')) || []

      const updatedSearches = new Set([query, ...localSearches])

      localStorage.setItem(
        'recentSearches',
        JSON.stringify(Array.from(updatedSearches).slice(0, 5))
      )
      router.push(`/${countryCode}/results/${query}`)
    }
    inputRef.current.blur()
    setQuery('')
    closeSearch()
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setQuery('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (inputRef.current && open) {
      inputRef.current.focus()
    }
  }, [open])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="relative w-full bg-primary large:mx-auto large:w-max">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <Box className="flex w-full items-center justify-between border border-action-primary large:relative large:w-[400px] xl:w-[600px]">
          <Input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={'Search products...'}
            spellCheck={false}
            type="search"
            value={query}
            onChange={handleChange}
            className="w-full !border-none bg-transparent pr-5 text-lg placeholder:text-basic-primary focus:outline-none"
          />
          {query && (
            <button
              onClick={handleReset}
              type="button"
              className="absolute right-0 flex items-center justify-center gap-x-2 px-4 text-lg text-basic-primary focus:outline-none"
            >
              <XMarkMini />
            </button>
          )}
        </Box>
      </form>
    </div>
  )
}
