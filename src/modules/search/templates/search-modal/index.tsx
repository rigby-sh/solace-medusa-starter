'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { SEARCH_INDEX_NAME, searchClient } from '@lib/search-client'
import { MagnifyingGlassMini } from '@medusajs/icons'
import Hit from '@modules/search/components/hit'
import Hits from '@modules/search/components/hits'
import SearchBox from '@modules/search/components/search-box'
import { InstantSearch } from 'react-instantsearch-hooks-web'

export default function SearchModal() {
  const router = useRouter()
  const searchRef = useRef(null)

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
    <div className="relative z-[75]">
      <div className="fixed inset-0 h-screen w-screen bg-opacity-75 opacity-100 backdrop-blur-md" />
      <div className="sm:p-0 fixed inset-0 px-5" ref={searchRef}>
        <div className="flex h-fit max-h-[75vh] w-full transform flex-col items-center justify-start bg-transparent p-5 text-left align-middle shadow-none transition-all">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div
              className="sm:w-fit absolute flex h-fit w-full flex-col"
              data-testid="search-modal-container"
            >
              <div className="rounded-rounded flex w-full items-center gap-x-2 bg-[rgba(3,7,18,0.5)] p-4 text-ui-fg-on-color backdrop-blur-2xl">
                <MagnifyingGlassMini />
                <SearchBox />
              </div>
              <div className="mt-6 flex-1">
                <Hits hitComponent={Hit} />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}
