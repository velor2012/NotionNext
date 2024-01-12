import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { useImperativeHandle, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../lib/themeContextProvider'
import { siteConfig } from '@/lib/config'
import AlgoliaSearchModal from '@/components/AlgoliaSearchModal'
let lock = false

export default function SearchInput({ currentTag, keyword, cRef }){
  const { locale } = useGlobal()
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const { searchModal } = useTheme()
  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

    // 展示搜索框
    const toggleShowSearchInput = () => {
        debugger
        if (siteConfig('ALGOLIA_APP_ID')) {
            debugger
            searchModal.current.openSearch()
        }
    }

  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(r => {
        setLoadingState(false)
      })
      // location.href = '/search/' + key
    } else {
      router.push({ pathname: '/' }).then(r => {
      })
    }
  }
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) { // 回车
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) { // ESC
      cleanSearch()
    }
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }
  function lockSearchInput() {
    lock = true
  }

  function unLockSearchInput() {
    lock = false
  }
  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = (val) => {
    if (lock) {
      return
    }
    searchInputRef.current.value = val
    if (val) {
      setShowClean(true)
    } else {
      setShowClean(false)
    }
  }

  return <motion.div
        initial={{ y: -200}}
        animate={{ y: 0, transitionDuration: 0.5}}
        className='flex w-full bg-transparent'>
        <input
            ref={searchInputRef}
            type='text'
            placeholder={currentTag ? `${locale.SEARCH.TAGS} #${currentTag}` : `${locale.SEARCH.ARTICLES}`}
            className={'outline-none w-full  text-sm pl-4 transition focus:shadow-lg dark:focus:bg-gray-600 font-light leading-10 text-black bg-gray-100 dark:bg-gray-800 dark:text-white'}
            onKeyUp={handleKeyUp}
            onCompositionStart={lockSearchInput}
            onCompositionUpdate={lockSearchInput}
            onCompositionEnd={unLockSearchInput}
            onChange={e => updateSearchKey(e.target.value)}
            onClick={toggleShowSearchInput}
            defaultValue={keyword || ''}
        />

        <div className='-ml-8 cursor-pointer float-right items-center justify-center py-2'
            onClick={handleSearch}>
            <i className={`hover:text-black transform duration-200 text-gray-500 cursor-pointer fas ${onLoading ? 'fa-spinner animate-spin' : 'fa-search'}`} />
        </div>

        {(showClean &&
            <div className='-ml-12 cursor-pointer float-right items-center justify-center py-2'>
                <i className='hover:text-black transform duration-200 text-gray-400 cursor-pointer fas fa-times' onClick={cleanSearch} />
            </div>
        )}

        {/* 搜索框 */}
        <AlgoliaSearchModal cRef={searchModal}/>
    </motion.div>
}

