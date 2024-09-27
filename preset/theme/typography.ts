import defaultTheme from 'tailwindcss/defaultTheme'

export const fontFamily = { sans: ['Inter', ...defaultTheme.fontFamily.sans] }

export const fontSize = {
  sm: ['0.75rem', { lineHeight: '1.25rem' }],
  md: ['0.875rem', { lineHeight: '1.375rem' }],
  lg: ['1rem', { lineHeight: '1.5rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['2rem', { lineHeight: '2.5rem' }],
  '4xl': ['2.5rem', { lineHeight: '3rem' }],
  '5xl': ['3rem', { lineHeight: '3.5rem' }],
}
