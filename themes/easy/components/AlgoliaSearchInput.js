import { useTheme } from '../lib/themeContextProvider'
import AlgoliaSearchModal from './AlgoliaSearchModal'
import React from 'react'
export default function AlgoliaSearchInput ({ cRef }) {
    const { searchModal } = useTheme()
    return (
        <AlgoliaSearchModal cRef={searchModal}/>
    )
}