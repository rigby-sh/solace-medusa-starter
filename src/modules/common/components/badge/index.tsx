import { cn } from '@lib/util/cn'
import { cva, VariantProps } from 'cva'

import { Box } from '../box'
import { Label } from '../label'

const badgeVariants = cva({
  base: 'flex w-max items-center justify-center rounded-2xl px-2 py-1',
  variants: {
    variant: {
      basic: 'bg-primary text-basic-primary',
      brand:
        'bg-fg-primary text-inverse-primary [.dark_&]:bg-fg-tertiary [.dark_&]:text-static',
      green: 'bg-fg-positive text-positive',
      red: 'bg-fg-secondary-negative text-negative',
    },
  },
  defaultVariants: {
    variant: 'basic',
  },
})

interface BadgeProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof badgeVariants> {
  label: string
  icon?: React.ReactNode
}

export function Badge({ label, icon, ...props }: BadgeProps) {
  const badgeClassName = cn(badgeVariants({ ...props }), props.className)

  return (
    <Box className="relative z-10">
      <Box className="absolute left-0 top-0 z-[-1] h-full w-full rounded-2xl bg-primary" />
      <Box className={badgeClassName}>
        {icon && <div className="mr-1">{icon}</div>}
        <Label size="sm">{label}</Label>
      </Box>
    </Box>
  )
}
