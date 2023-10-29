
import * as CustomPages from './pages'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
/**
 * 自定义页面
 * @param {*} props
 * @returns
 */
const Layout = props => {
    const {customPath} = props
    const router = useRouter()
    const children = CustomPages[customPath]
    useEffect(() => {
        debugger
        if(!children){
            router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
            })

        }
    }, [children])
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