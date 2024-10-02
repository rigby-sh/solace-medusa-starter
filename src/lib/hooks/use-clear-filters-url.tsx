'use client'

import { useSearchParams } from 'next/navigation'

import { createUrl } from '@lib/util/urls'

import { FILTER_KEYS, PRODUCT_LIST_PATHNAMES } from '../constants'

export const useClearFiltersUrl = () => {
  const searchParams = useSearchParams()

  const q = searchParams.get(FILTER_KEYS.SEARCH_KEY) ?? ''

  const clearAllPathname = createUrl(
    q ? PRODUCT_LIST_PATHNAMES.SEARCH : PRODUCT_LIST_PATHNAMES.EXPLORE,
    new URLSearchParams({
      ...(q && { [FILTER_KEYS.SEARCH_KEY]: q }),
    })
  )

  return clearAllPathname
}
