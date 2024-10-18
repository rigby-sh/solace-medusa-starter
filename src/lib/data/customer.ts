'use server'

import { cache } from 'react'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { sdk } from '@lib/config'

import { getAuthHeaders, removeAuthToken, setAuthToken } from './cookies'

export async function getCustomer() {
  return await sdk.store.customer
    .retrieve({}, { next: { tags: ['customer'] }, ...getAuthHeaders() })
    .then(({ customer }) => customer)
    .catch(() => null)
}

export const updateCustomer = cache(async function (
  _currentState: {
    success: boolean
    error: string | null
  },
  formData: FormData
) {
  const body = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
  }

  return await sdk.store.customer
    .update(body, {}, getAuthHeaders())
    .then(() => {
      revalidateTag('customer')
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
})

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get('password') as string
  const customerForm = {
    email: formData.get('email') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
  }

  try {
    const token = await sdk.auth.register('customer', 'emailpass', {
      email: customerForm.email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      customHeaders
    )

    const loginToken = await sdk.auth.login('customer', 'emailpass', {
      email: customerForm.email,
      password,
    })

    setAuthToken(loginToken as string)

    revalidateTag('customer')
    return createdCustomer
  } catch (error: any) {
    return error.toString()
  }
}

export async function forgotPassword(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get('email') as string
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass/reset-password`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
        }),
      }
    )
  } catch (error: any) {
    return error.toString()
  }
}

export async function resetPassword(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get('email') as string
  const token = formData.get('token') as string
  const password = formData.get('new_password') as string

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass/update?token=${token}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    await sdk.auth
      .login('customer', 'emailpass', { email, password })
      .then((token) => {
        setAuthToken(token as string)
        revalidateTag('customer')
      })
  } catch (error: any) {
    return error.toString()
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()
  removeAuthToken()
  revalidateTag('auth')
  revalidateTag('customer')
  redirect(`/${countryCode}/account`)
}

export const addCustomerAddress = async (
  _currentState: {
    success: boolean
    error: string | null
  },
  formData: FormData
): Promise<any> => {
  const address = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    company: formData.get('company') as string,
    address_1: formData.get('address_1') as string,
    address_2: formData.get('address_2') as string,
    city: formData.get('city') as string,
    postal_code: formData.get('postal_code') as string,
    province: formData.get('province') as string,
    country_code: formData.get('country_code') as string,
    phone: formData.get('phone') as string,
    address_name:
      (formData.get('address_name') as string) ?? 'shipping_address',
    is_default_shipping:
      formData.get('is_default_shipping') === 'on' || 'true' ? true : false,
  }

  return sdk.store.customer
    .createAddress(address, {}, getAuthHeaders())
    .then(() => {
      revalidateTag('customer')
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  await sdk.store.customer
    .deleteAddress(addressId, getAuthHeaders())
    .then(() => {
      revalidateTag('customer')
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) ?? (formData.get('id') as string)

  const address = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    company: formData.get('company') as string,
    address_1: formData.get('address_1') as string,
    address_2: formData.get('address_2') as string,
    city: formData.get('city') as string,
    postal_code: formData.get('postal_code') as string,
    province: formData.get('province') as string,
    country_code: formData.get('country_code') as string,
    phone: formData.get('phone') as string,
    is_default_shipping:
      formData.get('is_default_shipping') === 'on' || 'true' ? true : false,
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, getAuthHeaders())
    .then(() => {
      revalidateTag('customer')
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
