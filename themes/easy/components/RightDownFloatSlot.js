import { useTheme }  from "../lib/themeContextProvider"

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const RightDownFloatSlot = () => {
    const {FloatSlot} = useTheme();
    return FloatSlot
  }

export default RightDownFloatSlot