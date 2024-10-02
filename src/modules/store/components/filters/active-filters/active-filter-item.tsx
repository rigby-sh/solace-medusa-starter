import { Box } from '@modules/common/components/box'
import { Chips } from '@modules/common/components/chips'
import { Label } from '@modules/common/components/label'
import { XIcon } from '@modules/common/icons/x'

type ActiveFilterItemProps = {
  label: string
  filterKey: string
  options: {
    label: string
    handle: string
  }[]
  handleRemoveFilter: (filterKey: string, handle: string) => void
}

export default function ActiveFilterItem({
  label,
  filterKey,
  options,
  handleRemoveFilter,
}: ActiveFilterItemProps) {
  return (
    <Box className="flex items-start gap-4 medium:items-center">
      <Label className="text-secondary">{label}:</Label>
      <Box className="flex flex-wrap gap-2">
        {options
          ?.sort((a, b) =>
            label !== 'Price' ? a.label.localeCompare(b.label) : 0
          )
          .map((option, id) => (
            <Chips
              key={id}
              rightIcon={<XIcon />}
              className="cursor-inherit"
              selected
              onClick={() => handleRemoveFilter(filterKey, option.handle)}
            >
              <p className="text-center">{option.label}</p>
            </Chips>
          ))}
      </Box>
    </Box>
  )
}
