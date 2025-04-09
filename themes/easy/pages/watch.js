/*
* 标签列表
* @param {*} props
* @returns
*/
import { motion } from 'framer-motion'
import Link from 'next/link'
const CustomePageWatch = (props) => {

const url = 'https://watch.cwy666.eu.org'
 return <div>
    <motion.div className='bg-white dark:bg-hexo-black-gray px-10 py-10 shadow h-full'>
            <Link
                href={url}
                passHref
                className="text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white menu-link"
            >
                {'原始站点 '}
                <i className="fas fa-angle-double-right text-sm" />
            </Link>
            <iframe ref={null} src={url} style={{ height: '1000px', width: '100%' }}>

            </iframe>
    </motion.div>
   </div>
}

export default CustomePageWatch