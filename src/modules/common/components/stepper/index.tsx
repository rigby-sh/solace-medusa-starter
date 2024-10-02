import { cn } from '@lib/util/cn'
import { CheckThinIcon } from '@modules/common/icons'
import { cva, VariantProps } from 'cva'

const stepperVariants = cva({
  base: 'border rounded-full text-lg h-[32px] w-[32px] flex items-center justify-center',
  variants: {
    state: {
      incomplete: 'border-basic-primary text-basic-primary',
      focussed: 'text-action-primary bg-fg-secondary border-action-primary',
      completed: 'text-action-primary bg-fg-secondary border-action-primary',
    },
  },
  defaultVariants: {
    state: 'incomplete',
  },
})

interface StepperProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof stepperVariants> {
  children?: React.ReactNode
}

export function Stepper({ state, className, ...props }: StepperProps) {
  return (
    <div className={cn(stepperVariants({ state }), className)} {...props}>
      {state === 'completed' ? (
        <CheckThinIcon className="h-[20px] w-[20px] text-action-primary" />
      ) : (
        props.children
      )}
    </div>
  )
}
