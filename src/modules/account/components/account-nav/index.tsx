'use client'

import React from 'react'
import { useParams, usePathname } from 'next/navigation'

import { signout } from '@lib/data/customer'
import { ArrowRightOnRectangle } from '@medusajs/icons'
import { HttpTypes } from '@medusajs/types'
import { clx } from '@medusajs/ui'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import {
  ChevronDownIcon,
  MapPinIcon,
  PackageIcon,
  UserIcon,
} from '@modules/common/icons'

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams()

  const handleLogout = async () => {
    await signout(countryCode as string)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode as string}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="text-small-regular flex items-center gap-x-2 py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDownIcon className="rotate-90 transform" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <UserIcon size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDownIcon className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPinIcon size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDownIcon className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <PackageIcon size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDownIcon className="-rotate-90 transform" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 px-8 py-4"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDownIcon className="-rotate-90 transform" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route}
                  data-testid="overview-link"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route}
                  data-testid="profile-link"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route}
                  data-testid="addresses-link"
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route}
                  data-testid="orders-link"
                >
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  'data-testid'?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  'data-testid': dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx('text-ui-fg-subtle hover:text-ui-fg-base', {
        'font-semibold text-ui-fg-base': active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
