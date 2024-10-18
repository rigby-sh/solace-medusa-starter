'use client'

import React from 'react'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { initiatePaymentSession, setAddresses } from '@lib/data/cart'
import { useCheckoutForms } from '@lib/hooks/use-checkout-forms'
import compareAddresses from '@lib/util/addresses'
import { HttpTypes } from '@medusajs/types'
import { useToggleState } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import Divider from '@modules/common/components/divider'
import { Heading } from '@modules/common/components/heading'
import { Stepper } from '@modules/common/components/stepper'
import { Text } from '@modules/common/components/text'
import { Spinner } from '@modules/common/icons'
import { useFormState } from 'react-dom'

import BillingAddress from '../billing_address'
import ShippingAddress from '../shipping-address'
import { SubmitButton } from '../submit-button'

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get('step') === 'address'

  const handleEdit = () => {
    router.push(pathname + '?step=address')
  }

  const { state: sameAsShipping, toggle: originalToggleSameAsShipping } =
    useToggleState(
      cart?.shipping_address && cart?.billing_address
        ? compareAddresses(cart?.billing_address, cart?.shipping_address)
        : true
    )

  const initialValues = {
    shipping_address: cart?.shipping_address || {
      first_name: '',
      last_name: '',
      address_1: '',
      company: '',
      postal_code: '',
      city: '',
      country_code:
        params.countryCode || cart?.shipping_address?.country_code || '',
      province: '',
      phone: '',
    },
    billing_address: cart?.billing_address || {
      first_name: '',
      last_name: '',
      address_1: '',
      company: '',
      postal_code: '',
      city: '',
      country_code: cart?.shipping_address?.country_code ?? '',
      province: '',
      phone: '',
    },
    email: cart?.email || customer?.email || '',
    same_as_shipping: sameAsShipping,
  }

  const checkout = useCheckoutForms(initialValues)
  const [, formAction] = useFormState(setAddresses, null)

  const toggleSameAsShipping = (value: boolean) => {
    originalToggleSameAsShipping()
    checkout.setFieldValue('same_as_shipping', value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await checkout.handleSubmit()

      if (Object.keys(checkout.errors).length === 0) {
        const formData = new FormData()

        Object.entries(checkout.values.shipping_address).forEach(
          ([key, value]) => {
            formData.append(`shipping_address.${key}`, value as string)
          }
        )

        Object.entries(checkout.values.billing_address).forEach(
          ([key, value]) => {
            formData.append(`billing_address.${key}`, value as string)
          }
        )

        formData.append('email', checkout.values.email)
        formData.append(
          'same_as_shipping',
          checkout.values.same_as_shipping ? 'on' : 'off'
        )

        const activeSession = cart?.payment_collection?.payment_sessions?.find(
          (paymentSession: any) => paymentSession.status === 'pending'
        )

        await Promise.all([
          formAction(formData),
          activeSession
            ? initiatePaymentSession(cart, {
                provider_id: activeSession.provider_id,
              })
            : Promise.resolve(),
        ])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Box className="bg-primary p-5">
      <Box className="mb-6 flex flex-row items-center justify-between">
        <Heading
          as="h2"
          className="flex flex-row items-center gap-x-4 text-2xl"
        >
          {isOpen ? (
            <Stepper state="focussed">1</Stepper>
          ) : (
            <Stepper state="completed" />
          )}
          Shipping address
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Button
            variant="tonal"
            size="sm"
            onClick={handleEdit}
            data-testid="edit-address-button"
          >
            Edit
          </Button>
        )}
      </Box>
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <Box>
            <ShippingAddress
              customer={customer}
              cart={cart}
              formik={checkout}
              checked={sameAsShipping}
              values={checkout.values}
              onChange={toggleSameAsShipping}
              handleChange={checkout.handleChange}
              errors={checkout.errors}
            />
            {!sameAsShipping && (
              <div>
                <Divider className="my-6" />
                <Heading as="h2" className="pb-6 text-2xl">
                  Billing address
                </Heading>
                <BillingAddress
                  cart={cart}
                  values={checkout.values}
                  handleChange={checkout.handleChange}
                  errors={checkout.errors}
                />
              </div>
            )}
            <SubmitButton
              isLoading={checkout.isSubmitting}
              className="mt-6"
              data-testid="submit-address-button"
            >
              Proceed to delivery
            </SubmitButton>
          </Box>
        </form>
      ) : (
        <Box>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full flex-col items-start gap-x-1">
                  {/* Shipping Address */}
                  <div
                    className="flex flex-col p-4"
                    data-testid="shipping-address-summary"
                  >
                    <Text size="lg" className="text-basic-primary">
                      Shipping Address
                    </Text>
                    <Text className="text-secondary">
                      {cart.shipping_address.first_name}{' '}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-secondary">
                      {cart.shipping_address.company &&
                        `${cart.shipping_address.company}, `}
                      {cart.shipping_address.address_1},{' '}
                      {cart.shipping_address.postal_code},{' '}
                      {cart.shipping_address.city},{' '}
                      {cart.shipping_address.country_code?.toUpperCase()}
                      {cart.shipping_address?.province &&
                        `, ${cart.shipping_address.province}`}
                      ,
                    </Text>
                    <Text className="text-secondary">
                      {cart.email}, {cart.shipping_address?.phone}
                    </Text>
                  </div>
                  {/* Billing Address */}
                  <div
                    className="flex flex-col p-4"
                    data-testid="billing-address-summary"
                  >
                    <Text size="lg" className="text-basic-primary">
                      Billing Address
                    </Text>
                    {sameAsShipping ? (
                      <Text className="text-secondary">
                        Same as shipping address
                      </Text>
                    ) : (
                      <>
                        <Text className="text-secondary">
                          {cart.billing_address.first_name}{' '}
                          {cart.billing_address.last_name}
                        </Text>
                        <Text className="text-secondary">
                          {cart.billing_address.address_1},{' '}
                          {cart.billing_address.postal_code},{' '}
                          {cart.billing_address.city},{' '}
                          {cart.billing_address.country_code?.toUpperCase()}
                          {cart.billing_address?.province &&
                            `, ${cart.shipping_address.province}`}
                          ,
                        </Text>
                        <Text className="text-secondary">
                          {cart.billing_address?.phone}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </Box>
      )}
    </Box>
  )
}
export default Addresses
