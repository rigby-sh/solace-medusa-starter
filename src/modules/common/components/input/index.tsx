import React, { useEffect, useImperativeHandle, useState } from 'react'

import { Label } from '@medusajs/ui'
import { EyeIcon, EyeOffIcon } from '@modules/common/icons'

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  'placeholder'
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text')
      }

      if (type === 'password' && !showPassword) {
        setInputType('password')
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label className="txt-compact-medium-plus mb-2">{topLabel}</Label>
        )}
        <div className="txt-compact-medium relative z-0 flex w-full">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className="mt-0 block h-11 w-full appearance-none rounded-md border border-ui-border-base bg-ui-bg-field px-4 pb-1 pt-4 hover:bg-ui-bg-field-hover focus:shadow-borders-interactive-with-active focus:outline-none focus:ring-0"
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="-z-1 origin-0 absolute top-3 mx-3 flex items-center justify-center px-1 text-ui-fg-subtle transition-all duration-300"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 px-4 text-ui-fg-subtle outline-none transition-all duration-150 focus:text-ui-fg-base focus:outline-none"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
