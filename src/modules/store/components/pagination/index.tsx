'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { clx } from '@medusajs/ui'
import { ChevronLeftIcon } from '@modules/common/icons/chevron-left'
import { ChevronRightIcon } from '@modules/common/icons/chevron-right'

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid,
}: {
  page: number
  totalPages: number
  'data-testid'?: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', p.toString())
    const href = `${pathname}?${params.toString()}`

    return (
      <Link
        key={p}
        href={href}
        scroll={false}
        onClick={(e) => {
          if (isCurrent) {
            e.preventDefault()
            return
          }
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={clx(
          'txt-xlarge-plus flex h-10 w-10 items-center justify-center text-basic-primary',
          {
            'rounded-full border-[1px] border-black bg-fg-secondary hover:text-ui-fg-subtle':
              isCurrent,
          }
        )}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {label}
      </Link>
    )
  }

  const renderArrowButton = (direction: 'prev' | 'next', disabled: boolean) => {
    const newPage = direction === 'prev' ? page - 1 : page + 1
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    const href = `${pathname}?${params.toString()}`

    return (
      <Link
        href={href}
        scroll={false}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
            return
          }
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="txt-xlarge-plus flex h-10 w-10 items-center justify-center text-ui-fg-muted"
        aria-disabled={disabled}
      >
        {direction === 'prev' ? (
          <ChevronLeftIcon className="h-5 w-5 text-basic-primary" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-basic-primary" />
        )}
      </Link>
    )
  }

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="txt-xlarge-plus cursor-default items-center text-ui-fg-muted"
    >
      ...
    </span>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis('ellipsis1'))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis('ellipsis2'))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis('ellipsis3'))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis('ellipsis4'))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  // Render the component
  return (
    <div className="mt-12 flex w-full justify-center">
      <div className="flex items-center gap-1" data-testid={dataTestid}>
        {renderArrowButton('prev', page <= 1)}
        {renderPageButtons()}
        {renderArrowButton('next', page >= totalPages)}
      </div>
    </div>
  )
}
