export type UserShippingAddressInputProps = {
  first_name: string
  last_name: string
  address_1: string
  city: string
  country_code: string
  postal_code: string
  phone: string
  company: string
  is_default_shipping: boolean
  province: string
}

export const defaultInitialValues: UserShippingAddressInputProps = {
  first_name: '',
  last_name: '',
  address_1: '',
  city: '',
  country_code: '',
  postal_code: '',
  phone: '',
  company: '',
  is_default_shipping: false,
  province: '',
}
