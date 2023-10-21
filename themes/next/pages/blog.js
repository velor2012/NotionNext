/*
* 标签列表
* @param {*} props
* @returns
*/
import { useGlobal } from '@/lib/global'
const LayoutAboutBlog = (props) => {
 const { locale } = useGlobal()
 return <div>
       <div className='bg-white dark:bg-hexo-black-gray px-10 py-10 shadow h-full'>
           <div className='dark:text-gray-200 mb-5'><i className='fas fa-tags mr-4' />{locale.COMMON.TAGS}:</div>
           <div id='tags-list' className='duration-200 flex flex-wrap'>
               HELLO
           </div>
       </div>
   </div>
}

export default LayoutAboutBlog