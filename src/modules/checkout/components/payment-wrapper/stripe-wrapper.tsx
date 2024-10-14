'use client'

import { HttpTypes } from '@medusajs/types'
import { Container } from '@modules/common/components/container'
import { Elements } from '@stripe/react-stripe-js'
import { Stripe, StripeElementsOptions } from '@stripe/stripe-js'

type StripeWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  stripeKey?: string
  stripePromise: Promise<Stripe | null> | null
  children: React.ReactNode
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}) => {
  const options: StripeElementsOptions = {
    clientSecret: paymentSession.data?.client_secret as string | undefined,
  }

  if (!stripeKey) {
    throw new Error(
      'Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable.'
    )
  }

  if (!stripePromise) {
    throw new Error(
      'Stripe promise is missing. Make sure you have provided a valid Stripe key.'
    )
  }

  if (!paymentSession?.data?.client_secret) {
    throw new Error(
      'Stripe client secret is missing. Cannot initialize Stripe.'
    )
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <Container className="grid grid-cols-1 gap-y-4 !p-0 large:grid-cols-[1fr_416px] large:gap-x-10 2xl:gap-x-40">
        {children}
      </Container>
    </Elements>
  )
}

export default StripeWrapper
