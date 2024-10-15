'use server'

import { sdk } from '@lib/config'
import medusaError from '@lib/util/medusa-error'

import { getAuthHeaders } from './cookies'

export async function retrieveOrder(id: string) {
  return sdk.store.order
    .retrieve(
      id,
      { fields: '*payment_collections.payments,+fulfillment_status' },
      { next: { tags: ['order'] }, ...getAuthHeaders() }
    )
    .then(({ order }) => order)
    .catch((err) => medusaError(err))
}

export async function listOrders(limit: number = 10, offset: number = 0) {
  return sdk.store.order
    .list({ limit, offset }, { next: { tags: ['order'] }, ...getAuthHeaders() })
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err))
}
