'use client'

import { cn } from '@lib/util/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@modules/common/components/select'

type ItemQtySelectProps = {
  qty: number
  maxQuantity: number
  action: (quantity: number) => void
}

export default function ItemQtySelect({
  qty,
  maxQuantity,
  action,
}: ItemQtySelectProps) {
  return (
    <Select
      value={null}
      onValueChange={(quantity) => {
        action(+quantity)
      }}
      className={cn({
        'pointer-events-none opacity-60': maxQuantity === 0,
      })}
    >
      <SelectTrigger aria-label="Choose quantity">{qty}</SelectTrigger>
      <SelectContent>
        {Array.from(
          {
            length: Math.min(maxQuantity, 10),
          },
          (_, i) => (
            <SelectItem key={i} value={String(i + 1)} className="w-[108px]">
              {i + 1}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  )
}
