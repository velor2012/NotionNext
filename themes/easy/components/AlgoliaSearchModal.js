import { useState, useImperativeHandle, useRef, useEffect, Fragment } from 'react'
import algoliasearch from 'algoliasearch'
import replaceSearchResult from '@/components/Mark'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash/throttle'
import { siteConfig } from '@/lib/config'
import { useHotkeys } from 'react-hotkeys-hook';
import { motion } from 'framer-motion'
import React from 'react'
const ShortCutActions = [
  {
    key: '↑ ↓',
    action: '选择'
  },
  {
    key: 'Enter',
    action: '跳转'
  },
  {
    key: 'Esc',
    action: '关闭'
  }

]

/**
 * 结合 Algolia 实现的弹出式搜索框
 * 打开方式 cRef.current.openSearch()
 * https://www.algolia.com/doc/api-reference/search-api-parameters/
 */
export default function AlgoliaSearchModal({ cRef }) {
  const [searchResults, setSearchResults] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  const [totalHit, setTotalHit] = useState(0)
  const [useTime, setUseTime] = useState(0)
  const inputRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useHotkeys('ctrl+k', (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  })
  // 方向键调整选中
  useHotkeys('down', (e) => {
    e.preventDefault()
    if (activeIndex < searchResults.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }, { enableOnFormTags: true })
  useHotkeys('up', (e) => {
    e.preventDefault()
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }, { enableOnFormTags: true })
  // esc关闭
  useHotkeys('esc', (e) => {
    e.preventDefault()
    setIsModalOpen(false)
  }, { enableOnFormTags: true })
  // 跳转Search结果
  const onJumpSearchResult = () => {
    if (searchResults.length > 0) {
      window.location.href = `${siteConfig('SUB_PATH', '')}/${searchResults[activeIndex].slug}`
    }
  }
  // enter跳转
  useHotkeys('enter', (e) => {
    if (searchResults.length > 0) {
      onJumpSearchResult()
    }
  }, { enableOnFormTags: true })

  const resetSearch = () => {
    setActiveIndex(0)
    setKeyword('')
    setSearchResults([])
    setUseTime(0)
    setTotalPage(0)
    setTotalHit(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      resetSearch()
    }
  }, [isModalOpen])
  /**
     * 对外暴露方法
     */
  useImperativeHandle(cRef, () => {
    return {
      openSearch: () => {
        setIsModalOpen(true)
      }
    }
  })

  const client = algoliasearch(siteConfig('ALGOLIA_APP_ID'), siteConfig('ALGOLIA_SEARCH_ONLY_APP_KEY'))
  const index = client.initIndex(siteConfig('ALGOLIA_INDEX'))

  /**
   * 搜索
   * @param {*} query
   */
  const handleSearch = async (query, page) => {
    setKeyword(query)
    setPage(page)
    setSearchResults([])
    setUseTime(0)
    setTotalPage(0)
    setTotalHit(0)
    setActiveIndex(0)
    if (!query || query === '') {
      return
    }
    setIsLoading(true)
    try {
      const res = await index.search(query, { page, hitsPerPage: 10 })
      const { hits, nbHits, nbPages, processingTimeMS } = res
      setUseTime(processingTimeMS)
      setTotalPage(nbPages)
      setTotalHit(nbHits)
      setSearchResults(hits)
      setIsLoading(false)
      const doms = document.getElementById('search-wrapper').getElementsByClassName('replace')

      setTimeout(() => {
        replaceSearchResult({
          doms,
          search: query,
          target: {
            element: 'span',
            className: 'text-blue-600 font-bold border-black dark:border-white border-b border-dashed'
          }
        })
      }, 200) // 延时高亮
    } catch (error) {
      console.error('Algolia search error:', error)
    }
  }

  // 定义节流函数，确保在用户停止输入一段时间后才会调用处理搜索的方法
  const throttledHandleInputChange = useRef(throttle((query, page = 0) => {
    handleSearch(query, page);
  }, 1000));

  // 用于存储搜索延迟的计时器
  const searchTimer = useRef(null);

  // 修改input的onChange事件处理函数
  const handleInputChange = (e) => {
    const query = e.target.value;

    // 如果已经有计时器在等待搜索，先清除之前的计时器
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    // 设置新的计时器，在用户停止输入一段时间后触发搜索
    searchTimer.current = setTimeout(() => {
      throttledHandleInputChange.current(query);
    }, 800);
  };

  /**
   * 切换页码
   * @param {*} page
   */
  const switchPage = (page) => {
    throttledHandleInputChange.current(keyword, page)
  }

  /**
   * 关闭弹窗
   */
  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (!siteConfig('ALGOLIA_APP_ID')) {
    return <></>
  }
  return (
    <div
      id="search-wrapper"
      className={`${isModalOpen ? 'opacity-100' : 'invisible opacity-0 pointer-events-none'
        } z-30 fixed h-screen w-screen left-0 top-0 sm:mt-12 flex items-start justify-center mt-0`}
    >
      {/* 模态框 */}
      <div
        className={`${
          isModalOpen ? 'opacity-100' : 'invisible opacity-0 translate-y-10'
        } flex flex-col justify-between w-full min-h-[10rem] max-w-xl dark:bg-hexo-black-gray dark:border-gray-800 bg-white p-5 rounded-lg z-50 shadow border hover:border-gray-600 duration-300 transition-all `}
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl dark:text-white text-hexo-black-gray font-bold">搜索</div>
          <div>
            <i
              className="text-gray-400 fa-solid fa-xmark p-1 cursor-pointer hover:text-gray-800 dark:hover:text-white hover:rotate-90 hover:scale-125 transform duration-200"
              onClick={closeModal}
            ></i>
          </div>
        </div>

        <input
          type="text"
          placeholder="在这里输入搜索关键词..."
          onChange={e => handleInputChange(e)}
          className="text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-600 outline-gray-700 w-full px-4 my-2 py-1 mb-4 border rounded-md"
          ref={inputRef}
        />

        {/* 标签组 */}
        <div className="mb-4">
          <TagGroups closeModal={closeModal}/>
        </div>
        {
          searchResults.length === 0 && keyword && !isLoading && (
            <div>
              <p className=" text-slate-600 text-center my-4 text-base"> 无法找到相关结果
                <span
                  className='font-semibold'
                >&quot;{keyword}&quot;</span></p>
            </div>
          )
        }
        <ul className='flex-1 overflow-auto'>
          {searchResults.map((result, index) => (
            <li key={result.objectID}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => onJumpSearchResult(index)}
              className={`cursor-pointer replace my-2 p-2 duration-100 
              rounded-lg
              ${activeIndex === index ? 'bg-[#c1802b] dark:bg-yellow-600' : ''}`}>
              <a
                className={`${activeIndex === index ? ' text-white' : ' text-black dark:text-gray-300 '}`}
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
        <Pagination totalPage={totalPage} page={page} switchPage={switchPage} />
        <div className='flex items-center justify-between mt-2 sm:text-sm text-xs dark:text-gray-300'>
          {totalHit === 0 && (<div className='flex items-center'>
            {
              ShortCutActions.map((action, index) => {
                return <Fragment key={index}><div className='border-gray-300 dark:text-gray-300 text-gray-600 px-2 rounded border inline-block'>{action.key}</div>
                  <span className='ml-2 mr-4  text-gray-600 dark:text-gray-300'>{action.action}</span></Fragment>
              })
            }
          </div>)
          }
          <div>
            {totalHit > 0 && (
              <p>
                共搜索到 {totalHit} 条结果，用时 {useTime} 毫秒
              </p>
            )}
          </div>
          <div className="text-gray-600 dark:text-gray-300  text-right">
            <span >
              <i className="fa-brands fa-algolia"></i> Algolia 提供搜索服务
            </span>
          </div>
        </div>

      </div>

      {/* 遮罩 */}
      <div
        onClick={closeModal}
        className="z-30 fixed top-0 left-0 w-full h-full flex items-center justify-center glassmorphism"
      />
    </div>
  )
}

/**
 * 标签组
 */
function TagGroups({closeModal}) {
    const { tagOptions } = useGlobal()
    //  获取tagOptions数组前十个
    const firstTenTags = tagOptions?.slice(0, 10)
    // 初始化数组,元素个数等于firstTenTags个数
    const [displayArrs, setArr] = useState(new Array(firstTenTags?.length).fill(false));
    return <div id='tags-group' className='dark:border-gray-700 space-y-2'>
              {
                  firstTenTags?.map((tag, index) => {
                    return <Link passHref
                          key={index}
                          href={`/tag/${encodeURIComponent(tag.name)}`}
                          onClick={closeModal}
                          className={'cursor-pointer inline-block whitespace-nowrap mr-2 transition-all duration-100'}>
                          <div className={' flex items-center text-black dark:text-gray-300 rounded-lg px-2 py-0.5 duration-150 transition-all relative'}>
                              { displayArrs[index] &&
                                  <motion.div
                                  layoutId='TagItemTag'
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  className=' border-[#f7ecde] rounded-md absolute top-0 left-0 w-full h-full z-[-1] dark:bg-[#c1802b] bg-[#f7ecde]'>
  
                                  </motion.div>
                              }
                              <div className='z-0 flex items-center'
                                  onMouseEnter={() => {
                                      let arrs = new Array(firstTenTags?.length).fill(false)
                                      arrs[index] = true;
                                      setArr(arrs);
                                  }}
                              >
                                  <div className='text-lg'>{tag.name} </div>{tag.count ? <sup className='relative ml-1'>{tag.count}</sup> : <></>}
                              </div>
                          </div>
  
                      </Link>
                  })
              }
          </div>
  }

/**
 * 分页
 * @param {*} param0
 */
function Pagination(props) {
  const { totalPage, page, switchPage } = props
  if (totalPage <= 0) {
    return <></>
  }
  const pagesElement = []

  for (let i = 0; i < totalPage; i++) {
    const selected = page === i
    pagesElement.push(getPageElement(i, selected, switchPage))
  }
  return <div className='flex space-x-1 w-full justify-center py-1 '>
        {pagesElement.map(p => p)}
  </div>
}

/**
 * 获取分页按钮
 * @param {*} i
 * @param {*} selected
 */
function getPageElement(i, selected, switchPage) {
  return <div key={i} onClick={() => switchPage(i)} className={`${selected ? 'font-bold text-black border-t-2 border-gray-400' : 'hover:text-black hover:font-bold'} rounded-md bg-hexo-background-gray hover:border-t-2 
  border-white  hover:border-gray-400 justify-center flex items-center cursor-pointer duration-200 transition-all hover:font-bold  w-6 h-6 `}>
    {i + 1}
  </div>
}
