import React from 'react'
import { Metadata } from 'next'

import { getBaseURL } from '@lib/util/env'
import Footer from '@modules/layout/templates/footer'
import NavWrapper from '@modules/layout/templates/nav'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: {
  params: Promise<{ countryCode: string }>
  children: React.ReactNode
}) {
  return (
    <>
      <NavWrapper countryCode={(await props.params).countryCode} />
      {props.children}
      <Footer countryCode={(await props.params).countryCode} />
    </>
  )
}
