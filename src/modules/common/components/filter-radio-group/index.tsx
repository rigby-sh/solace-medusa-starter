import { ChangeEvent } from 'react'

import { cn } from '@lib/util/cn'
import { TickThinIcon } from '@modules/common/icons/tick-thin'

import { Label } from '../label'

type FilterRadioGroupProps = {
  items: { value: string; label: string }[]
  value: any
  handleChange: (...args: any[]) => void
}

const FilterRadioGroup = ({
  items,
  value,
  handleChange,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex w-[230px] flex-col bg-primary p-2">
      {items?.map((item) => (
        <Label
          key={item.value}
          className="grid cursor-pointer grid-cols-[25px_1fr] items-center space-x-2 p-3"
        >
          <input
            type="radio"
            checked={item.value === value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, item.value)
            }
            className="hidden"
            id={item.value}
            value={item.value}
          />
          <TickThinIcon
            className={cn('!m-0', {
              'w-0': item.value !== value,
              'h-4 w-4': item.value === value,
            })}
          />
          <span
            className={`text-md ${
              item.value === value ? 'font-medium' : 'font-base'
            }`}
          >
            {item.label}
          </span>
        </Label>
      ))}
    </div>
  )
}

export default FilterRadioGroup
