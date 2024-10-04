import { Metadata } from 'next'

import { getBaseURL } from '@lib/util/env'
import { Toaster } from 'sonner'

import 'styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Toaster position="top-right" closeButton />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
