import React, { useContext }from 'react'
import ThemeContext from '../context/ThemeContext'

const Header = () => {
  const {color, theme, toggleTheme} = useContext(ThemeContext)

  const handleClick = () => {
    toggleTheme(!theme)
  }

  return (
    <div className="header">
      <h1 style={{ color }}>React Hooks</h1>
      <button type="button" onClick={handleClick}> { theme ? 'Dark Mode': 'Light Mode'}</button>
    </div>
  )
}

export default Header
