'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { setAddresses } from '@lib/data/cart'
import compareAddresses from '@lib/util/compare-addresses'
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
import ErrorMessage from '../error-message'
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
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get('step') === 'address'

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.billing_address, cart?.shipping_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + '?step=address')
  }

  const [message, formAction] = useFormState(setAddresses, null)

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
          Billing address
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
        <form action={formAction}>
          <Box>
            <BillingAddress
              cart={cart}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
            />

            {!sameAsBilling && (
              <div>
                <Divider className="my-6" />
                <Heading as="h2" className="pb-6 text-2xl">
                  Shipping address
                </Heading>
                <ShippingAddress customer={customer} cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Proceed to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </Box>
        </form>
      ) : (
        <Box>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full flex-col items-start gap-x-1">
                  {/* Billing Address */}
                  <div
                    className="flex flex-col p-4"
                    data-testid="billing-address-summary"
                  >
                    <Text size="lg" className="text-basic-primary">
                      Billing Address
                    </Text>
                    <Text className="text-secondary">
                      {cart.billing_address?.first_name}{' '}
                      {cart.billing_address?.last_name}
                    </Text>
                    <Text className="text-secondary">
                      {cart.billing_address?.address_1}{' '}
                      {cart.billing_address?.address_2}
                    </Text>
                    <Text className="text-secondary">
                      {cart.billing_address?.postal_code},{' '}
                      {cart.billing_address?.city},{' '}
                      {cart.billing_address?.country_code?.toUpperCase()}
                    </Text>
                    <Text className="text-secondary">
                      {cart.email}, {cart.billing_address?.phone}
                    </Text>
                  </div>
                  {/* Shipping Address */}
                  <div
                    className="flex flex-col p-4"
                    data-testid="shipping-address-summary"
                  >
                    <Text size="lg" className="text-basic-primary">
                      Shipping Address
                    </Text>
                    {sameAsBilling ? (
                      <Text className="text-secondary">
                        Same as billing address
                      </Text>
                    ) : (
                      <>
                        <Text className="text-secondary">
                          {cart.shipping_address.first_name}{' '}
                          {cart.shipping_address.last_name}
                        </Text>
                        <Text className="text-secondary">
                          {cart.shipping_address.address_1}{' '}
                          {cart.shipping_address.address_2}
                        </Text>
                        <Text className="text-secondary">
                          {cart.shipping_address.postal_code},{' '}
                          {cart.shipping_address.city},{' '}
                          {cart.shipping_address.country_code?.toUpperCase()}
                        </Text>
                        <Text className="text-secondary">
                          {cart.shipping_address?.phone}
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
