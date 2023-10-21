import { useRouter } from 'next/router'
import { getLayoutByTheme, getAllCustomPages } from '@/themes/theme'
import { getGlobalData } from '@/lib/notion/getNotionData'
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
    if (paths && props.customPath && !paths.includes(props.customPath)) {
      router.push('/404').then(() => {
        console.warn('找不到页面', router.asPath)
      })
    }
  })
  const Layout = getLayoutByTheme(router)
  return <Layout {...props} />
}

export async function getStaticPaths() {
  const paths = []
  return { paths, fallback: true }
}
export async function getStaticProps({ params: { slug } }) {
  const props = (await getGlobalData({ from: 'custom' })) || {}
  props.customPath = slug
  return { props }
}
export default CustomPage
