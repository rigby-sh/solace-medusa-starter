import React from 'react'

import { getShippingAddressDisplay } from '@lib/util/addresses'
import { HttpTypes } from '@medusajs/types'
import { Text } from '@modules/common/components/text'

export type SelectedAddressProps = {
  formikValues: {
    shipping_address: Record<string, string>
    email: string
  }
  addressesInRegion: HttpTypes.StoreCustomerAddress[]
  cart: HttpTypes.StoreCart
}

export default function SelectedAddress({
  formikValues,
  addressesInRegion,
  cart,
}: SelectedAddressProps) {
  const addressDisplay = getShippingAddressDisplay(
    formikValues,
    addressesInRegion,
    cart
  )

  return (
    <>
      <Text size="lg" className="text-basic-primary">
        {addressDisplay.first_name} {addressDisplay.last_name}
      </Text>
      <Text className="text-secondary">
        {addressDisplay.company && `${addressDisplay.company}, `}
        {addressDisplay.address_1}, {addressDisplay.postal_code},{' '}
        {addressDisplay.city}, {addressDisplay.country_code?.toUpperCase()}
        {addressDisplay.province && `, ${addressDisplay.province}`}
      </Text>
      <Text className="text-secondary">
        {cart?.email && `${cart.email}, `}
        {addressDisplay.phone || ''}
      </Text>
    </>
  )
}
