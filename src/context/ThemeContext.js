import React, { useState } from 'react'

const ThemeContext = React.createContext(null)

export function ThemeContextProvider({ children }) {
  const [theme, toggleTheme] = useState(false)

  const color = theme ? 'light-theme' : 'dark-theme'

  return (
    <ThemeContext.Provider value={{ color, theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

export default ThemeContext
