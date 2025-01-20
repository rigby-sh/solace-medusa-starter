'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Tab } from '@headlessui/react'
import { formatNameForTestId } from '@lib/util/formatNameForTestId'

import { profileNavItemsGroups } from './consts'

const AccountMobileNav = () => {
  const router = useRouter()
  const [navLinks] = useState(
    profileNavItemsGroups
      .flat()
      .filter((item) => item.type !== 'logout')
      .map((item) => ({
        id: item.href.split('/').pop() || 'dashboard',
        label: item.label,
        path: item.href,
      }))
  )
  const [borderStyle, setBorderStyle] = useState({})
  const menuRef = useRef(null)
  const tabsRef = useRef(null)

  const updateBorderPosition = useCallback((index: number) => {
    const activeElement =
      menuRef.current?.querySelectorAll('[role="tab"]')[index]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setBorderStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
      scrollToTab(activeElement)
    }
  }, [])

  useEffect(() => {
    updateBorderPosition(0)
  }, [updateBorderPosition])

  const scrollToTab = (tabElement: HTMLElement) => {
    if (tabsRef.current) {
      const container = tabsRef.current
      const scrollLeft =
        tabElement.offsetLeft -
        container.offsetWidth / 2 +
        tabElement.offsetWidth / 2
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })
    }
  }

  const handleTabChange = (index: number) => {
    updateBorderPosition(index)
    router.push(navLinks[index].path)
  }

  return (
    <div className="w-full bg-primary xl:hidden">
      <Tab.Group onChange={handleTabChange} as="div">
        <div className="relative">
          <div
            ref={tabsRef}
            className="scrollbar-hide overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <Tab.List
              ref={menuRef}
              className="relative flex min-w-max items-center justify-between border-b border-basic-primary px-4"
            >
              {navLinks.map((navItem) => (
                <Tab
                  key={navItem.id}
                  className="flex-1 whitespace-nowrap p-2 text-lg focus:outline-none"
                  data-testid={formatNameForTestId(`${navItem.label}-nav-item`)}
                >
                  {navItem.label}
                </Tab>
              ))}
              <span
                className="absolute bottom-0 h-[1px] bg-fg-primary transition-all duration-300 ease-in-out"
                style={borderStyle}
              />
            </Tab.List>
          </div>
        </div>
      </Tab.Group>
    </div>
  )
}

export default AccountMobileNav
