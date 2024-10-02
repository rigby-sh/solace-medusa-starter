'use client'

import { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const useActiveFilterHandles = ({ key }: { key: string }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return useMemo(() => {
    const activeFilterHandles = searchParams.get(key)?.split(',') ?? []

    return activeFilterHandles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])
}
