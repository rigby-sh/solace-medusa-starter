'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@lib/util/cn'
import { scrollToSection } from '@lib/util/scroll-to-section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/common/components/accordion'
import { ChevronDownIcon } from '@modules/common/icons'

type SidebarBookmarksProps = {
  data: { id: string; label: string }[]
}

const SidebarBookmarks = ({ data }: SidebarBookmarksProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [activeSection, setActiveSection] = useState(data[0].id)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 96

      for (let i = data.length - 1; i >= 0; i--) {
        const section = document.getElementById(data[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(data[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [data])

  return (
    <div className="sticky top-24 w-full bg-primary">
      <Accordion
        type="single"
        collapsible
        defaultValue={isOpen ? 'content' : undefined}
        onValueChange={(value) => setIsOpen(!!value)}
      >
        <AccordionItem value="content" className="rounded-none border-none p-5">
          <AccordionTrigger className="flex w-full justify-between py-2">
            <span className="text-lg font-medium">Content</span>
            <span>
              {isOpen ? (
                <ChevronDownIcon className="h-5 w-5 rotate-180" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <nav className="mt-2 flex flex-col space-y-3">
              {data.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(section.id)
                    setActiveSection(section.id)
                  }}
                  className={cn(
                    'w-fit cursor-pointer py-2 text-left text-lg transition-colors duration-500',
                    {
                      'border-b border-action-primary':
                        activeSection === section.id,
                    }
                  )}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SidebarBookmarks
