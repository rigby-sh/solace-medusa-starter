import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from 'react'

import { cn } from './cn'

export function Slot({
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  if (Children.count(children) > 1) {
    throw new Error('Only one child allowed')
  }
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...children.props,
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: cn(props.className, children.props.className),
    })
  }
  return null
}
