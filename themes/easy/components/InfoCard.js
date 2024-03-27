import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import Router from 'next/router'
import React from 'react'
import SocialButton from './SocialButton'
import { motion } from 'framer-motion'
import CONFIG from '../config'
import { useTheme } from '../lib/themeContextProvider'
import { useGlobal } from '@/lib/global'
const InfoCard = (props) => {
  const { siteInfo, postCount } = props
  const { activeNum } = useTheme()
  const { locale } = useGlobal()
  const [isHover, setIsHover] = React.useState(false)
  const bgUrl = CONFIG.NEXT_AVATAR_BORDER_URL
  return <>
    <div className='flex flex-col items-center justify-center '>
        <motion.div
        onHoverStart={()=>{setIsHover(true)}}
        onHoverEnd={()=>{setIsHover(false)}}
        className='cursor-pointer relative' onClick={ () => { Router.push('/') }}>
            <motion.div
                animate={isHover ? {
                    scale: 1.2,
                    transition: {
                        duration: 0.4
                    }
                } : {}}
            className=' relative z-10'>
                <LazyImage src={siteInfo?.icon} className='rounded-full' width={120} alt={siteConfig('AUTHOR')}/>
            </motion.div>
            {
            bgUrl && (
            <motion.div
                initial={false}
                animate={isHover ? {
                    height: 100,
                    width: 120,
                    bottom: -2,
                    transition: {
                        duration: 0.4
                    }
                } : {}}
                className=' scale-150 absolute z-0 bottom-0'>
                    <LazyImage src={bgUrl} className=' w-full h-full rounded-full' width={120} alt={siteConfig('AUTHOR')}/>
                </motion.div>
            )}
        </motion.div>
        <div className='text-2xl font-serif dark:text-white py-2 hover:scale-105 transform duration-200'>{siteConfig('AUTHOR')}</div>
        <div className='font-light dark:text-white py-2 hover:scale-105 transform duration-200 text-center'>{siteConfig('BIO')}</div>
        <SocialButton/>

        {/* statistic data */}
        <div className='mt-2 text-center dark:text-gray-300 font-light text-xs'>
            <span className='px-1 '>
                <strong className='font-medium mr-1'>{postCount}</strong>{locale.COMMON.POSTS}</span>
            <span className='px-1 busuanzi_container_site_uv hidden'>
                | <strong className='pl-1 busuanzi_value_site_uv font-medium mr-1' />{locale.COMMON.VISITORS}</span>
            {/* <span className='px-1 busuanzi_container_site_pv hidden'>
| <strong className='pl-1 busuanzi_value_site_pv font-medium'/>{locale.COMMON.VIEWS}</span> */}
        </div>

        <div className='mt-2 ml-2 h-6 bg-red flex justify-center items-center text-xs dark:text-white'>
            <span className=' mr-2 leading-[16px] block bg-repeat bg-green-400 bg-origin-padding bg-left-top bg-clip-border rounded-b bg-auto bg-scroll w-[10px] h-[10px] rounded-t'/>
            在线人数： {activeNum}
        </div>
    </div>
  </>
}

export default InfoCard
