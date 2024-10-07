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
  // Check if customer has default address
  const defaultAddress = addressesInRegion?.find((a) => a.is_default_shipping)

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

  const selectedAddress =
    formDataAddress ||
    defaultAddress ||
    cart?.shipping_address ||
    (addressesInRegion && addressesInRegion.length > 0
      ? addressesInRegion[0]
      : null)

  if (selectedAddress) {
    return {
      'shipping_address.first_name': selectedAddress.first_name || '',
      'shipping_address.last_name': selectedAddress.last_name || '',
      'shipping_address.company': selectedAddress.company || '',
      'shipping_address.address_1': selectedAddress.address_1 || '',
      'shipping_address.address_2': selectedAddress.address_2 || '',
      'shipping_address.postal_code': selectedAddress.postal_code || '',
      'shipping_address.city': selectedAddress.city || '',
      'shipping_address.country_code': selectedAddress.country_code || '',
      'shipping_address.province': selectedAddress.province || '',
      'shipping_address.phone': selectedAddress.phone || '',
    }
  }

  return formData
}
