import React from 'react'

import { StoreProductCategory } from '@medusajs/types'
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsSeparator,
  BreadcrumbsStatic,
} from '@modules/common/components/breadcrumbs'
import { ArrowLeftIcon } from '@modules/common/icons'

export default function StoreBreadcrumbs({
  category,
}: {
  category?: StoreProductCategory
}) {
  return (
    <>
      <Breadcrumbs className="text-basic-primary">
        <BreadcrumbsList className="hidden small:flex">
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/">Home Page</BreadcrumbsLink>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsStatic>{category?.name ?? 'Shop'}</BreadcrumbsStatic>
          </BreadcrumbsItem>
        </BreadcrumbsList>
        <BreadcrumbsList className="flex small:hidden">
          <BreadcrumbsItem>
            <BreadcrumbsLink
              href="/"
              className="flex items-center gap-2 text-md"
            >
              <ArrowLeftIcon className="h-[18px] w-[18px]" />
              Back to Home Page
            </BreadcrumbsLink>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </>
  )
}
