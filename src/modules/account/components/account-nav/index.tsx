'use client'

import React, { Fragment } from 'react'
import { useParams } from 'next/navigation'

import { signout } from '@lib/data/customer'
import { cn } from '@lib/util/cn'
import { Button } from '@modules/common/components/button'

import AccountNavLink from './account-nav-link'
import { profileNavItemsGroups } from './consts'

const AccountNav = () => {
  const { countryCode } = useParams()

  const handleLogout = async () => {
    await signout(countryCode as string)
  }

  return (
    <div className="w-full bg-primary">
      <nav>
        {profileNavItemsGroups.map((group, groupIndex) => (
          <Fragment key={groupIndex}>
            <ul className="px-5 pt-5">
              {group.map((item, itemIndex) => (
                <li
                  key={item.href || item.type}
                  className={cn(itemIndex === group.length - 1 && 'pb-5')}
                >
                  {item.type === 'logout' ? (
                    <Button
                      variant="text"
                      onClick={handleLogout}
                      className="w-full justify-start rounded-none p-0 transition-all duration-200 ease-in-out hover:bg-hover"
                    >
                      <div className="flex items-center gap-2 p-4 text-lg">
                        {item.icon}
                        {item.label}
                      </div>
                    </Button>
                  ) : (
                    <AccountNavLink href={item.href} icon={item.icon}>
                      {item.label}
                    </AccountNavLink>
                  )}
                </li>
              ))}
            </ul>
            {groupIndex < profileNavItemsGroups.length - 1 && (
              <div className="h-px w-full bg-hover" />
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  )
}

export default AccountNav
