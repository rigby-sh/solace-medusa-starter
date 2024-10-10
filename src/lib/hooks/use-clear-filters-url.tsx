'use client'

import { usePathname } from 'next/navigation'

import { createUrl } from '@lib/util/urls'

export const useClearFiltersUrl = () => {
  const pathname = usePathname()

  const clearAllPathname = createUrl(pathname, new URLSearchParams())
  return clearAllPathname
}
