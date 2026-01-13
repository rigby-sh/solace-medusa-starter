const { animation, keyframes } = require('./animations')
const { boxShadow, colors } = require('./colors')
const { screens } = require('./constants')
const { fontFamily, fontSize } = require('./typography')

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

module.exports = uiTheme
