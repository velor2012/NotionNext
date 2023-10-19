import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Logo = props => {
  const { siteInfo, className } = props
  const variants = {
    show: {
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.07,
        delayChildren:  0.5,
        staggerDirection: 1,
      }
    },
    hidden: {
      x: -1000,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        delayChildren:  0.5,
        staggerDirection: -1
      }
    }
  }
  return (
        <Link href='/' passHref legacyBehavior>
            <div className={'flex flex-col justify-center items-center cursor-pointer bg-black dark:bg-gray-800 space-y-3 font-bold ' + className}>
                <motion.div variants={variants}
                    className='font-serif text-xl text-white'> {siteInfo?.title}</motion.div>
                <motion.div variants={variants}
                    className='text-sm text-gray-300 font-light text-center'> {siteInfo?.description}</motion.div>
            </div>
        </Link>
  )
}
export default Logo
