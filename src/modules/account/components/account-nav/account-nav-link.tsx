'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@lib/util/cn'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

type AccountNavLinkProps = {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  'data-testid'?: string
}

const AccountNavLink = ({
  href,
  children,
  icon,
  'data-testid': dataTestId,
}: AccountNavLinkProps) => {
  const route = usePathname()
  const active = route.endsWith(href)

  return (
    <LocalizedClientLink href={href} data-testid={dataTestId}>
      <div
        className={cn(
          'flex items-center gap-4 p-4 hover:bg-gray-100',
          active && 'bg-gray-100'
        )}
      >
        {icon}
        <p>{children}</p>
      </div>
    </LocalizedClientLink>
  )
}

export default AccountNavLink
