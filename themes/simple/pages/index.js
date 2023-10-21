
import * as CustomPages from './pages'
/**
 * 自定义页面
 * @param {*} props
 * @returns
 */
const Layout = props => {
    const {customPath} = props
    const children = CustomPages[customPath]
    if(!children) return (
        <div/>
    )
    return (
        <>
        {children && children(customPath)}
        </>
    )
}

export default Layout