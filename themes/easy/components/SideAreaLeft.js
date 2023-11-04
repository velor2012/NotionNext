import InfoCard from './InfoCard'
import { MenuList } from './MenuList'
import Toc from './Toc'
import { useGlobal } from '@/lib/global'
import React from 'react'
// import Tabs from '@/components/Tabs'
import Tabs from './Tabs'
import Logo from './Logo'
import Card from './Card'
import BLOG from '@/blog.config'
import Live2D from '@/components/Live2D'
import { motion } from 'framer-motion'
/**
 * 侧边平铺
 * @param tags
 * @param currentTag
 * @param post
 * @param currentSearch
 * @returns {JSX.Element}
 * @constructor
 */
const SideAreaLeft = props => {
  const { post, slot, postCount } = props
  const { locale } = useGlobal()
  const showToc = post && post.toc && post.toc.length > 1

  const variants = {
    show: {
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.07,
        staggerDirection: 1,
      }
    },
    hidden: {
      x: -1000,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  return <motion.aside initial="hidden" animate="show"  variants={variants} id='left' className={(BLOG.LAYOUT_SIDEBAR_REVERSE ? 'ml-4' : 'mr-4') + ' hidden lg:block flex-col w-60 z-20 relative'}>

        <motion.section
            className='w-60'>
            {/* 菜单 */}
            <section variants={variants} className=' rounded-md overflow-hidden shadow hidden lg:block mb-5 pb-4 bg-white dark:bg-hexo-black-gray hover:shadow-xl duration-200'>
                <Logo className='h-32' {...props} />
                <div className='pt-2 px-2 font-sans'>
                    <MenuList allowCollapse={true} {...props} />
                </div>

            </section>

        </motion.section>

        <motion.div  className='sticky top-4 hidden lg:block'>
            <Card variants={variants}>
                <Tabs>
                    {showToc && (
                        <div key={locale.COMMON.TABLE_OF_CONTENTS} className='dark:text-gray-400 text-gray-600 bg-white dark:bg-hexo-black-gray duration-200'>
                            <Toc toc={post.toc} />
                        </div>
                    )}

                    <div key={locale.NAV.ABOUT} className='mb-5 bg-white dark:bg-hexo-black-gray duration-200 py-6'>
                        <InfoCard {...props} />
                        <>
                            <div className='mt-2 text-center dark:text-gray-300 font-light text-xs'>
                                <span className='px-1 '>
                                    <strong className='font-medium'>{postCount}</strong>{locale.COMMON.POSTS}</span>
                                <span className='px-1 busuanzi_container_site_uv hidden'>
                                    | <strong className='pl-1 busuanzi_value_site_uv font-medium' />{locale.COMMON.VISITORS}</span>
                                {/* <span className='px-1 busuanzi_container_site_pv hidden'>
                | <strong className='pl-1 busuanzi_value_site_pv font-medium'/>{locale.COMMON.VIEWS}</span> */}
                            </div>
                        </>
                    </div>
                </Tabs>
            </Card>

            <motion.div  variants={variants} className='flex justify-center'>
                {slot}
                <Live2D />
            </motion.div>
        </motion.div>

    </motion.aside>
}
export default SideAreaLeft
