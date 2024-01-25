import { useEffect, useState } from 'react'
import BlogPostArchive from './BlogPostArchive'
import { AnimatePresence, motion } from 'framer-motion'

const variants = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    hidden: {
        x: 100,
    },
    exit:{
        opacity: 0,
        x: -100,
        transition: {
            duration: 0.5
          }
    }
  }

const BlogPostArchiveList = props => {
  const { archivePosts } = props
  // 按五年的区间分组，页面上每页展示五年的数据
  const convertToArrs = (posts) => {
    debugger
    const sortedKeys = Object.keys(posts).sort();

    const result = sortedKeys.reduce((acc, key) => {
      const [year, month] = key.split('-');
      const groupIndex = Math.floor((parseInt(year) - 1) / 5);
    
      const groupKey = `${groupIndex * 5 + 1}-${groupIndex * 5 + 5}`;
    
      if (!acc[groupKey]) {
        acc[groupKey] = {};
      }
    
      acc[groupKey][key] = posts[key];
    
      return acc;
    }, []);
    return result;
  }
  
  const datas = convertToArrs(archivePosts)
  const [curKey, setCurKey] = useState(Object.keys(datas)[0])
  const [curPosts, setCurPosts] = useState([])
  const [curVariants, setCurVariants] = useState(variants)

  const chageDirection = (curInterval) => {
    if(curInterval >= curKey){
        curVariants.exit.x = -Math.abs(curVariants.exit.x)
        curVariants.hidden.x = Math.abs(curVariants.hidden.x)
    }else{
        curVariants.exit.x = Math.abs(curVariants.exit.x)
        curVariants.hidden.x = -Math.abs(curVariants.hidden.x)
    }
  }

  useEffect(() => {
    const k = Object.keys(datas)[0]
    setCurKey(k)
    setCurPosts(datas[k])
    console.log("curKey: ", curKey)
    console.log("datas[curKey]: ", datas[curKey])
  }, [])
  return (
    <>
        <div className='rounded-md bg-white dark:bg-hexo-black-gray px-10 pt-10 shadow h-full'>
            <div className='dark:text-gray-200 mb-5'><i className='fas fa-box-archive mr-4' />归档年份</div>
            <div id='archive-interval-list' className='duration-200 flex flex-wrap'>
                {
                    Object.keys(datas).map(curInterval => 
                        <motion.div 
                        key={curInterval}
                        className={`z-0 mr-2 p-2 ${curKey != curInterval ? 'hover:scale-110 duration-100 transform': ''} cursor-pointer 
                         border-black rounded-sm relative`} onClick={
                            () => {
                                chageDirection(curInterval)
                                setCurKey(curInterval)
                                setCurPosts(datas[curInterval])
                            }
                        }>
                            { curKey == curInterval &&
                                <motion.div
                                layoutId='ArchiveItemTag'
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                className=' border-[#f7ecde] rounded-md absolute top-0  left-0 w-full h-full z-[-1] bg-[#f7ecde]'>

                                </motion.div>
                            }
                            {curInterval}
                        </motion.div>
                    )
                }
            </div>
        </div>
        <div className=" min-h-screen rounded-md mb-10 pb-20 bg-white md:p-12 p-3 md:pt-0 pt-0 dark:bg-hexo-black-gray shadow-md min-h-full">
        <AnimatePresence mode='wait'>
            {datas[curKey] && Object.keys(curPosts).map(archiveTitle => (
                <motion.div
                initial="hidden" animate="show" variants={variants} exit="exit"
                key={archiveTitle}
                >
                    <BlogPostArchive
                    key={archiveTitle}
                    posts={curPosts[archiveTitle]}
                    archiveTitle={archiveTitle}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
        </div>
    </>
  )
}

export default BlogPostArchiveList
