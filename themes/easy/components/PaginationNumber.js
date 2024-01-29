import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 数字翻页插件
 * @param page 当前页码
 * @param showNext 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = currentPage !== totalPage
  const pagePrefix = router.asPath.split('?')[0].replace(/\/page\/[1-9]\d*/, '').replace(/\/$/, '')
  const pages = generatePages(pagePrefix, page, currentPage, totalPage)

  return (
    <div
        className=" my-5 flex justify-center items-end font-medium text-black duration-200 transition-all py-3 space-x-2">
        {/* 上一页 */}
        <Link
          href={{
            pathname:
                  currentPage - 1 === 1
                    ? `${pagePrefix}/`
                    : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          legacyBehavior>
            <div
                rel="prev"
                className={`${currentPage === 1 ? 'invisible' : 'block'
                    } rounded-md bg-white hover:border-t-2 border-white  hover:border-gray-400 w-8 h-8 justify-center flex items-center cursor-pointer duration-200 transition-all hover:font-bold`}
            >
                <i className="fas fa-angle-left" />
            </div>
        </Link>

        {pages}

        {/* 下一页 */}
        <Link
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          legacyBehavior>
            <div
                rel="next"
                className={`${+showNext ? 'block' : 'invisible'
                    } rounded-md bg-white  hover:border-t-2 border-white  hover:border-gray-400 w-8 h-8 justify-center flex items-center cursor-pointer duration-200 transition-all hover:font-bold`}
            >
                <i className="fas fa-angle-right" />
            </div>
        </Link>
    </div>
  )
}

function getPageElement(pagePrefix, page, currentPage) {
  return (
    (<Link
      href={page === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${page}`}
      key={page}
      passHref
      className={
          (page + '' === currentPage + ''
            ? 'font-bold bg-gray-400 dark:bg-gray-800 text-white '
            : ' bg-white hover:border-t-2 duration-200 transition-all border-white') +
          ' rounded-md border-white  hover:border-gray-400 cursor-pointer w-8 h-8 justify-center flex items-center font-light hover:font-bold'
      }>

      {page}

    </Link>)
  )
}
function generatePages(pagePrefix, page, currentPage, totalPage) {
  const pages = []
  const groupCount = 7 // 最多显示页签数
  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(pagePrefix, i, page))
    }
  } else {
    pages.push(getPageElement(pagePrefix, 1, page))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) {
      startPage = 2
    }
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    if (startPage > 2) {
      pages.push(<div key={-1} className='select-none'>... </div>)
    }

    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(pagePrefix, startPage + i, page))
      }
    }

    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(<div key={-2} className='select-none'>... </div>)
    }

    pages.push(getPageElement(pagePrefix, totalPage, page))
  }
  return pages
}
export default PaginationNumber