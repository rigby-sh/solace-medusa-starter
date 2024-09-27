import plugin from 'tailwindcss/plugin'

import { darkMode, rootColors } from './colors'

const uiPlugin = plugin(function ({ addBase, theme }) {
  addBase({
    ':root': {
      ...rootColors,
    },
    '@media (prefers-color-scheme: dark)': {
      '.dark': {
        ...darkMode,
      },
    },
    h1: {
      fontSize: theme('fontSize.5xl'),
      fontWeight: theme('fontWeight.font-normal'),
    },
    h2: {
      fontSize: theme('fontSize.3xl'),
      fontWeight: theme('fontWeight.font-normal'),
    },
    h3: {
      fontSize: theme('fontSize.2xl'),
      fontWeight: theme('fontWeight.font-normal'),
    },
    h4: {
      fontSize: theme('fontSize.large'),
      fontWeight: theme('fontWeight.font-normal'),
    },
    h5: {
      fontSize: theme('fontSize.medium'),
      fontWeight: theme('fontWeight.font-normal'),
    },
    h6: {
      fontSize: theme('fontSize.small'),
      fontWeight: theme('fontWeight.font-normal'),
    },
  })
})

export default uiPlugin
