import React, { forwardRef } from 'react'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'

import CountrySelect from '../country-select'

type NewAddressFormProps = {
  ref: React.RefObject<HTMLFormElement>
  region: HttpTypes.StoreRegion
  formState: {
    success: boolean
    error: string | null
  }
}

const NewAddressForm = forwardRef<HTMLFormElement, NewAddressFormProps>(
  (props, ref) => {
    const { region, formState } = props

    return (
      <>
        <form ref={ref}>
          <Box className="grid w-full grid-cols-1 gap-4 overflow-y-auto small:grid-cols-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
            <Input
              label="Company name (optional)"
              name="company"
              autoComplete="organization"
              data-testid="company-input"
            />
            <Input
              label="Address"
              name="address_1"
              required
              autoComplete="address-line1"
              data-testid="address-1-input"
            />
            <Input
              label="Postal code"
              name="postal_code"
              required
              autoComplete="postal-code"
              data-testid="postal-code-input"
            />
            <Input
              label="City"
              name="city"
              required
              autoComplete="locality"
              data-testid="city-input"
            />
            <CountrySelect
              label="Country"
              region={region}
              name="country_code"
              required
              autoComplete="country"
              data-testid="country-select"
            />
            <Input
              label="State / Province (optional)"
              name="province"
              autoComplete="address-level1"
              data-testid="state-input"
            />
            <Input
              label="Phone number"
              name="phone"
              required
              autoComplete="phone"
              data-testid="phone-input"
            />
          </Box>
          <Box className="mt-6 flex items-center gap-x-2">
            <Checkbox id="is_default_shipping" name="is_default_shipping" />
            <Label
              htmlFor="is_default_shipping"
              className="cursor-pointer !text-md"
            >
              Default shipping address
            </Label>
          </Box>
        </form>
        {formState.error && (
          <div
            className="py-2 text-sm text-negative"
            data-testid="address-error"
          >
            {formState.error}
          </div>
        )}
      </>
    )
  }
)

NewAddressForm.displayName = 'NewAddressForm'
export default NewAddressForm
