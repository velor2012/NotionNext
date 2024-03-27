import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
const _404Svg = (props)=>{
    return (
        <div {...props}>
            <svg
            className=' w-full h-full'
            style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round'}}
            viewBox="0 0 512 512"
        >
            {Style()}
            <path
            d="M54.04 388.29c29.33 27.24 112.5 88.1 271.33 58 150.57-28.54 175.4-134.6 179.33-171.34 3.27-30.5 16.67-120.66-106.66-190.38-124.82-70.57-207.94 17.66-222 32.94-13.6 14.77-46.4 46.17-62 56-18 11.33-65.34 28-78.67 39.33-13.33 11.33-32 31.33-30 78s22.06 72.74 48.67 97.45Z"
            className="fill-white"
            />
            <path
            d="M248.54 364.76v41.33h33v-43.5l-33 2.17Z"
            className="fill-hexo-black-gray"
            />
            <g>
            <path d="M263.54 364.76v41.33h33v-43.5l-33 2.17Z" className="fill-white" />
            <path
                d="M263.54 364.76v41.33h33v-43.5l-33 2.17Z"
                className="fill-hexo-black-gray/50"
            />
            </g>
            <path
            d="m207.07 422.7 115.6-.2v-12.8c.06-3.48-1.4-5.54-4.4-5.8l-105.8-.4c-3.36 0-5.3 2.14-5.3 5.5l-.1 13.7Z"
            className="fill-hexo-black-gray"
            />
            <path
            d="m223.07 422.7 115.6-.2v-12.8c.06-3.48-1.4-5.54-4.4-5.8l-105.8-.4c-3.36 0-5.3 2.14-5.3 5.5l-.1 13.7Z"
            className="fill-gray-400"
            />
            <path
            d="M109.4 137.02a11.6 11.6 0 0 1 11.9-11.54l272.43 7.09c5.79.15 10.4 4.88 10.4 10.67v212.15c0 6.18-4.94 11.23-11.12 11.37l-271.9 6.12a12.64 12.64 0 0 1-12.91-12.7l1.2-223.16Z"
            className="fill-hexo-black-gray"
            />
            <path
            d="M131.9 136.52a11.6 11.6 0 0 1 11.9-11.54l272.43 7.09c5.79.15 10.4 4.88 10.4 10.67v212.15c0 6.18-4.94 11.23-11.12 11.37l-271.9 6.12a12.64 12.64 0 0 1-12.91-12.7l1.2-223.16Z"
            className="fill-gray-400"
            />
            <circle cx="162.28" cy="353.08" r="4.53" className="fill-hexo-black-gray" />
            <path
            d="m151.46 142.26-2.5 198 261.5 2.5 1.5-194.5-260.5-6Z"
            className="fill-white"
            />
            <path
            d="M169.5 219.67a.45.45 0 0 1 .45-.41l43.43.48a.46.46 0 0 1 .45.49l-.23 2.78a.45.45 0 0 1-.45.41l-43.44-.12a.45.45 0 0 1-.45-.48l.24-3.15Zm2.24-54.3a1.73 1.73 0 0 1 1.8-1.7l91.65 4.37c.93.04 1.66.82 1.65 1.75-.11 6.3-.48 28.44-.6 34.79 0 .94-.79 1.7-1.73 1.7l-91.65-.63a1.73 1.73 0 0 1-1.72-1.75l.6-38.53Zm-2.34 66.95a.45.45 0 0 1 .45-.43l26.16.45a.45.45 0 0 1 .45.48l-.15 2.78a.45.45 0 0 1-.45.43l-26.17-.1a.45.45 0 0 1-.44-.47l.14-3.14Z"
            opacity=".8"
            className="fill-gray-100"
            />
            <g className="q q-1">
            <path
                d="M344.7 239.54a11.29 11.29 0 0 1 8.63 13.42c-1.31 6.1-7.31 10-13.39 8.68a11.29 11.29 0 0 1-8.63-13.42c1.31-6.1 7.31-10 13.39-8.68Zm9.13-62.72s-1.3-10.6 6.8-12.9c8.1-2.3 11.92.76 14.66 6.74s1.07 13.7-8.53 18.83c-9.6 5.12-15.85 9.17-21.07 14.78-5.32 5.72-5.95 13.09-5.95 13.09s-1.53 5.06 2.76 10.03c4.3 4.96 14.5 2.73 14.5 2.73s-.8-6.08 3.2-10.15c4.01-4.08 16.24-6.84 23-11.22 6.75-4.39 14.8-14.78 16.41-24.32 1.6-9.54-.9-23.84-10.2-33.64-9.12-9.6-17.86-10.58-24.79-11.62-6.93-1.04-14.79 2.2-19.04 5.33s-9.18 11.5-9.2 17.79c0 6.28.8 15 17.45 14.53Z"
                className="fill-white"
            />
            <path
                d="M344.7 239.54a11.29 11.29 0 0 1 8.63 13.42c-1.31 6.1-7.31 10-13.39 8.68a11.29 11.29 0 0 1-8.63-13.42c1.31-6.1 7.31-10 13.39-8.68Zm9.13-62.72s-1.3-10.6 6.8-12.9c8.1-2.3 11.92.76 14.66 6.74s1.07 13.7-8.53 18.83c-9.6 5.12-15.85 9.17-21.07 14.78-5.32 5.72-5.95 13.09-5.95 13.09s-1.53 5.06 2.76 10.03c4.3 4.96 14.5 2.73 14.5 2.73s-.8-6.08 3.2-10.15c4.01-4.08 16.24-6.84 23-11.22 6.75-4.39 14.8-14.78 16.41-24.32 1.6-9.54-.9-23.84-10.2-33.64-9.12-9.6-17.86-10.58-24.79-11.62-6.93-1.04-14.79 2.2-19.04 5.33s-9.18 11.5-9.2 17.79c0 6.28.8 15 17.45 14.53Z"
                className="fill-hexo-black-gray/90"
            />
            </g>
            <g className="q q-2">
            <path
                d="M382.12 305.18a7.02 7.02 0 0 1-2.96 13.74 7.01 7.01 0 0 1-5.36-8.35 7.01 7.01 0 0 1 8.32-5.4Zm24.1-32.18s-8.1-3.9-7.32-8.4c.8-4.51 7.13-12.31 16.85-10.94 9.72 1.38 13.54 7.77 15.24 10.65 1.7 2.88 4.01 6.92 2.48 14.86A21.37 21.37 0 0 1 420.81 295c-9.07 3.89-9.8 1.47-17.14 3.14-5.35 1.22-11.58 5.59-11.58 5.59s-6.94-5.89-7.49-8.31c-.55-2.43.88-3.98 4.18-6.24 4.2-2.87 8.73-3.15 12.64-3.03 3.91.13 9.79-.58 12.19-2.58 2.4-2 4.9-3.62 4.52-8.55-.37-4.93-3.15-6.97-5.68-7.7-2.53-.72-4.99.73-6.23 5.67Z"
                className="fill-white"
            />
            <path
                d="M382.12 305.18a7.02 7.02 0 0 1-2.96 13.74 7.01 7.01 0 0 1-5.36-8.35 7.01 7.01 0 0 1 8.32-5.4Zm24.1-32.18s-8.1-3.9-7.32-8.4c.8-4.51 7.13-12.31 16.85-10.94 9.72 1.38 13.54 7.77 15.24 10.65 1.7 2.88 4.01 6.92 2.48 14.86A21.37 21.37 0 0 1 420.81 295c-9.07 3.89-9.8 1.47-17.14 3.14-5.35 1.22-11.58 5.59-11.58 5.59s-6.94-5.89-7.49-8.31c-.55-2.43.88-3.98 4.18-6.24 4.2-2.87 8.73-3.15 12.64-3.03 3.91.13 9.79-.58 12.19-2.58 2.4-2 4.9-3.62 4.52-8.55-.37-4.93-3.15-6.97-5.68-7.7-2.53-.72-4.99.73-6.23 5.67Z"
                className="fill-hexo-black-gray/85"
            />
            </g>
            <g className="q q-3">
            <path
                d="M295.33 276.88a8.66 8.66 0 0 1 6.62 10.3 8.66 8.66 0 0 1-10.27 6.65 8.66 8.66 0 0 1-6.62-10.3c1-4.67 5.6-7.65 10.27-6.65Zm-26.21-42.92s-3.5 3.74-9.9 2.36c-6.42-1.38-11.97-8.86-8.04-18.8 3.93-9.94 8.83-16.07 18.88-17.05 10.05-.98 24.78 2.8 31.24 15.93 4.2 8.54 3.07 14.81-.79 23.41-2.7 6.02-6 8.15-7.34 14.37-1.35 6.28-.7 9.5.6 13.83.5.78-10.04 3-10.04 3s-2.63.79-4.87-1.27c-2.24-2.05-3.61-5.04-3.7-10.9-.07-5.86 2.99-12.53 6.15-17.1 1.62-2.34 4.06-7.43 4.02-10.36-.1-6.4-4-9.86-8.02-11.6-3.07-1.34-10.1-.73-11.38 4.06-1.14 4.24 3.19 10.12 3.19 10.12Z"
                className="fill-white"
            />
            <path
                d="M295.33 276.88a8.66 8.66 0 0 1 6.62 10.3 8.66 8.66 0 0 1-10.27 6.65 8.66 8.66 0 0 1-6.62-10.3c1-4.67 5.6-7.65 10.27-6.65Zm-26.21-42.92s-3.5 3.74-9.9 2.36c-6.42-1.38-11.97-8.86-8.04-18.8 3.93-9.94 8.83-16.07 18.88-17.05 10.05-.98 24.78 2.8 31.24 15.93 4.2 8.54 3.07 14.81-.79 23.41-2.7 6.02-6 8.15-7.34 14.37-1.35 6.28-.7 9.5.6 13.83.5.78-10.04 3-10.04 3s-2.63.79-4.87-1.27c-2.24-2.05-3.61-5.04-3.7-10.9-.07-5.86 2.99-12.53 6.15-17.1 1.62-2.34 4.06-7.43 4.02-10.36-.1-6.4-4-9.86-8.02-11.6-3.07-1.34-10.1-.73-11.38 4.06-1.14 4.24 3.19 10.12 3.19 10.12Z"
                className="fill-hexo-black-gray/60"
            />
            </g>
        </svg>
        </div>
    )
}

const Style = () => <style jsx global>{`
.q {
  animation: float-animation 4s ease-in-out infinite;

  &.q-1 {
    animation-delay: 0s;
  }

  &.q-2 {
    animation-delay: 0.5s;
  }

  &.q-3 {
    animation-delay: 1.1s;
  }
}

@keyframes float-animation {
  0% {
    transform: translateY(10px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(10px);
  }
}
`}</style>



const _404Card = (props) => {
  const { siteInfo } = props
  const router = useRouter()
  return <motion.div className=' h-fit'>
    <div className='shadow px-2 py-4 rounded-md bg-white dark:bg-hexo-black-gray hover:shadow-xl duration-200 grid grid-cols-12 gap-6 h-fit'>
                <div className='col-span-1'/>
                <_404Svg className="col-span-4 md:h-[300px] sm:h-48 h-32"/>
                <div className='dark:text-gray-200 col-span-6 h-full text-center'>
                    <div className=' relative items-center flex flex-col justify-center h-full'>

                        <span className=' font-extrabold text-7xl'>404</span>
                        <div className='text-left h-32 items-center flex'>
                            <h2 className='m-0 p-0'>找不到指定页面,您可以👇</h2>
                        </div>

                        <div className=' absolute bottom-4 flex justify-around w-full'>
                            <motion.div
                            className="flex justify-end pt-8 border-dashed">
                                    <Link
                                    href='/'
                                    className="hover:bg-opacity-100 hover:scale-105 transform duration-500 rounded-md  p-3 text-white bg-gray-800 cursor-pointer"
                                >
                                    <span className="article-link">返回首页</span>
                                
                                <i className="ml-1 fas fa-angle-right" />
                                </Link>
                            </motion.div>

                            <motion.div
                            onClick={()=>{
                                router.back()
                            }}
                            className="flex justify-end pt-8 border-dashed">
                                <div
                                    className="hover:bg-opacity-100 hover:scale-105 transform duration-500 rounded-md  p-3 text-white bg-gray-800 cursor-pointer"
                                >
                                    <span className="article-link">去上一页</span>
                                
                                <i className="ml-1 fas fa-angle-right" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'/>
    </div>
  </motion.div>
}

export default _404Card
