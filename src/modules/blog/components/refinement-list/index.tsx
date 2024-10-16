'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Sorting from './sorting'

type RefinementListProps = {
  options: {
    value: string
    label: string
  }[]
  sortBy: string
  queryName?: string
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({
  options,
  sortBy,
  queryName,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      params.delete('page')

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <Sorting
      options={options}
      sortBy={sortBy}
      queryName={queryName}
      setQueryParams={setQueryParams}
    />
  )
}

export default RefinementList
