import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { listOrders } from '@lib/data/orders'
import OrderOverview from '@modules/account/components/order-overview'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.',
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <OrderOverview orders={orders} />
    </div>
  )
}
