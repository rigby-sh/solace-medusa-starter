import React from 'react'

import { RadioGroup } from '@headlessui/react'
import { isManual } from '@lib/constants'
import { InformationCircleSolid } from '@medusajs/icons'
import { clx, Text, Tooltip } from '@medusajs/ui'
import Radio from '@modules/common/components/radio'

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
          'text-small-regular rounded-rounded mb-2 flex cursor-pointer flex-col gap-y-2 border px-8 py-4 hover:shadow-borders-interactive-with-active',
          {
            'border-ui-border-interactive':
              selectedPaymentOptionId === paymentProviderId,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Radio checked={selectedPaymentOptionId === paymentProviderId} />
            <Text className="text-base-regular">
              {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
            </Text>
            {isManual(paymentProviderId) && isDevelopment && (
              <PaymentTest className="hidden small:block" />
            )}
          </div>
          <span className="justify-self-end text-ui-fg-base">
            {paymentInfoMap[paymentProviderId]?.icon}
          </span>
        </div>
        {isManual(paymentProviderId) && isDevelopment && (
          <PaymentTest className="text-[10px] small:hidden" />
        )}
      </RadioGroup.Option>
    </>
  )
}

export default PaymentContainer
