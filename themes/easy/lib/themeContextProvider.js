import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

/**
 * 主题变量Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function ThemeContextProvider(props) {
  const [FloatSlot, setFloatSlot] = useState(<></>) // 默认语言


  return (
        <ThemeContext.Provider value={{
            FloatSlot,
            setFloatSlot
        }}>
            {props.children}
        </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
