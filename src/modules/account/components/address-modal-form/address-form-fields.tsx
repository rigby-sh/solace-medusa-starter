import { HttpTypes } from '@medusajs/types'
import CountrySelect from '@modules/checkout/components/country-select'
import { Input } from '@modules/common/components/input'

const AddressFormFields = ({
  address,
  isAddingNewAddress,
  region,
}: {
  address: HttpTypes.StoreCustomerAddress
  isAddingNewAddress: boolean
  region: HttpTypes.StoreRegion
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto small:grid-cols-2">
      {!isAddingNewAddress && (
        <input type="hidden" name="id" defaultValue={address?.id} />
      )}
      <Input
        label="First name"
        name="first_name"
        required
        autoComplete="given-name"
        defaultValue={address?.first_name || undefined}
        data-testid="first-name-input"
      />
      <Input
        label="Last name"
        name="last_name"
        required
        autoComplete="family-name"
        defaultValue={address?.last_name || undefined}
        data-testid="last-name-input"
      />
      <Input
        label="Company name (optional)"
        name="company"
        autoComplete="organization"
        defaultValue={address?.company || undefined}
        data-testid="company-input"
      />
      <Input
        label="Address"
        name="address_1"
        required
        autoComplete="address-line1"
        defaultValue={address?.address_1 || undefined}
        data-testid="address-1-input"
      />
      <Input
        label="Postal code"
        name="postal_code"
        required
        autoComplete="postal-code"
        defaultValue={address?.postal_code || undefined}
        data-testid="postal-code-input"
      />
      <Input
        label="City"
        name="city"
        required
        autoComplete="locality"
        defaultValue={address?.city || undefined}
        data-testid="city-input"
      />
      <CountrySelect
        label="Country"
        name="country_code"
        region={region}
        required
        autoComplete="country"
        defaultValue={address?.country_code || undefined}
        data-testid="country-select"
      />
      <Input
        label="State / Province (optional)"
        name="province"
        autoComplete="address-level1"
        defaultValue={address?.province || undefined}
        data-testid="state-input"
      />
      <Input
        label="Phone number"
        name="phone"
        autoComplete="phone"
        defaultValue={address?.phone || undefined}
        data-testid="phone-input"
      />
    </div>
  )
}

export default AddressFormFields
