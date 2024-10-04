import { HttpTypes } from '@medusajs/types'
import { isEqual, pick } from 'lodash'

type FormData = Record<string, string>

export default function compareAddresses(address1: any, address2: any) {
  return isEqual(
    pick(address1, [
      'first_name',
      'last_name',
      'address_1',
      'company',
      'postal_code',
      'city',
      'country_code',
      'province',
      'phone',
    ]),
    pick(address2, [
      'first_name',
      'last_name',
      'address_1',
      'company',
      'postal_code',
      'city',
      'country_code',
      'province',
      'phone',
    ])
  )
}

export const getShippingAddressDisplay = (
  formData: FormData,
  addressesInRegion: HttpTypes.StoreCustomerAddress[] | undefined,
  cart: HttpTypes.StoreCart | null
): FormData => {
  // Check if customer has selected address
  const formDataAddress = addressesInRegion?.find(
    (addr) =>
      addr.first_name === formData['shipping_address.first_name'] &&
      addr.last_name === formData['shipping_address.last_name'] &&
      addr.address_1 === formData['shipping_address.address_1'] &&
      addr.city === formData['shipping_address.city'] &&
      addr.country_code === formData['shipping_address.country_code'] &&
      addr.postal_code === formData['shipping_address.postal_code']
  )

  if (formDataAddress) {
    return formData
  } else if (cart?.shipping_address) {
    // If customer has no selected address, use cart shipping address if exist
    return {
      'shipping_address.first_name': cart.shipping_address.first_name || '',
      'shipping_address.last_name': cart.shipping_address.last_name || '',
      'shipping_address.address_1': cart.shipping_address.address_1 || '',
      'shipping_address.address_2': cart.shipping_address.address_2 || '',
      'shipping_address.postal_code': cart.shipping_address.postal_code || '',
      'shipping_address.city': cart.shipping_address.city || '',
      'shipping_address.country_code': cart.shipping_address.country_code || '',
      'shipping_address.province': cart.shipping_address.province || '',
      'shipping_address.phone': cart.shipping_address.phone || '',
    }
  } else if (addressesInRegion && addressesInRegion.length > 0) {
    // If customer has no selected address and no cart shipping address, use first address from region
    const firstAddress = addressesInRegion[0]
    return {
      'shipping_address.first_name': firstAddress.first_name || '',
      'shipping_address.last_name': firstAddress.last_name || '',
      'shipping_address.address_1': firstAddress.address_1 || '',
      'shipping_address.address_2': firstAddress.address_2 || '',
      'shipping_address.postal_code': firstAddress.postal_code || '',
      'shipping_address.city': firstAddress.city || '',
      'shipping_address.country_code': firstAddress.country_code || '',
      'shipping_address.province': firstAddress.province || '',
      'shipping_address.phone': firstAddress.phone || '',
    }
  }
  return formData
}
