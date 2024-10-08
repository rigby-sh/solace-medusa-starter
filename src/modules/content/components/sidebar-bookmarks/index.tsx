'use client'

import { useState } from 'react'

import { cn } from '@lib/util/cn'
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
  const [activeSection, setActiveSection] = useState('placing-order')

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 96
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

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
                  onClick={() => scrollToSection(section.id)}
                  className={cn('w-fit cursor-pointer py-2 text-left text-lg', {
                    'border-b border-action-primary':
                      activeSection === section.id,
                  })}
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
