import React, { forwardRef } from 'react'

import { userShippingAddressFormValidationSchema } from '@lib/util/validator'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import { useFormikContext } from 'formik'
import { InferType } from 'yup'

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

    const { setFieldValue, errors, values, handleChange, initialValues } =
      useFormikContext<
        InferType<typeof userShippingAddressFormValidationSchema>
      >()

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
              data-testid="first-name-input"
              error={errors?.first_name}
              value={values.first_name}
              onChange={handleChange}
              defaultValue={address.first_name || undefined}
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
              defaultValue={initialValues.last_name}
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
              required
              autoComplete="country"
              defaultValue={address.country_code || undefined}
              data-testid="country-select"
              error={errors?.country_code}
              value={values.country_code}
              onChange={handleChange}
            />
            <Input
              label="State / Province (optional)"
              name="province"
              autoComplete="address-level1"
              defaultValue={address.province || undefined}
              data-testid="state-input"
              error={errors?.province}
              value={values.province}
              onChange={handleChange}
            />
            <Input
              label="Phone number"
              name="phone"
              autoComplete="phone"
              defaultValue={address.phone || undefined}
              data-testid="phone-input"
              error={errors?.phone}
              value={values.phone}
              onChange={handleChange}
            />
          </div>
          {formState.error && (
            <div className="py-2 text-sm text-negative">{formState.error}</div>
          )}
          <Box className="my-6 flex items-center gap-x-2">
            <Checkbox
              id="is_default_shipping"
              name="is_default_shipping"
              checked={Boolean(values.is_default_shipping)}
              onChange={(checked) =>
                setFieldValue('is_default_shipping', checked)
              }
            />
            <Label
              htmlFor="is_default_shipping"
              className="cursor-pointer !text-md"
            >
              Default shipping address
            </Label>
          </Box>
        </form>
      </>
    )
  }
)

EditAddressForm.displayName = 'EditAddressForm'
export default EditAddressForm
