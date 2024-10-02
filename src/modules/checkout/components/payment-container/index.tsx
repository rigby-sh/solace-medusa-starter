import React from 'react'

import { RadioGroup } from '@headlessui/react'
import { isManual } from '@lib/constants'
import { clx } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
} from '@modules/common/components/radio'

import PaymentTest from '../payment-test'

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <>
      <RadioGroup.Option
        key={paymentProviderId}
        value={paymentProviderId}
        disabled={disabled}
        className={clx(
          'flex cursor-pointer flex-col justify-between gap-1 border p-2 !pr-4 text-basic-primary transition-all duration-200 small:flex-row small:items-center',
          {
            'border-action-primary':
              paymentProviderId === selectedPaymentOptionId,
          }
        )}
      >
        <Box className="flex w-full items-center gap-x-2">
          <RadioGroupRoot className="m-3">
            <RadioGroupItem
              id={paymentProviderId}
              value={paymentProviderId}
              checked={selectedPaymentOptionId === paymentProviderId}
            >
              <RadioGroupIndicator />
            </RadioGroupItem>
          </RadioGroupRoot>
          <Box className="flex w-full items-center justify-between gap-1">
            <span className="text-lg">
              {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
            </span>
            {isManual(paymentProviderId) && isDevelopment && (
              <PaymentTest className="hidden small:block" />
            )}
            <span className="justify-self-end">
              {paymentInfoMap[paymentProviderId]?.icon}
            </span>
          </Box>
        </Box>
        {isManual(paymentProviderId) && isDevelopment && (
          <PaymentTest className="text-[10px] small:hidden" />
        )}
      </RadioGroup.Option>
    </>
  )
}

export default PaymentContainer
