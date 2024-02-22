import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { siteConfig } from '@/lib/config'
/**
 * 404
 * @param {*} props
 * @returns
 */
const CustomPage = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  return <Layout {...props} />
}
export async function getStaticPaths() {
  const paths = []

  return { paths, fallback: true }
}
export async function getStaticProps({ params: { slug } }) {
  const props = (await getGlobalData({ from: 'custom' })) || {}
  props.customPath = slug
  return {
    props
  }
}
export default CustomPage
