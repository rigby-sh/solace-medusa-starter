export type OptionType = {
  value: string
  label: string
}

export type RootProps = {
  children: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  error?: string
  className?: string
}

export type TriggerProps = {
  children: React.ReactNode
  className?: string
  dataTestId?: string
}

export type ContentProps = {
  children: React.ReactNode
  className?: string
  position?: 'popper' | 'item-aligned'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}

export type GroupProps = {
  children: React.ReactNode
  label?: string
  className?: string
}

export type ItemProps = {
  value: string
  children: React.ReactNode
  type?: 'default' | 'checkbox'
  className?: string
}
