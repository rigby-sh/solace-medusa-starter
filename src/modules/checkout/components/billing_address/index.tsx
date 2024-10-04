import React, { useEffect, useState } from 'react'

import { validateField } from '@lib/util/validator'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'

import CountrySelect from '../country-select'

const BillingAddress = ({
  cart,
  checked,
  onChange,
}: {
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    validateField(name, value, 'billing', touchedFields, setErrors)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    })
    validateField(name, formData[name], 'billing', touchedFields, setErrors)
  }
  useEffect(() => {
    setFormData({
      'billing_address.first_name': cart?.billing_address?.first_name || '',
      'billing_address.last_name': cart?.billing_address?.last_name || '',
      'billing_address.address_1': cart?.billing_address?.address_1 || '',
      'billing_address.company': cart?.billing_address?.company || '',
      'billing_address.postal_code': cart?.billing_address?.postal_code || '',
      'billing_address.city': cart?.billing_address?.city || '',
      'billing_address.country_code': cart?.billing_address?.country_code || '',
      'billing_address.province': cart?.billing_address?.province || '',
      'billing_address.phone': cart?.billing_address?.phone || '',
      email: cart?.email || '',
    })
  }, [cart?.billing_address, cart?.email])

  return (
    <>
      <Box className="grid grid-cols-1 gap-2 small:gap-4 xl:grid-cols-2">
        <Input
          label="First name"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={formData['billing_address.first_name']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['billing_address.first_name']}
          data-testid="billing-first-name-input"
        />
        <Input
          label="Last name"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={formData['billing_address.last_name']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['billing_address.last_name']}
          required
          data-testid="billing-last-name-input"
        />
        <Input
          label="Company name"
          name="billing_address.company"
          value={formData['billing_address.company']}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="billing-company-input"
        />
        {/* TODO: Add logic for saving tax id and display that field */}
        {/* <Input
          label="Tax ID"
          name="billing_address.tax_id"
          value={formData['billing_address.tax_id']}
          onChange={handleChange}
        /> */}
        <Input
          label="Address"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={formData['billing_address.address_1']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['billing_address.address_1']}
          data-testid="billing-address-input"
        />
        <Input
          label="Postal code"
          name="billing_address.postal_code"
          autoComplete="postal-code"
          value={formData['billing_address.postal_code']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['billing_address.postal_code']}
          data-testid="billing-postal-input"
        />
        <Input
          label="City"
          name="billing_address.city"
          autoComplete="address-level2"
          value={formData['billing_address.city']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['billing_address.city']}
          data-testid="billing-city-input"
        />
        <CountrySelect
          label="Country"
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData['billing_address.country_code']}
          onChange={handleChange}
          required
          data-testid="billing-country-select"
        />
        <Input
          label="State / Province (optional)"
          name="billing_address.province"
          autoComplete="address-level1"
          value={formData['billing_address.province']}
          onChange={handleChange}
          error={errors['billing_address.province']}
          data-testid="billing-province-input"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.email}
          data-testid="billing-email-input"
        />
        <Input
          label="Phone"
          name="billing_address.phone"
          autoComplete="tel"
          value={formData['billing_address.phone']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['billing_address.phone']}
          required
          data-testid="billing-phone-input"
        />
      </Box>
      <Box className="my-6 flex items-center gap-x-2">
        <Checkbox
          id="same_as_billing"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
        <Label htmlFor="same_as_billing" className="cursor-pointer !text-md">
          Shipping address same as billing address
        </Label>
      </Box>
    </>
  )
}

export default BillingAddress
