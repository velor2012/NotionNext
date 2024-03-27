import { useGlobal } from '@/lib/global'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Card from './Card'
import TagItemMini from './TagItemMini'
import CONFIG from '../config'
import NotionPage from '@/components/NotionPage'
import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { formatDateFmt } from '@/lib/formatDate'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'
const BlogPostCard = ({ post, showSummary }) => {
  const { locale } = useGlobal()
  const showPreview = siteConfig('POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  
  const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`
  const variants = {
    show: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        staggerDirection: 1
      }
    },
    hidden: {
      x: -200,
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    hiddenRight: {
        x: 200,
        opacity: 0,
        transition: {
          staggerChildren: 0.05,
          staggerDirection: -1
        }
      }
  }

  return (
    <Card
      initial="hidden"
      whileInView="show"
      variants={variants}
      className="w-full"
    >
      <div
        key={post.id}
        className="flex flex-col-reverse justify-between duration-300"
      >
        <div className="lg:p-8 p-4 flex flex-col w-full">
            <motion.div             
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={variants}>
                <Link
                    href={url}
                    passHref
                    className={`cursor-pointer text-3xl ${
                    showPreview ? 'text-center' : ''
                    } leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400`}
                >
                    <NotionIcon icon={post.pageIcon} />{' '}
                    <span className="menu-link">{post.title}</span>
                </Link>
            </motion.div>

          <motion.div
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true }}
            variants={variants}
            className={`flex mt-2 items-center ${
              showPreview ? 'justify-center' : 'justify-start'
            } flex-wrap dark:text-gray-500 text-gray-400 `}
          >
            <div>
              {post.category && (
                <>
                  <Link
                    href={`/category/${post.category}`}
                    passHref
                    className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer font-light text-sm transform"
                  >
                    <i className="mr-1 fas fa-folder" />
                    <span className="menu-link">{post.category}</span>
                  </Link>
                  <span className="mx-2">|</span>
                </>
              )}
              <Link
                href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                passHref
                className="hover:text-blue-500 dark:hover:text-blue-400 font-light cursor-pointer text-sm leading-4 mr-3"
              >
                <span className="menu-link">{post.date?.start_date}</span>
              </Link>
            </div>
            <TwikooCommentCount
              post={post}
              className="hover:text-blue-500 dark:hover:text-blue-400 hover:underline text-sm"
            />

            <div className="hover:text-blue-500 dark:hover:text-blue-400  md:flex-nowrap flex-wrap md:justify-start inline-block">
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </motion.div>

          {(!showPreview || showSummary) && !post.results && (
            <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={variants}
              className="mt-4 mb-12 text-gray-700 dark:text-gray-300 text-sm font-light leading-7"
            >
              {post.summary}
            </motion.p>
          )}

          {/* 搜索结果 */}
          {post.results && (
            <p className="line-clamp-4 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7">
              {post.results.map((r, index) => (
                <span key={index}>{r}</span>
              ))}
            </p>
          )}

          {showPreview && post?.blockMap && (
            <motion.div
                initial="hiddenRight"
                whileInView="show"
                viewport={{ once: true }}
                variants={variants}
              className="overflow-ellipsis truncate"
            >
              <NotionPage post={post} />
            </motion.div>
          )}

          <motion.div
           className="flex justify-end border-t pt-8 border-dashed">
                <Link
                href={url}
                className="hover:bg-opacity-100 hover:scale-105 transform duration-500 rounded-md  p-3 text-white bg-gray-800 cursor-pointer"
            >
                <span className="article-link">{locale.COMMON.ARTICLE_DETAIL}</span>
              
              <i className="ml-1 fas fa-angle-right" />
            </Link>
          </motion.div>
        </div>

        {siteConfig('POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail && (
          <Link href={url} passHref legacyBehavior>
            <div className="h-72 w-full relative duration-200 cursor-pointer transform overflow-hidden">
              <Image
                className={`hover:scale-105 transform duration-500 ${post.id}-img`}
                src={post?.pageCoverThumbnail}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                loading="lazy"
              />
            </div>
          </Link>
        )}
      </div>
    </Card>
  )
}

export default BlogPostCard
