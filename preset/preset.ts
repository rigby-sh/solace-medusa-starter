import uiPlugin from './plugins/plugin'
import uiTheme from './theme/theme'

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { ...uiTheme },
  plugins: [uiPlugin],
}
