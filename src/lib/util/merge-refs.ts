import { ForwardedRef, RefCallback } from 'react'

export function mergeRefs<T>(...refs: ForwardedRef<T>[]): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ref.current = value as T
      }
    })
  }
}
