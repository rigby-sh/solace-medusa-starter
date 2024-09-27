export const animation = {
  'slide-down': 'accordion-slide-down 0.3s ease-in-out',
  'slide-up': 'accordion-slide-up 0.3s ease-in-out',
}
export const keyframes = {
  'accordion-slide-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-slide-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
}
