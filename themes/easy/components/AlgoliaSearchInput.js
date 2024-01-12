import { useTheme } from '../lib/themeContextProvider'
import AlgoliaSearchModal from './AlgoliaSearchModal'

export default function AlgoliaSearchInput ({ cRef }) {
    const { searchModal } = useTheme()
    return (
        <AlgoliaSearchModal cRef={searchModal}/>
    )
}