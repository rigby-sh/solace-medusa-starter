import { HttpTypes } from '@medusajs/types'
import { SelectedAddressProps } from '@modules/checkout/components/shipping-address/selected-address'
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
  formikValues: SelectedAddressProps['formikValues'],
  addressesInRegion: HttpTypes.StoreCustomerAddress[] | undefined,
  cart: HttpTypes.StoreCart | null
): FormData => {
  // Check if customer has default address
  const defaultAddress = addressesInRegion?.find((a) => a.is_default_shipping)

  // Check if customer has selected address
  const formDataAddress = addressesInRegion?.find(
    (addr) =>
      addr.first_name === formikValues.shipping_address.first_name &&
      addr.last_name === formikValues.shipping_address.last_name &&
      addr.address_1 === formikValues.shipping_address.address_1 &&
      addr.city === formikValues.shipping_address.city &&
      addr.country_code === formikValues.shipping_address.country_code &&
      addr.postal_code === formikValues.shipping_address.postal_code
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
      first_name: selectedAddress.first_name || '',
      last_name: selectedAddress.last_name || '',
      company: selectedAddress.company || '',
      address_1: selectedAddress.address_1 || '',
      address_2: selectedAddress.address_2 || '',
      postal_code: selectedAddress.postal_code || '',
      city: selectedAddress.city || '',
      country_code: selectedAddress.country_code || '',
      province: selectedAddress.province || '',
      phone: selectedAddress.phone || '',
    }
  }

  return {
    ...formikValues.shipping_address,
    email: formikValues.email || cart?.email,
  }
}
