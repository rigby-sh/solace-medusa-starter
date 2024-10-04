import React, { forwardRef } from 'react'

import { HttpTypes } from '@medusajs/types'
import { Input } from '@modules/common/components/input'

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
        <form
          ref={ref}
          className="grid w-full grid-cols-1 gap-4 overflow-y-auto small:grid-cols-2"
        >
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
            label="Phone"
            name="phone"
            autoComplete="phone"
            data-testid="phone-input"
          />
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
