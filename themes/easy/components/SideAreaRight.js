import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import React from 'react'
import Card from './Card'
import CategoryGroup from './CategoryGroup'
import TagGroups from './TagGroups'
import CONFIG from '../config'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import Announcement from './Announcement'
import LatestPostsGroup from './LatestPostsGroup'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
const NextRecentComments = dynamic(() => import('./NextRecentComments'))

/**
 * 侧边平铺
 * @param tags
 * @param currentTag
 * @param post
 * @param categories
 * @param currentCategory
 * @returns {JSX.Element}
 * @constructor
 */
const SideAreaRight = props => {
  const {
    tagOptions,
    currentTag,
    slot,
    categoryOptions,
    currentCategory,
    notice,
    latestPosts
  } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const announcementVisible = notice && Object.keys(notice).length > 0

  const variants = {
    show: {
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.07,
        staggerDirection: 1
      }
    },
    hidden: {
      x: 1000,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    exit:{
        opacity: 0
    }
  }

  return (
    <motion.aside
      id="right"
      initial="hidden"
      animate="show"
      variants={variants}
      className={
        (BLOG.LAYOUT_SIDEBAR_REVERSE ? 'mr-4' : 'ml-4') +
        ' space-y-4 hidden xl:block flex-col w-60 relative z-10'
      }
      exit="exit"
    >
      <LayoutGroup id="sideAreaRight">
        {CONFIG.RIGHT_AD && (
          <Card  layout variants={variants} className="mb-2">
            {/* 展示广告  */}
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-adtest="on"
              data-ad-client="ca-pub-2708419466378217"
              data-ad-slot="8807314373"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </Card>
        )}

        <div className="sticky top-0 space-y-4 w-full">
          <AnimatePresence>
            {announcementVisible && (
              <Card key={1} layout variants={variants} exit="exit" className="mb-2">
                <Announcement post={notice} />
              </Card>
            )}

            {CONFIG.RIGHT_LATEST_POSTS && (
              <Card key={2} layout>
                <LatestPostsGroup latestPosts={latestPosts} />
              </Card>
            )}
            {slot}

            {/* 分类  */}
            {CONFIG.RIGHT_CATEGORY_LIST &&
              router.asPath !== '/category' &&
              categoryOptions && (
                <Card key={3} layout variants={variants} exit="exit" className="mb-2">
                  <div className="text-sm px-2 flex flex-nowrap justify-between font-light">
                    <div className="pb-2 text-gray-600 dark:text-gray-300">
                      <i className="mr-2 fas fa-th-list" />
                      {locale.COMMON.CATEGORY}
                    </div>
                    <Link
                      href={'/category'}
                      passHref
                      className="text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer"
                    >
                      {locale.COMMON.MORE}{' '}
                      <i className="fas fa-angle-double-right" />
                    </Link>
                  </div>
                  <CategoryGroup
                    currentCategory={currentCategory}
                    categories={categoryOptions}
                  />
                </Card>
              )}

            {CONFIG.RIGHT_TAG_LIST &&
              router.asPath !== '/tag' &&
              tagOptions && (
                <Card key={4} layout variants={variants} exit="exit">
                  <div className="text-sm pb-1 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200">
                    <div className="text-gray-600 dark:text-gray-200">
                      <i className="mr-2 fas fa-tag" />
                      {locale.COMMON.TAGS}
                    </div>
                    <Link
                      href={'/tag'}
                      passHref
                      className="text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer"
                    >
                      {locale.COMMON.MORE}{' '}
                      <i className="fas fa-angle-double-right" />
                    </Link>
                  </div>
                  <div className="px-2 pt-2">
                    <TagGroups tags={tagOptions} currentTag={currentTag} />
                  </div>
                </Card>
              )}

            {BLOG.COMMENT_WALINE_SERVER_URL && BLOG.COMMENT_WALINE_RECENT && (
              <Card key={5} layout variants={variants} exit="exit">
                <div className="text-sm pb-1 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200">
                  <div className="text-gray-600 dark:text-gray-200">
                    <i className="mr-2 fas fa-tag" />
                    {locale.COMMON.RECENT_COMMENTS}
                  </div>
                </div>
                <div className="px-2 pt-2">
                  <NextRecentComments />
                </div>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </motion.aside>
  )
}
export default SideAreaRight
