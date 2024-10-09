import { PRODUCT_LIMIT } from 'app/[countryCode]/(main)/collections/[handle]/page'

export const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
export const PUBLISHABLE_API_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

type SearchParams = {
  currency_code: string
  page?: number
  order?: string
  collection?: string[]
  query?: string
}

export async function search({
  currency_code,
  page = 1,
  order = 'created_at',
  collection,
  query,
}: SearchParams) {
  console.log('collection', collection)
  
  const searchParams = new URLSearchParams({
    currency_code,
    order,
    // offset: ((page - 1) * PRODUCT_LIMIT).toString(),
    // limit: PRODUCT_LIMIT.toString(),
  })

  if (query) {
    searchParams.append('q', query)
  }

  const response = await fetch(
    `${BACKEND_URL}/store/search?${searchParams.toString()}`,
    {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
      },
    }
  ).then((res) => res.json())

  return {
    results: response.products,
    count: response.count,
  }
}
