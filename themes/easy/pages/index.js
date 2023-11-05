
import * as CustomPages from './pages'
import _404Card from '../components/404'
/**
 * 自定义页面
 * @param {*} props
 * @returns
 */
const Layout = props => {
    const {customPath} = props
    if(!customPath) return (
        <div/>
    )
    const children = CustomPages[customPath]
    if(!children) return (
        <_404Card/>
    )
    return (
        <>
        {children && children(customPath)}
        </>
    )
}

export default Layout