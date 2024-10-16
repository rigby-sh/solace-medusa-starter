import React, { ChangeEventHandler } from 'react'

import { FormikErrorsType } from '@lib/hooks/use-checkout-forms'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Input } from '@modules/common/components/input'
import { FormikErrors } from 'formik'

import CountrySelect from '../country-select'

const BillingAddress = ({
  cart,
  handleChange,
  values,
  errors,
}: {
  cart: HttpTypes.StoreCart | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  values: any
  errors: FormikErrors<FormikErrorsType>
}) => {
  return (
    <>
      <Box className="grid grid-cols-1 gap-2 small:gap-4 xl:grid-cols-2">
        <Input
          label="First name"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={values.billing_address.first_name}
          onChange={handleChange}
          required
          error={errors?.billing_address?.first_name}
          data-testid="billing-first-name-input"
        />
        <Input
          label="Last name"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={values.billing_address.last_name}
          onChange={handleChange}
          required
          error={errors?.billing_address?.last_name}
          data-testid="billing-last-name-input"
        />
        <Input
          label="Company name (optional)"
          name="billing_address.company"
          value={values.billing_address.company}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="billing-company-input"
        />
        <Input
          label="Address"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={values.billing_address.address_1}
          onChange={handleChange}
          required
          error={errors?.billing_address?.address_1}
          data-testid="billing-address-input"
        />
        <Input
          label="Postal code"
          name="billing_address.postal_code"
          autoComplete="postal-code"
          value={values.billing_address.postal_code}
          onChange={handleChange}
          required
          error={errors?.billing_address?.postal_code}
          data-testid="billing-postal-input"
        />
        <Input
          label="City"
          name="billing_address.city"
          autoComplete="address-level2"
          value={values.billing_address.city}
          onChange={handleChange}
          required
          error={errors?.billing_address?.city}
          data-testid="billing-city-input"
        />
        <CountrySelect
          label="Country"
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={values.billing_address.country_code}
          onChange={
            handleChange as unknown as ChangeEventHandler<HTMLSelectElement>
          }
          error={errors?.billing_address?.country_code}
          data-testid="billing-country-select"
        />
        <Input
          label="State / Province (optional)"
          name="billing_address.province"
          autoComplete="address-level1"
          value={values.billing_address.province}
          onChange={handleChange}
          data-testid="billing-province-input"
        />
        <Input
          label="Phone number"
          name="billing_address.phone"
          autoComplete="tel"
          value={values.billing_address.phone}
          onChange={handleChange}
          required
          error={errors?.billing_address?.phone}
          data-testid="billing-phone-input"
        />
      </Box>
    </>
  )
}

export default BillingAddress
