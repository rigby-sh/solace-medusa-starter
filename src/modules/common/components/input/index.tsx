'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'

import { cn } from '@lib/util/cn'
import { mergeRefs } from '@lib/util/merge-refs'
import { EyeIcon, EyeOffIcon, SearchIcon } from '@modules/common/icons'

import { Box } from '../box'
import { Label } from '../label'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  error?: string
  touched?: Record<string, unknown>
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    const handleClick = () => {
      localRef.current?.focus()
    }

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text')
      }

      if (type === 'password' && !showPassword) {
        setInputType('password')
      }
    }, [type, showPassword])

    return (
      <Box className="flex flex-col gap-2">
        {label && (
          <Label
            size="sm"
            htmlFor={name}
            className={cn('text-secondary', {
              'text-negative': props.error,
            })}
          >
            {label}
          </Label>
        )}
        <Box
          className={cn(
            'border-primary focus-within:ring-action-primary [.dark_&]:focus-within:ring-action-primary focus-within:ring-offset-action-primary [.dark_&]:focus-within:ring-offset-action-primary relative flex h-12 w-full items-center border bg-secondary px-4 py-3.5 outline-none file:border-0 file:bg-transparent file:pt-1 file:text-md file:font-medium focus-within:border focus-within:border-action-primary focus-within:ring-0 focus-within:ring-offset-0 [.dark_&:focus-within]:border-action-primary [.dark_&]:border-transparent [.dark_&]:bg-fg-tertiary',
            {
              'cursor-not-allowed border-transparent bg-disabled text-disabled':
                props.disabled,
            },
            { '!border-negative': props.error },
            props.className
          )}
          onClick={handleClick}
        >
          {type === 'search' && <SearchIcon className="mr-2 h-5 w-5" />}
          <input
            type={inputType}
            name={name}
            id={name}
            ref={mergeRefs(localRef, ref)}
            placeholder={props.placeholder}
            className="w-full !bg-transparent text-md outline-none placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-offset-0 [.dark_&]:placeholder:text-static"
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3.5 px-4 text-basic-primary outline-none transition-all duration-150 focus:text-basic-primary focus:outline-none"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon className="h-5 w-5" />}
            </button>
          )}
        </Box>
        {props.error && (
          <p className="text-sm font-medium text-negative">
            {props.error} {label?.toLowerCase() ?? 'a value'}
          </p>
        )}
      </Box>
    )
  }
)

Input.displayName = 'Input'
