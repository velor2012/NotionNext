import throttle from 'lodash.throttle'
import { useCallback, useEffect, useRef, useState } from 'react'
import Collapse from '@/components/Collapse'
import { MenuList } from './MenuList'
import SearchInput from './SearchInput'
import DarkModeButton from './DarkModeButton'
import AlgoliaSearchButton from './AlgoliaSearchButton'
import { siteConfig } from '@/lib/config'
import TranslateButton from './TranslateButton'
import { motion } from 'framer-motion'
import { useTheme } from '../lib/themeContextProvider'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const TopNav = (props) => {
  const { siteInfo, post } = props
  const collapseRef = useRef(null)

  const USE_ALGOLIA = siteConfig('ALGOLIA_APP_ID')
  const MENU_SEARCH = siteConfig('MENU_SEARCH')
  const NAV_TYPE = siteConfig('NAV_TYPE')

  const { isShowLogo, isShowTitle } = useTheme()

  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY
    if (scrollS >= windowTop && scrollS > 10) {
        const nav = document.querySelector('#sticky-nav')
        nav && nav.classList.replace('top-0', '-top-40')
        windowTop = scrollS
    } else {
      const nav = document.querySelector('#sticky-nav')
      nav && nav.classList.replace('-top-40', 'top-0')
      windowTop = scrollS
    }
  }, 200), [])

  // 监听滚动
  useEffect(() => {
    if (NAV_TYPE === 'autoCollapse') {
      scrollTrigger()
      window.addEventListener('scroll', scrollTrigger)
    }
    return () => {
      NAV_TYPE === 'autoCollapse' && window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  const [isOpen, changeShow] = useState(false)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  return (
        <div id='top-nav' className={`${NAV_TYPE !== 'normal' ? 'sticky' : 'relative'} w-full top-0 z-[25] transform duration-500`}>
            {/* 导航栏 */}
            <div id='sticky-nav'>
                <div className='w-full flex justify-between items-center p-1 bg-black dark:bg-gray-800 text-white rounded-b-sm'>
                    {/* 左侧LOGO 标题 */}
                    <motion.div
                    initial={{
                        opacity: 0,
                        y: -100,
                    }}
                    animate={{
                        opacity: isShowLogo ? 1 : 0,
                        y: isShowLogo ? 0 : -100,
                    }}
                    className='hidden lg:block font-serif text-xl text-white ml-12'> {siteInfo?.title}</motion.div>

                    <div className='flex flex-none flex-grow-0 lg:hidden'>
                        <div onClick={toggleMenuOpen} className='w-8 cursor-pointer'>
                            {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
                        </div>
                    </div>

                    <div className='min-w-[20%]'>
                        {
                            MENU_SEARCH && !USE_ALGOLIA &&
                            <SearchInput {...props} />
                        }
                        {
                            post && !!post.title &&
                            <motion.div
                            initial={{
                                opacity: 0,
                                y: -100,
                            }}
                            animate={{
                                opacity: isShowTitle ? 1 : 0,
                                y: isShowTitle ? 0 : -100,
                            }}
                            className='font-serif text-xl text-white text-center'> {post.title}</motion.div>
                        }
                    </div>

                    {/* 右侧功能 */}
                    <div className='mr-1 flex justify-end items-center text-sm space-x-4 font-serif dark:text-gray-200'>
                        <AlgoliaSearchButton/>
                        <AlgoliaSearchButton/>
                        <DarkModeButton />
                        <TranslateButton className='hidden md:block'/>
                    </div>
                </div>

                <Collapse className="lg:hidden" collapseRef={collapseRef} type='vertical' isOpen={isOpen}>
                    <MenuList onHeightChange={(param) => collapseRef.current?.updateCollapseHeight(param)} {...props} from='top' />
                </Collapse>
            </div>

        </div>)
}

export default TopNav
