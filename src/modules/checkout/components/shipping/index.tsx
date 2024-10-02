'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { RadioGroup } from '@headlessui/react'
import { setShippingMethod } from '@lib/data/cart'
import { cn } from '@lib/util/cn'
import { convertToLocale } from '@lib/util/money'
import { HttpTypes } from '@medusajs/types'
import ErrorMessage from '@modules/checkout/components/error-message'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
} from '@modules/common/components/radio'
import { Stepper } from '@modules/common/components/stepper'
import { Text } from '@modules/common/components/text'

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get('step') === 'delivery'

  const selectedShippingMethod = availableShippingMethods?.find(
    // To do: remove the previously selected shipping method instead of using the last one
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )

  const handleEdit = () => {
    router.push(pathname + '?step=delivery', { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + '?step=payment', { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <Box className="bg-primary p-5">
      <Box
        className={cn('flex flex-row items-center justify-between', {
          'mb-6': isOpen || (!isOpen && cart.shipping_methods?.length > 0),
        })}
      >
        <Heading
          as="h2"
          className={cn('flex flex-row items-center gap-x-4 text-2xl', {
            'pointer-events-none select-none':
              !isOpen && cart.shipping_methods?.length === 0,
          })}
        >
          {!isOpen && cart.shipping_methods?.length === 0 ? (
            <Stepper>2</Stepper>
          ) : !isOpen && (cart.shipping_methods?.length ?? 0) > 0 ? (
            <Stepper state="completed" />
          ) : (
            <Stepper state="focussed">2</Stepper>
          )}
          Delivery
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Button
              variant="tonal"
              size="sm"
              onClick={handleEdit}
              data-testid="edit-delivery-button"
            >
              Edit
            </Button>
          )}
      </Box>
      {isOpen ? (
        <Box data-testid="delivery-options-container">
          <RadioGroup value={selectedShippingMethod?.id} onChange={set}>
            {availableShippingMethods?.map((option) => {
              return (
                <RadioGroup.Option
                  key={option.id}
                  value={option.id}
                  data-testid="delivery-option-radio"
                  className={cn(
                    'flex cursor-pointer flex-row items-center justify-between gap-1 border p-2 !pr-4 text-basic-primary transition-all duration-200',
                    {
                      'border-action-primary':
                        option.id === selectedShippingMethod?.id,
                    }
                  )}
                >
                  <Box className="flex w-full items-center gap-x-2">
                    <RadioGroupRoot className="m-3">
                      <RadioGroupItem
                        id={option.id}
                        value={option.id}
                        checked={option.id === selectedShippingMethod?.id}
                      >
                        <RadioGroupIndicator />
                      </RadioGroupItem>
                    </RadioGroupRoot>
                    <Box className="flex w-full flex-col gap-1 small:flex-row small:items-center small:justify-between">
                      <span className="text-lg">{option.name}</span>
                      <span className="justify-self-end text-md">
                        {convertToLocale({
                          amount: option.amount,
                          currency_code: cart?.currency_code,
                        })}
                      </span>
                    </Box>
                  </Box>
                </RadioGroup.Option>
              )
            })}
          </RadioGroup>
          <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          />
          <Button
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!cart.shipping_methods?.[0]}
            data-testid="submit-delivery-option-button"
          >
            Proceed to payment
          </Button>
        </Box>
      ) : (
        <Box className="text-small-regular">
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="flex flex-col p-4">
              <Text size="lg" className="text-basic-primary">
                Delivery method
              </Text>
              <Text className="text-secondary">
                {selectedShippingMethod?.name},{' '}
                {convertToLocale({
                  amount: selectedShippingMethod?.amount,
                  currency_code: cart?.currency_code,
                })}
              </Text>
            </div>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Shipping
