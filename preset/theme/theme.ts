import { animation, keyframes } from './animations'
import { boxShadow, colors } from './colors'
import { screens } from './constants'
import { fontFamily, fontSize } from './typography'

const uiTheme = {
  screens,
  fontSize,
  extend: {
    fontFamily,
    ...colors,
    boxShadow,
    keyframes,
    animation,
  },
}

export default uiTheme
