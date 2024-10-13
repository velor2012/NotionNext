import dynamic from 'next/dynamic'
import { useState,useRef, useEffect } from "react"
import {useTheme, ThemeContextProvider } from './themeContextProvider'
import { isBrowser } from '@/lib/utils'
const TocDrawer = dynamic(() => import('../components/TocDrawer'), { ssr: false })
const TocDrawerButton = dynamic(() => import('../components/TocDrawerButton'), { ssr: false })
function useTocDrawer(props){
  // 悬浮抽屉
  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null
  const { post } = props


    const tocFloatSlot = <div className='block lg:hidden'>
        <TocDrawerButton {...props} onClick={() => {
            drawerRight?.current?.handleSwitchVisible()
            }} />
    </div>


  const myTocDrawer = (
    <div>
        {/* 悬浮目录按钮 */}
        {post && <div className='block toc-drawer lg:hidden'>
            <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
        </div>}
    </div>
  )
  return {myTocDrawer, tocFloatSlot}
}
export default useTocDrawer