'use client'

import { useState } from 'react'

import { cn } from '@lib/util/cn'
import { scrollToSection } from '@lib/util/scroll-to-section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/common/components/accordion'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { ChevronDownIcon } from '@modules/common/icons/chevron-down'

export function TableOfContents({ headings }) {
  const [isOpen, setIsOpen] = useState(true)
  const hasHeadings = headings.length > 0

  return (
    <Box className={cn('sticky top-24 p-5', hasHeadings ? 'block' : 'hidden')}>
      <Accordion
        type="single"
        collapsible
        defaultValue={isOpen ? 'content' : undefined}
        onValueChange={(value) => setIsOpen(!!value)}
      >
        <AccordionItem value="content" className="flex flex-col gap-3">
          <AccordionTrigger className="py-2">
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
            <Box className="flex flex-col items-start gap-3">
              {headings.map((heading) => (
                <Button
                  variant="text"
                  size="sm"
                  key={heading.id}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(heading.id)
                  }}
                  className={`level-${heading.level} px-0 text-lg`}
                >
                  {heading.text}
                </Button>
              ))}
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
