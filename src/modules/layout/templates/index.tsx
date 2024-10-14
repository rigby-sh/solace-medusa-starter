import React from 'react'

import Footer from '@modules/layout/templates/footer'
import NavWrapper from '@modules/layout/templates/nav'

const Layout: React.FC<{
  params: { countryCode: string }
  children: React.ReactNode
}> = ({ params, children }) => {
  return (
    <div>
      <NavWrapper countryCode={params.countryCode} />
      <main className="relative">{children}</main>
      <Footer countryCode={params.countryCode} />
    </div>
  )
}

export default Layout
