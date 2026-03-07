import { createContext, useContext, useRef, useState } from 'react'
import useUmami from './useUmami'

const ThemeContext = createContext()

/**
 * 主题变量Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function ThemeContextProvider(props) {
  const [FloatSlot, setFloatSlot] = useState(<></>) // 右下角浮动按钮
  const [searchModal, setSearchModal] = useState(useRef(null)) // 搜索框对象
  const [isShowLogo, setIsShowLogo] = useState(false) // 显示logo（网站名）
  const [isShowTitle, setIsShowTitle] = useState(false) // 显示logo（网站名）
  const { activeNum } = useUmami()
  
  return (
        <ThemeContext.Provider value={{
            FloatSlot,
            setFloatSlot,
            searchModal, 
            setSearchModal,
            isShowLogo,
            setIsShowLogo,
            isShowTitle,
            setIsShowTitle,
            activeNum
        }}>
            {props.children}
        </ThemeContext.Provider>
  )
}



export const useTheme = () => useContext(ThemeContext)
