import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import React from 'react'
import Card from './Card'
import CategoryGroup from './CategoryGroup'
import TagGroups from './TagGroups'
import CONFIG from '../config'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'
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
    tag: currentTag,
    category: currentCategory,
    slot,
    categoryOptions,
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
        opacity: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.05,
            staggerDirection: -1
          }
    }
  }

  return (
    <motion.aside
      id="right"
      initial="hidden"
      animate="show"
      variants={variants}
      className={
        (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE')) ? 'mr-4' : 'ml-4') +
        ' space-y-4 hidden xl:block flex-col w-60 relative z-10'
      }
      exit="exit"
    >
      {/* <LayoutGroup id="sideAreaRight"> */}
        {siteConfig('NEXT_RIGHT_AD', null, CONFIG) && (
          <Card  variants={variants} className="mb-2">
            {/* 展示广告  */}
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
            />
          </Card>
        )}

        <div className="sticky top-2 space-y-4 w-full">
          <AnimatePresence>
            {announcementVisible && (
              <Card key={1} variants={variants}  className="mb-2">
                <Announcement post={notice} />
              </Card>
            )}

            {siteConfig('NEXT_RIGHT_LATEST_POSTS', null, CONFIG) && (
              <Card key={2}  variants={variants}>
                <LatestPostsGroup latestPosts={latestPosts} />
              </Card>
            )}
            {slot}

            {/* 分类  */}
            {siteConfig('NEXT_RIGHT_CATEGORY_LIST', null, CONFIG) &&
              router.asPath !== '/category' &&
              categoryOptions && (
                <Card key={3} variants={variants} exit={variants.exit} className="mb-2">
                  <div className="text-sm pb-1 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200">
                    <div className="text-gray-600 dark:text-gray-200">
                      <i className="mr-2 fas fa-th-list" />
                      {locale.COMMON.CATEGORY}
                    </div>
                    <Link
                      href={'/category'}
                      passHref
                      className="text-gray-400 hover:text-black  dark:hover:text-white menu-link"
                    >
                      {locale.COMMON.MORE}{' '}
                      <i className="fas fa-angle-double-right" />
                    </Link>
                  </div>
                  <div className="px-2 pt-2">
                    <CategoryGroup
                        currentCategory={currentCategory}
                        categories={categoryOptions}
                    />
                  </div>
                </Card>
              )}

            {siteConfig('NEXT_RIGHT_TAG_LIST', null, CONFIG) &&
              router.asPath !== '/tag' &&
              tagOptions && (
                <Card key={4} variants={variants} exit={variants.exit}>
                  <div className="text-sm pb-1 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200">
                    <div className="text-gray-600 dark:text-gray-200">
                      <i className="mr-2 fas fa-tag" />
                      {locale.COMMON.TAGS}
                    </div>
                    <Link
                      href={'/tag'}
                      passHref
                      className="text-gray-400 hover:text-black  dark:hover:text-white menu-link"
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

            {siteConfig('COMMENT_WALINE_SERVER_URL') && siteConfig('COMMENT_WALINE_RECENT') && (
              <Card key={5} variants={variants} >
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
      {/* </LayoutGroup> */}
    </motion.aside>
  )
}
export default SideAreaRight
