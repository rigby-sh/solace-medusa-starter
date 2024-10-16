'use client'

import React, { useEffect, useState } from 'react'

import { applyPromotions, submitPromotionForm } from '@lib/data/cart'
import { HttpTypes } from '@medusajs/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/common/components/accordion'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import { toast } from '@modules/common/components/toast'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  DiscountIcon,
  TrashIcon,
} from '@modules/common/icons'
import { useFormState } from 'react-dom'

import { SubmitButton } from '../submit-button'

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [codeValue, setCodeValue] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const { promotions = [] } = cart
  const [codes, setCodes] = useState(promotions)
  const [codeChanged, setCodeChanged] = useState({ changed: false, code: '' })

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )
    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
    setErrorMessage('')
    setCodeChanged({ code, changed: true })
  }
  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage('')
    const code = formData.get('code')
    if (!code) {
      setErrorMessage('Please enter code')
      return
    }
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(typeof code === 'string' ? code : JSON.stringify(code))
    await applyPromotions(codes)
    if (codeValue) {
      setCodeValue('')
    }
    setCodeChanged({ code: code.toString(), changed: true })
  }

  const [message] = useFormState(submitPromotionForm, null)

  useEffect(() => {
    if (!codeChanged.changed) return
    if (codes.length < promotions.length) {
      toast(
        'success',
        `The promotion "${codeChanged.code}" has been successfully applied`
      )
    } else if (codes.length > promotions.length) {
      toast(
        'success',
        `The promotion "${codeChanged.code}" has been successfully removed`
      )
    } else if (
      codes.length === promotions.length &&
      promotions
        .filter((p) => p.code !== undefined)
        .map((p) => p.code!)
        .includes(codeChanged.code)
    ) {
      toast(
        'error',
        `The promotion "${codeChanged.code}" has been already applied`
      )
    } else {
      toast('error', `The promotion "${codeChanged.code}" was not found`)
    }
    setCodes(promotions)
    setCodeChanged((prev) => {
      return { ...prev, changed: false }
    })
  }, [promotions])

  return (
    <form
      action={(a) => {
        addPromotionCode(a)
      }}
    >
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-2"
      >
        <AccordionItem value={`discount`} className="bg-primary px-5 pb-3 pt-5">
          <AccordionTrigger className="text-basic-primary [&[data-state=open]>#chevronDown]:rotate-180">
            <Heading
              className="flex items-center gap-2 text-left text-lg font-medium"
              as="h3"
            >
              <DiscountIcon />
              Have promo code?
            </Heading>
            <div
              id="chevronDown"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-action-primary duration-300 ease-in-out"
            >
              <ChevronDownIcon />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Box className="flex flex-col gap-4 px-3 pb-4">
              {promotions.length > 0 &&
                promotions.map((promotion) => {
                  return (
                    <div
                      className="flex items-center justify-between"
                      key={promotion.id}
                    >
                      <div className="flex gap-2">
                        <CheckCircleIcon className="text-positive" />
                        <Label className="text-md uppercase text-positive">
                          {promotion.code}
                        </Label>
                      </div>
                      <Button
                        variant="tonal"
                        size="sm"
                        withIcon
                        onClick={() => {
                          if (!promotion.code) {
                            return
                          }
                          removePromotionCode(promotion.code)
                        }}
                        className="bg-transparent hover:bg-transparent"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  )
                })}
              <div className="flex flex-col gap-2">
                <Box className="flex w-full justify-between gap-3">
                  <Box className="w-3/4">
                    <Input
                      name="code"
                      error={errorMessage || message}
                      placeholder="Enter promo code"
                      value={codeValue}
                      onChange={(e) => setCodeValue(e.target.value)}
                    />
                  </Box>
                  <Box className="flex w-1/4 justify-center">
                    <SubmitButton variant="tonal">Activate</SubmitButton>
                  </Box>
                </Box>
              </div>
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  )
}

export default DiscountCode
