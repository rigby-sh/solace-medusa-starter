import React from 'react'

import { getShippingAddressDisplay } from '@lib/util/addresses'
import { HttpTypes } from '@medusajs/types'
import { Text } from '@modules/common/components/text'

type SelectedAddressProps = {
  formData: Record<string, string>
  addressesInRegion: HttpTypes.StoreCustomerAddress[]
  cart: HttpTypes.StoreCart
}

export default function SelectedAddress({
  formData,
  addressesInRegion,
  cart,
}: SelectedAddressProps) {
  return (
    <>
      <Text size="lg" className="text-basic-primary">
        {
          getShippingAddressDisplay(formData, addressesInRegion, cart)[
            'shipping_address.first_name'
          ]
        }{' '}
        {
          getShippingAddressDisplay(formData, addressesInRegion, cart)[
            'shipping_address.last_name'
          ]
        }
      </Text>
      <Text className="text-secondary">
        {getShippingAddressDisplay(formData, addressesInRegion, cart)[
          'shipping_address.company'
        ] &&
          `${
            getShippingAddressDisplay(formData, addressesInRegion, cart)[
              'shipping_address.company'
            ]
          }, `}
        {
          getShippingAddressDisplay(formData, addressesInRegion, cart)[
            'shipping_address.address_1'
          ]
        }
        ,{' '}
        {
          getShippingAddressDisplay(formData, addressesInRegion, cart)[
            'shipping_address.postal_code'
          ]
        }
        ,{' '}
        {
          getShippingAddressDisplay(formData, addressesInRegion, cart)[
            'shipping_address.city'
          ]
        }
        ,{' '}
        {getShippingAddressDisplay(formData, addressesInRegion, cart)[
          'shipping_address.country_code'
        ]?.toUpperCase()}
        {getShippingAddressDisplay(formData, addressesInRegion, cart)[
          'shipping_address.province'
        ] &&
          `, ${
            getShippingAddressDisplay(formData, addressesInRegion, cart)[
              'shipping_address.province'
            ]
          }`}
      </Text>
      <Text className="text-secondary">
        {cart?.email && `${cart.email}, `}
        {getShippingAddressDisplay(formData, addressesInRegion, cart)[
          'shipping_address.phone'
        ] || ''}
      </Text>
    </>
  )
}
