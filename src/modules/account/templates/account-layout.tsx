import React from 'react'

import { HttpTypes } from '@medusajs/types'
import { Container } from '@modules/common/components/container'

import AccountNav from '../components/account-nav'
import AccountMobileNav from '../components/account-nav/account-mobile-nav'

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  if (!customer) {
    return (
      <div className="flex justify-center">
        <Container>
          <div className="flex items-center justify-center">{children}</div>
        </Container>
      </div>
    )
  }

  return (
    <div className="bg-secondary">
      <AccountMobileNav />
      <Container>
        <div className="gap grid grid-cols-12 gap-6">
          <div className="hidden xl:col-span-3 xl:block">
            <AccountNav />
          </div>
          <div className="col-span-12 xl:col-span-9">{children}</div>
        </div>
      </Container>
    </div>
  )
}

export default AccountLayout
