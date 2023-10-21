import { useRouter } from 'next/router'
import { getLayoutByTheme, getAllCustomPages } from '@/themes/theme'
import { useEffect } from 'react'

/**
 * 404
 * @param {*} props
 * @returns
 */
const CustomPage = props => {
  // 根据页面路径加载不同Layout文件
  const router = useRouter()
  const paths = getAllCustomPages(router)
  useEffect(() => {
    if (paths && router.query.slug && !paths.includes(router.query.slug)) {
      router.push('/404').then(() => {
        console.warn('找不到页面', router.asPath)
      })
    }
  })
  const p = {
    customPath: router.query.slug,
    ...props
  }
  const Layout = getLayoutByTheme(router)
  return <Layout {...p} />
}
export default CustomPage
