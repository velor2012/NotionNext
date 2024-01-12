import { useTheme } from '../lib/themeContextProvider'
import AlgoliaSearchModal from '@/components/AlgoliaSearchModal'
const WarpSearchModal = ({ currentTag, keyword, cRef }) => {
  const { searchModal } = useTheme()

  return 
  (
  <AlgoliaSearchModal cRef={searchModal} {...props}/>
  )
}

export default WarpSearchModal
