import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Label } from '@modules/common/components/label'
import NativeSelect, {
  NativeSelectProps,
} from '@modules/common/components/native-select'

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = 'Country', region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }))
  }, [region])

  return (
    <Box className="flex flex-col gap-2">
      {props.label && (
        <Label size="sm" htmlFor={props.name} className="text-secondary">
          {props.label}
        </Label>
      )}
      <NativeSelect
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...props}
      >
        {countryOptions?.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </Box>
  )
})

CountrySelect.displayName = 'CountrySelect'

export default CountrySelect
