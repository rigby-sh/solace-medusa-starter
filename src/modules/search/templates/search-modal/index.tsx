'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Box } from '@modules/common/components/box'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ControlledSearchBox } from '@modules/search/components/search-box'

export default function SearchModal({ countryCode }: { countryCode: string }) {
  const [query, setQuery] = useState<string | undefined>('')
  const router = useRouter()
  const searchRef = useRef(null)

  const handleSubmit = () => {
    if (query) {
      router.push(`/${countryCode}/results/${query}`)
    }
  }

  // close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back()
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
    // cleanup
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back()
      }
    }
    window.addEventListener('keydown', handleEsc)

    // cleanup
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className="relative z-[75]">
      <Box className="fixed inset-0 h-screen w-screen bg-opacity-75 opacity-100 backdrop-blur-md" />
      <div className="sm:p-0 fixed inset-0 px-5" ref={searchRef}>
        <Box className="flex h-fit max-h-[75vh] w-full transform flex-col items-center justify-start bg-transparent p-5 text-left align-middle shadow-none transition-all">
          <Box
            className="sm:w-fit absolute mt-5 flex h-fit w-full flex-col gap-6 small:max-w-[700px] small:gap-8"
            data-testid="search-modal-container"
          >
            <ControlledSearchBox
              inputRef={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={handleSubmit}
              onReset={() => setQuery('')}
              placeholder="Search products..."
            />
            <LocalizedClientLink
              href={`/results/${query}`}
              className="border border-action-primary bg-primary p-3 text-center small:p-4"
            >
              Search
            </LocalizedClientLink>
          </Box>
        </Box>
      </div>
    </Box>
  )
}
