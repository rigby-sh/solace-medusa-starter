'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@modules/common/components/input'

export default function SearchBox({ countryCode }: { countryCode: string }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const currentUrl = new URL(window.location.href)
      if (query.trim() === '') {
        currentUrl.searchParams.delete('q')
      } else {
        currentUrl.searchParams.set('q', query.trim())
      }
      const newPath = `/${countryCode}/blog${currentUrl.search}`
      router.push(newPath)
    }
  }

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
    }
  }, [searchParams])

  return (
    <Input
      type="search"
      name="search"
      ref={inputRef}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSearch}
      placeholder="Search"
    />
  )
}
