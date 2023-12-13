import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import Router from 'next/router'
import React from 'react'
import SocialButton from './SocialButton'
import { motion } from 'framer-motion'
import CONFIG from '../config'
const InfoCard = (props) => {
  const { siteInfo } = props
  const [isHover, setIsHover] = React.useState(false)
  const bgUrl = CONFIG.AVATAR_BORDER_URL
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
    </div>
  </>
}

export default InfoCard
