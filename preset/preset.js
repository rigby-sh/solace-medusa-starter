const uiPlugin = require('./plugins/plugin')
const uiTheme = require('./theme/theme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { ...uiTheme },
  plugins: [uiPlugin],
}
