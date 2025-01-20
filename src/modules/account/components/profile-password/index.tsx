'use client'

import React, { useActionState, useEffect } from 'react'

import { HttpTypes } from '@medusajs/types'
import { Input } from '@modules/common/components/input'

import AccountInfo from '../account-info'

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Add support for password updates
  const [state, formAction] = useActionState((() => {}) as any, {
    customer,
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Password"
        currentInfo={
          <span>The password is not shown for security reasons</span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
          />
          <Input
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
