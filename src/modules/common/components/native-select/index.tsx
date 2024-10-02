import {
  forwardRef,
  SelectHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { clx } from '@medusajs/ui'
import { ChevronDownIcon } from '@modules/common/icons/chevron-down'

export type NativeSelectProps = {
  placeholder?: string
  label?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = 'Select...', defaultValue, className, children, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === '') {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            'border-primary relative flex items-center border bg-secondary text-basic-primary',
            className,
            {
              'text-secondary': isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="flex-1 appearance-none border-none bg-transparent px-4 py-2.5 text-md outline-none transition-colors duration-150"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <ChevronDownIcon className="h-5 w-5 text-basic-primary" />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = 'NativeSelect'

export default NativeSelect
