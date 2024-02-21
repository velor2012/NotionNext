import React, { useState } from 'react'
import { motion } from 'framer-motion'
/**
 * Tabs切换标签
 * @param {*} param0
 * @returns
 */
const Tabs = ({ className, children }) => {
  const [currentTab, setCurrentTab] = useState(0)

  if (!children) {
    return <></>
  }

  children = children.filter(c => c !== '')

  let count = 0
  children.forEach(e => {
    if (e) {
      count++
    }
  })

  if (count === 0) {
    return <></>
  }

  if (count === 1) {
    return <section className={' overflow-hidden ' + className}>
            {children}
        </section>
  }

  function tabClickHandle(i) {
    setCurrentTab(i)
  }

  return <div className={'mb-5 overflow-hidden ' + className}>
        <ul className='flex justify-center space-x-5 pb-4 dark:text-gray-400 text-gray-600 overflow-auto'>
            {children.map((item, index) => {
              return (<li key={index}
                    className={(currentTab === index ? ' relative font-black text-red-400' : 'font-extralight cursor-pointer') + ' text-sm font-sans '}
                    onClick={() => {
                      tabClickHandle(index)
                    }}>
                    {item?.key}
                    {currentTab === index ? (
                        <motion.div
                            className= ' bg-red-400 '
                            style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '0px',
                            right: 0,
                            height: '2px',
                            borderRadius: '8px',
                            zIndex: 0,
                            }}
                            layoutId="underline"
                        />
                    ) : null}
                </li>)
            })}
        </ul>
        <motion.div
        className=' flex flex-1 will-change-transform w-full'
            transition={{
            tension: 190,
            friction: 70,
            mass: 0.4
          }}
          initial={false}
          animate={{ x: currentTab * -100 + "%" }}
        >
            {children.map((item, index) => {
              return <section key={index}
                      aria-hidden={currentTab !== index}
                      className=' w-full flex-shrink-0'
                    >
                     { [index + 1 , index, index - 1].indexOf(currentTab) != -1 && item}
                </section>
            })}
        </motion.div>
    </div>
}

export default Tabs
