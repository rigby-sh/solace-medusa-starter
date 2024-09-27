import { ComponentPropsWithoutRef } from 'react'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps<T extends HeadingLevel> {
  as?: T
}

export function Heading<T extends HeadingLevel>({
  as,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, keyof HeadingProps<T>> & HeadingProps<T>) {
  const Component = as ?? 'h1'
  return <Component {...props}>{children}</Component>
}
