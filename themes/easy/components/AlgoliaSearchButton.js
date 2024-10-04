
import { useTheme } from '../lib/themeContextProvider'
import { siteConfig } from '@/lib/config'
import React from 'react'
const AlgoliaSearchButton = (props) => {
  const { searchModal } = useTheme()
  const USE_ALGOLIA = siteConfig('ALGOLIA_APP_ID')
    // 展示搜索框
    const toggleShowAlgoliaSearchInput = () => {
        if (USE_ALGOLIA) {
            searchModal.current.openSearch()
        }
    }

  return <div className={`${props.className || ''} z-10 duration-200 text-lg cursor-pointer py-1.5 px-1`}>
    <i id='algoliaSearchButton' className='hover:scale-125 transform duration-200 fas fa-search'
       onClick={toggleShowAlgoliaSearchInput} />
  </div>
}
export default AlgoliaSearchButton
