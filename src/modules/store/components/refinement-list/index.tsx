'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import SortProducts, { SortOptions } from './sort-products'

type RefinementListProps = {
  sortBy: SortOptions | string
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
}

export default RefinementList
