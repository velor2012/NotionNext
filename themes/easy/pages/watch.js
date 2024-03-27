/*
* 标签列表
* @param {*} props
* @returns
*/
import { useGlobal } from '@/lib/global'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
const CustomePageWatch = (props) => {
 const { locale, postCount } = useGlobal()
 const iframeRef = useRef(null)

const url = 'https://watch.cwy666.eu.org'
 return <div>
    <motion.div 
        key={locale.NAV.ABOUT} className='bg-white dark:bg-hexo-black-gray px-10 py-10 shadow h-full'>
            <Link
                href={url}
                passHref
                className="text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer"
            >
                {'原始站点 '}
                <i className="fas fa-angle-double-right text-sm" />
            </Link>
            <iframe ref={iframeRef} src={url} style={{ height: '1000px', width: '100%' }}>

            </iframe>
    </motion.div>
   </div>
}

export default CustomePageWatch