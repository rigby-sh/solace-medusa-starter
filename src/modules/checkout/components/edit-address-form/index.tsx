import React, { forwardRef } from 'react'

import { HttpTypes } from '@medusajs/types'
import { Input } from '@modules/common/components/input'

import CountrySelect from '../country-select'

type EditAddressFormProps = {
  ref: React.RefObject<HTMLFormElement>
  address: HttpTypes.StoreCustomerAddress
  region: HttpTypes.StoreRegion
  formState: {
    success: boolean
    error: string | null
  }
}

const EditAddressForm = forwardRef<HTMLFormElement, EditAddressFormProps>(
  (props, ref) => {
    const { address, region, formState } = props

    return (
      <>
        <form ref={ref}>
          <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto small:grid-cols-2">
            <input type="hidden" name="id" defaultValue={address.id} />
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              defaultValue={address.first_name || undefined}
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              defaultValue={address.last_name || undefined}
              data-testid="last-name-input"
            />
            <Input
              label="Address"
              name="address_1"
              required
              autoComplete="address-line1"
              defaultValue={address.address_1 || undefined}
              data-testid="address-1-input"
            />
            <Input
              label="Postal code"
              name="postal_code"
              required
              autoComplete="postal-code"
              defaultValue={address.postal_code || undefined}
              data-testid="postal-code-input"
            />
            <Input
              label="City"
              name="city"
              required
              autoComplete="locality"
              defaultValue={address.city || undefined}
              data-testid="city-input"
            />
            <CountrySelect
              label="Country"
              name="country_code"
              region={region}
              required
              autoComplete="country"
              defaultValue={address.country_code || undefined}
              data-testid="country-select"
            />
            <Input
              label="State / Province (optional)"
              name="province"
              autoComplete="address-level1"
              defaultValue={address.province || undefined}
              data-testid="state-input"
            />
            <Input
              label="Phone"
              name="phone"
              autoComplete="phone"
              defaultValue={address.phone || undefined}
              data-testid="phone-input"
            />
          </div>
          {formState.error && (
            <div className="py-2 text-sm text-negative">{formState.error}</div>
          )}
        </form>
      </>
    )
  }
)

EditAddressForm.displayName = 'EditAddressForm'
export default EditAddressForm
