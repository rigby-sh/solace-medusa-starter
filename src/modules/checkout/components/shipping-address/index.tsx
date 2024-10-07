import React, { useEffect, useMemo, useState } from 'react'

import { cn } from '@lib/util/cn'
import { validateField } from '@lib/util/validator'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import { Spinner } from '@modules/common/icons'
import { mapKeys } from 'lodash'

import AddressSelect from '../address-select'
import CountrySelect from '../country-select'
import SelectedAddress from './selected-address'

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    validateField(name, value, 'shipping', touchedFields, setErrors)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    })
    validateField(name, formData[name], 'shipping', touchedFields, setErrors)
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

  // Set form data based on cart shipping address or first saved address in region
  useEffect(() => {
    if (cart?.shipping_address) {
      setFormAddress(cart.shipping_address, cart.email)
    } else if (addressesInRegion && addressesInRegion.length > 0) {
      setFormAddress(addressesInRegion[0], customer?.email)
    }
  }, [cart, addressesInRegion, customer?.email])

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Box className="flex items-center justify-between p-6">
          <Box className="w-1/2 small:w-full">
            {Object.keys(formData).length === 0 ? (
              <Spinner />
            ) : (
              <SelectedAddress
                formData={formData}
                addressesInRegion={addressesInRegion}
                cart={cart}
              />
            )}
          </Box>
          <AddressSelect
            cart={cart}
            addresses={customer.addresses.filter(
              (add) => add.address_name === 'shipping_address'
            )}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace('shipping_address.', '')
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Box>
      )}
      <Box
        className={cn('grid grid-cols-1 gap-2 small:gap-4 xl:grid-cols-2', {
          hidden: customer && (addressesInRegion?.length || 0) > 0,
        })}
      >
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
          label="Company name (optional)"
          name="shipping_address.company"
          value={formData['shipping_address.company']}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
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
          label="Phone number"
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
      <Box className="my-6 flex items-center gap-x-2">
        <Checkbox
          id="same_as_shipping"
          name="same_as_shipping"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
        <Label htmlFor="same_as_shipping" className="cursor-pointer !text-md">
          Billing address same as shipping address
        </Label>
      </Box>
    </>
  )
}

export default ShippingAddress
