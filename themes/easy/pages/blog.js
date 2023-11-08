/*
* 标签列表
* @param {*} props
* @returns
*/
import { useGlobal } from '@/lib/global'
import InfoCard from '../components/InfoCard'
import { motion } from 'framer-motion'
const LayoutAboutBlog = (props) => {
 const { locale, postCount } = useGlobal()
 return <div>
    <motion.div 
        key={locale.NAV.ABOUT} className='bg-white dark:bg-hexo-black-gray px-10 py-10 shadow h-full'>
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
    </motion.div>
   </div>
}

export default LayoutAboutBlog