import throttle from 'lodash.throttle'
import { useCallback, useEffect } from 'react'
import CONFIG from '../config'

let windowTop = 0
let stickyTagTopContainer = null

/**
 * 标签组导航条，默认隐藏仅在移动端显示
 * @param tags
 * @returns {JSX.Element}
 * @constructor
 */
const StickyBar = ({ children }) => {
  // 滚动页面时导航条样式调整
  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY
    stickyTagTopContainer = stickyTagTopContainer || document.querySelector('#sticky-bar .tag-top-container')
    const isDirectionChange = (scrollS - 10) * (windowTop - 10) > 0
    if(isDirectionChange) {
        windowTop = scrollS
        return
    }

    if(scrollS > 10 && stickyTagTopContainer){
        stickyTagTopContainer && stickyTagTopContainer.classList.replace('shadow-0', 'shadow-md')
    }else{
        stickyTagTopContainer && stickyTagTopContainer.classList.replace('shadow-md', 'shadow-0')
    }
    windowTop = scrollS
  }, 200), [])

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    scrollTrigger()
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  if (!children) return <></>

  return (
    <div id='sticky-bar' className='sticky flex-grow justify-center top-0 duration-500 z-10 pb-16 mb-2'>
      <div className='tag-top-container bg-white rounded-md dark:bg-hexo-black-gray px-5 absolute shadow-0 duration-500 w-full scroll-hidden'>
        <div id='tag-container' className="md:pl-3 overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default StickyBar
