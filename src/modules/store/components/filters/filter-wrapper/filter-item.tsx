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
    id: string
    value: string
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
          param !== 'price' ? a.value.localeCompare(b.value) : 0
        )
        .map((item) => {
          const checked = values.includes(item.id)
          const DynamicTag = item.disabled ? 'li' : Link

          const newValues = checked
            ? values
                .filter((v) => v !== item.id)
                .sort()
                .join(',')
            : [...values, item.id].sort().join(',')

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
              key={item.id}
            >
              <div>
                <Checkbox
                  id={`${param}-${item.id}`}
                  role="checkbox"
                  type="button"
                  checked={checked}
                  aria-checked={checked}
                  name={item.value}
                  disabled={item.disabled}
                />
              </div>
              <Label
                htmlFor={`${param}-${item.id}`}
                size="lg"
                className={clsx('cursor-pointer text-basic-primary', {
                  'pointer-events-none text-disabled': item.disabled,
                })}
              >
                {item.value}
              </Label>
            </DynamicTag>
          )
        })}
    </ul>
  )
}
