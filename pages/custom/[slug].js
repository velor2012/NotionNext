import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { getGlobalData } from '@/lib/notion/getNotionData'
/**
 * 404
 * @param {*} props
 * @returns
 */
const CustomPage = props => {
  // 根据页面路径加载不同Layout文件
  const router = useRouter()
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
  return {
    props
  }
}
export default CustomPage
