'use client'

import React from 'react'

import { applyPromotions, submitPromotionForm } from '@lib/data/cart'
import { HttpTypes } from '@medusajs/types'
import { clx } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import {
  Menu,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from '@modules/common/components/menu'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  DiscountIcon,
  TrashIcon,
} from '@modules/common/icons'
import { useFormState } from 'react-dom'

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [message] = useFormState(submitPromotionForm, null)
  const [codeValue, setCodeValue] = React.useState('')
  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code === undefined).map((p) => p.code!)
    )
  }
  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get('code')
    if (!code) {
      return
    }
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!)
    codes.push(typeof code === 'string' ? code : JSON.stringify(code))
    await applyPromotions(codes)
    if (codeValue) {
      setCodeValue('')
    }
  }
  return (
    <form action={(a) => addPromotionCode(a)}>
      <MenuRoot className="bg-primary">
        {({ open }) => (
          <Menu className="p-2">
            <MenuTrigger
              label="Have promo code?"
              icon={<DiscountIcon />}
              className={clx('hover:bg-transparent focus:bg-transparent', {
                'bg-transparent focus:bg-transparent': open,
              })}
              customArrow={
                <ChevronDownIcon
                  className={clx(
                    'flex h-7 w-7 self-center transition-all duration-300 ease-in-out',
                    { 'rotate-180': open }
                  )}
                />
              }
            />
            <MenuContent position="bottom" className="relative mt-2">
              <Box className="flex flex-col gap-4 px-3 pb-4">
                {promotions.length > 0 &&
                  promotions.map((promotion) => {
                    return (
                      <div className="flex justify-between" key={promotion.id}>
                        <div className="flex gap-2 pt-2">
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
                        placeholder="Enter promo code"
                        value={codeValue}
                        onChange={(e) => setCodeValue(e.target.value)}
                      />
                    </Box>
                    <Box className="w-1/4">
                      <Button variant="tonal" type="submit" className="w-full">
                        Activate
                      </Button>
                    </Box>
                  </Box>
                  {message && (
                    <Box className="text-sm text-ui-fg-error">
                      <span>{message}</span>
                    </Box>
                  )}
                </div>
              </Box>
            </MenuContent>
          </Menu>
        )}
      </MenuRoot>
    </form>
  )
}

export default DiscountCode
