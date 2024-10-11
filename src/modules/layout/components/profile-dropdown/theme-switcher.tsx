import { useEffect, useState } from 'react'

import { Button } from '@modules/common/components/button'
import { MoonIcon, SunIcon } from '@modules/common/icons'

export function ThemeSwitcher() {
  const [preferredColorTheme, SetPreferredColorTheme] = useState('light')
  const handleClick = () => {
    const newColorTheme = preferredColorTheme === 'light' ? 'dark' : 'light'
    SetPreferredColorTheme(newColorTheme)
    document.documentElement.setAttribute('data-theme', newColorTheme)
    localStorage.setItem('theme', newColorTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      SetPreferredColorTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      const userPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      const defaultTheme = userPrefersDark ? 'dark' : 'light'
      SetPreferredColorTheme(defaultTheme)
      document.documentElement.setAttribute('data-theme', defaultTheme)
    }
  }, [])
  return (
    <Button
      variant="text"
      onClick={handleClick}
      className="w-full justify-start rounded-none p-0 hover:bg-hover"
    >
      <div className="flex items-center gap-4 p-4 text-lg">
        {preferredColorTheme === 'dark' ? (
          <>
            <SunIcon /> Switch to light mode
          </>
        ) : (
          <>
            <MoonIcon /> Switch to dark mode
          </>
        )}
      </div>
    </Button>
  )
}
