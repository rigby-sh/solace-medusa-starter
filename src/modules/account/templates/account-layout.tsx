import React from 'react'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
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
      <Box className="flex justify-center bg-secondary">
        <Container className="w-full !max-w-[660px] !pb-16 !pt-8">
          <div className="flex items-center justify-center">{children}</div>
        </Container>
      </Box>
    )
  }

  return (
    <Box className="bg-secondary">
      <AccountMobileNav />
      <Container>
        <Box className="gap grid grid-cols-12 gap-6">
          <Box className="hidden xl:col-span-3 xl:block">
            <AccountNav />
          </Box>
          <div className="col-span-12 xl:col-span-9">{children}</div>
        </Box>
      </Container>
    </Box>
  )
}

export default AccountLayout
