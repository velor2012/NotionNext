import InfoCard from './InfoCard'
import { MenuList } from './MenuList'
import Toc from './Toc'
import { useGlobal } from '@/lib/global'
import React from 'react'
// import Tabs from '@/components/Tabs'
import Tabs from './Tabs'
import Logo from './Logo'
import Card from './Card'
import { siteConfig } from '@/lib/config'
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
  const { post, slot } = props
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

  return <motion.aside initial="hidden" animate="show"  variants={variants} id='left' className={(JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE')) ? 'ml-4' : 'mr-4') + ' hidden lg:block flex-col w-60 z-20 relative'}>

        <motion.section
            className='w-60'>
            {/* 菜单 */}
            <section variants={variants} className=' rounded-md shadow hidden lg:block mb-5 pb-4 bg-white dark:bg-hexo-black-gray hover:shadow-xl duration-200'>
                <Logo className='h-32 rounded-t-md' {...props} />
                <div className='pt-2 px-2 font-sans'>
                    <MenuList allowCollapse={true} {...props} />
                </div>

            </section>

        </motion.section>

        <motion.div  className='sticky top-14 hidden lg:block'>
            <Card variants={variants}>
                <Tabs>
                    {showToc && (
                        <div key={locale.COMMON.TABLE_OF_CONTENTS} className='dark:text-gray-400 text-gray-600 bg-white dark:bg-hexo-black-gray duration-200'>
                            <Toc toc={post.toc} />
                        </div>
                    )}

                    <div key='about'className='bg-white dark:bg-hexo-black-gray duration-200 py-6'>
                        <InfoCard {...props} />
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
