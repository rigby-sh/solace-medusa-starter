'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { createUrl } from '@lib/util/urls'
import { Checkbox } from '@modules/common/components/checkbox'
import { Label } from '@modules/common/components/label'
import clsx from 'clsx'
import { omit } from 'lodash'

type CheckboxProps = {
  items?: {
    label: string
    handle: string
    disabled?: boolean
  }[]
  param: string
}

export const FilterItems: React.FC<CheckboxProps> = ({ items, param }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const values = searchParams.get(param)?.split(',') ?? []

  const searchParamsObj = omit(
    Object.fromEntries(searchParams.entries()),
    'page'
  )

  return (
    <ul className="flex flex-col px-2">
      {items
        ?.sort((a, b) =>
          param !== 'price' ? a.label.localeCompare(b.label) : 0
        )
        .map((item) => {
          const checked = values.includes(item.handle)
          const DynamicTag = item.disabled ? 'li' : Link

          const newValues = checked
            ? values
                .filter((v) => v !== item.handle)
                .sort()
                .join(',')
            : [...values, item.handle].sort().join(',')

          const newSearchParamsObject = newValues.length
            ? { ...searchParamsObj, [param]: newValues }
            : omit(searchParamsObj, param)

          const href = createUrl(
            pathname,
            new URLSearchParams(newSearchParamsObject)
          )

          return (
            <DynamicTag
              className="flex items-center gap-2 p-1 pr-[90px] text-basic-primary"
              href={href}
              key={item.handle}
            >
              <div>
                <Checkbox
                  id={`${param}-${item.handle}`}
                  role="checkbox"
                  type="button"
                  checked={checked}
                  aria-checked={checked}
                  name={item.label}
                  disabled={item.disabled}
                />
              </div>
              <Label
                htmlFor={`${param}-${item.handle}`}
                size="lg"
                className={clsx('cursor-pointer text-basic-primary', {
                  'text-disabled': item.disabled,
                })}
              >
                {item.label}
              </Label>
            </DynamicTag>
          )
        })}
    </ul>
  )
}
