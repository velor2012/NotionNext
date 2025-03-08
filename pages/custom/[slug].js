import BLOG from '@/blog.config'
import { DynamicLayout } from '@/themes/theme'
import { getGlobalData } from '@/lib/db/getSiteData'
import { siteConfig } from '@/lib/config'
/**
 * 404
 * @param {*} props
 * @returns
 */
const CustomPage = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='CustomPageLayout' {...props} />
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
