import React from 'react'

import { HttpTypes } from '@medusajs/types'

import AccountNav from '../components/account-nav'

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 bg-secondary small:py-12" data-testid="account-page">
      <div className="content-container mx-auto flex h-full max-w-5xl flex-1 flex-col">
        <div className="grid grid-cols-1 py-12 small:grid-cols-[240px_1fr]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
