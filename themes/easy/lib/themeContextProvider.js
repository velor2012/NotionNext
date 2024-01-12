import { createContext, useContext, useRef, useState } from 'react'

const ThemeContext = createContext()

/**
 * 主题变量Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function ThemeContextProvider(props) {
  const [FloatSlot, setFloatSlot] = useState(<></>) // 默认语言
  const [searchModal, setSearchModal] = useState(useRef(null)) // 默认语言


  return (
        <ThemeContext.Provider value={{
            FloatSlot,
            setFloatSlot,
            searchModal, 
            setSearchModal
        }}>
            {props.children}
        </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
