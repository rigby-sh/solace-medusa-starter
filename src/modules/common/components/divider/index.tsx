import { cn } from '@lib/util/cn'
import { cva } from 'cva'

const dividerVariants = cva({
  variants: {
    variant: {
      primary: 'border-t border-primary',
      secondary: 'border-t border-secondary',
    },
    alignment: {
      horizontal: 'border-t w-full h-0',
      vertical: 'border-l h-full w-0',
    },
  },
  defaultVariants: {
    variant: 'primary',
    alignment: 'horizontal',
  },
})

type DividerProps = {
  variant?: 'primary' | 'secondary'
  alignment?: 'horizontal' | 'vertical'
  className?: string
}

function Divider({ variant, alignment, className }: DividerProps) {
  return (
    <div
      data-testid="divider"
      className={cn(dividerVariants({ variant, alignment }), className)}
    />
  )
}

export default Divider
