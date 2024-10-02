import React, { useEffect, useMemo, useState } from 'react'

import { validateField } from '@lib/util/validator'
import { HttpTypes } from '@medusajs/types'
import { Container } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import { Input } from '@modules/common/components/input'
import { Text } from '@modules/common/components/text'
import { mapKeys } from 'lodash'

import AddressSelect from '../address-select'
import CountrySelect from '../country-select'

const ShippingAddress = ({
  customer,
  cart,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
}) => {
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  )

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        'shipping_address.first_name': address?.first_name || '',
        'shipping_address.last_name': address?.last_name || '',
        'shipping_address.address_1': address?.address_1 || '',
        'shipping_address.company': address?.company || '',
        'shipping_address.postal_code': address?.postal_code || '',
        'shipping_address.city': address?.city || '',
        'shipping_address.country_code': address?.country_code || '',
        'shipping_address.province': address?.province || '',
        'shipping_address.phone': address?.phone || '',
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]) // Add cart as a dependency

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

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <Text className="text-sm">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </Text>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace('shipping_address.', '')
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <Box className="grid grid-cols-1 gap-2 small:gap-4 xl:grid-cols-2">
        <Input
          label="First name"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData['shipping_address.first_name']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['shipping_address.first_name']}
          data-testid="shipping-first-name-input"
        />
        <Input
          label="Last name"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData['shipping_address.last_name']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['shipping_address.last_name']}
          data-testid="shipping-last-name-input"
        />
        <Input
          label="Address"
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData['shipping_address.address_1']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['shipping_address.address_1']}
          data-testid="shipping-address-input"
        />
        <Input
          label="Company name"
          name="shipping_address.company"
          value={formData['shipping_address.company']}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
        />
        <Input
          label="Postal code"
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          value={formData['shipping_address.postal_code']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['shipping_address.postal_code']}
          data-testid="shipping-postal-code-input"
        />
        <Input
          label="City"
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData['shipping_address.city']}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors['shipping_address.city']}
          data-testid="shipping-city-input"
        />
        <CountrySelect
          label="Country"
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData['shipping_address.country_code']}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />
        <Input
          label="State / Province (optional)"
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData['shipping_address.province']}
          onChange={handleChange}
          data-testid="shipping-province-input"
        />
        <Input
          label="Phone"
          name="shipping_address.phone"
          autoComplete="tel"
          onBlur={handleBlur}
          value={formData['shipping_address.phone']}
          onChange={handleChange}
          required
          error={errors['shipping_address.phone']}
          data-testid="shipping-phone-input"
        />
      </Box>
    </>
  )
}

export default ShippingAddress
