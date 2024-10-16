'use client'

import React, { ChangeEvent, FormEvent, RefObject, useEffect } from 'react'

import { XMarkMini } from '@medusajs/icons'
import { Box } from '@modules/common/components/box'
import { Input } from '@modules/common/components/input'

export type ControlledSearchBoxProps = React.ComponentProps<'div'> & {
  inputRef: RefObject<HTMLInputElement>
  onChange(event: ChangeEvent): void
  onReset(event: FormEvent): void
  onSubmit?(event: FormEvent): void
  placeholder?: string
  value: string
}

export const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <Box {...props} className="w-full bg-primary">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <Box className="flex items-center justify-between border border-action-primary p-1 px-2 small:p-2 small:px-4">
          <Input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="min-w-[80px] !border-none bg-transparent text-lg placeholder:text-basic-primary focus:outline-none xsmall:min-w-[170px] small:min-w-[400px]"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="flex items-center justify-center gap-x-2 px-2 text-lg text-basic-primary focus:outline-none"
            >
              <XMarkMini />
              <span className="hidden small:inline">Cancel</span>
            </button>
          )}
        </Box>
      </form>
    </Box>
  )
}
