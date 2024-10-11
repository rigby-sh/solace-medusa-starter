import React, { useEffect, useState } from 'react'

import { validateField } from '@lib/util/validator'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Input } from '@modules/common/components/input'

import CountrySelect from '../country-select'

const BillingAddress = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
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
    })
  }, [cart?.billing_address])

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
          label="Company name (optional)"
          name="billing_address.company"
          value={formData['billing_address.company']}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="billing-company-input"
        />
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
          label="Phone number"
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
    </>
  )
}

export default BillingAddress
