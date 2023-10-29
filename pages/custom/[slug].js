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
  const p = {
    customPath: router.query.slug,
    ...props
  }
  const Layout = getLayoutByTheme(router)
  return <Layout {...p} />
}
export async function getStaticPaths() {
  const paths = []

  return { paths, fallback: true }
}
export async function getStaticProps({ params: { slug } }) {
  const props = (await getGlobalData({ from: 'custom' })) || {}
  return {
    props
  }
}
export default CustomPage
