import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCustomer } from '@lib/data/customer'
import { getRegion } from '@lib/data/regions'
import AddressBook from '@modules/account/components/address-book'

export const metadata: Metadata = {
  title: 'Addresses',
  description: 'View your addresses',
}

export default async function Addresses({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
