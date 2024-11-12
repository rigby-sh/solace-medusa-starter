import { HttpTypes } from '@medusajs/types'
import CountrySelect from '@modules/checkout/components/country-select'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import { useFormikContext } from 'formik'

import { UserShippingAddressInputProps } from './address-form.consts'

const AddressFormFields = ({
  address,
  isAddingNewAddress,
  region,
}: {
  address: HttpTypes.StoreCustomerAddress
  isAddingNewAddress: boolean
  region: HttpTypes.StoreRegion
}) => {
  const { values, handleChange, errors, setFieldValue } =
    useFormikContext<UserShippingAddressInputProps>()

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto small:grid-cols-2">
        {!isAddingNewAddress && (
          <input type="hidden" name="id" defaultValue={address?.id} />
        )}
        <Input
          label="First name"
          name="first_name"
          required
          autoComplete="given-name"
          data-testid="first-name-input"
          error={errors?.first_name}
          value={values.first_name}
          onChange={handleChange}
        />
        <Input
          label="Last name"
          name="last_name"
          required
          autoComplete="family-name"
          data-testid="last-name-input"
          error={errors?.last_name}
          value={values.last_name}
          onChange={handleChange}
        />
        <Input
          label="Company name (optional)"
          name="company"
          autoComplete="organization"
          data-testid="company-input"
          error={errors?.company}
          value={values.company}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="address_1"
          required
          autoComplete="address-line1"
          data-testid="address-1-input"
          error={errors?.address_1}
          value={values.address_1}
          onChange={handleChange}
        />
        <Input
          label="Postal code"
          name="postal_code"
          required
          autoComplete="postal-code"
          data-testid="postal-code-input"
          error={errors?.postal_code}
          value={values.postal_code}
          onChange={handleChange}
        />
        <Input
          label="City"
          name="city"
          required
          autoComplete="locality"
          data-testid="city-input"
          error={errors?.city}
          value={values.city}
          onChange={handleChange}
        />
        <CountrySelect
          label="Country"
          name="country_code"
          region={region}
          autoComplete="country"
          data-testid="country-select"
          error={errors?.country_code}
          value={values.country_code}
          onChange={handleChange}
        />
        <Input
          label="State / Province (optional)"
          name="province"
          autoComplete="address-level1"
          data-testid="state-input"
          error={errors?.province}
          value={values.province}
          onChange={handleChange}
        />
        <Input
          label="Phone number"
          name="phone"
          autoComplete="phone"
          data-testid="phone-input"
          error={errors?.phone}
          value={values.phone}
          onChange={handleChange}
        />
      </div>
      <Box className="my-6 flex items-center gap-x-2">
        <Checkbox
          id="is_default_shipping"
          name="is_default_shipping"
          checked={Boolean(values.is_default_shipping)}
          onChange={(checked) => setFieldValue('is_default_shipping', checked)}
        />
        <Label
          htmlFor="is_default_shipping"
          className="cursor-pointer !text-md"
        >
          Default shipping address
        </Label>
      </Box>
    </>
  )
}

export default AddressFormFields
