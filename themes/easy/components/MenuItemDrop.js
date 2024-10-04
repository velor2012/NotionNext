import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

const variants = {
  show: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    }
  },
  hidden: {
    x: -1000,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
}

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
      className="relative py-1.5 px-5 duration-300 text-base justify-between hover:bg-gray-700 hover:text-white hover:shadow-lg cursor-pointer font-light flex flex-nowrap items-center "
    >
      {!hasSubMenu && (
        <Link
        href={link?.href}
        target={link?.target}
          className="w-full my-auto items-center justify-between flex "
        >
          <div>
            <div className={`${link.icon} text-center w-4 mr-4`} />
            {link.name}
          </div>
          {link.slot}
        </Link>
      )}

      {hasSubMenu && (
        <div className="w-full my-auto items-center justify-between flex ">
          <div>
            <div className={`${link.icon} text-center w-4 mr-4`} />
            {link.name}
          </div>
          {link.slot}
          {hasSubMenu && (
            <div className="text-right">
              <i
                className={`px-2 fas fa-chevron-right duration-500 transition-all ${
                  show ? ' rotate-180' : ''
                }`}
              ></i>
            </div>
          )}
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${
            show ? 'visible opacity-100 left-56' : 'invisible opacity-0 left-40'
          } whitespace-nowrap absolute right-0 top-0 w-full border-gray-100  bg-white  dark:bg-black dark:border-gray-800 transition-all duration-300 drop-shadow-lg `}
        >
          {link?.subMenus?.map(sLink => {
            return (
              <li key={sLink.id}>
                <Link
                  href={sLink.href}
                  target={link?.target}
                  className="my-auto h-9 px-2 items-center justify-start flex not:last-child:border-b-0 border-b text-gray-700 dark:text-gray-200  hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200  dark:border-gray-800 "
                >
                  {sLink.icon && (
                    <i className={`${sLink.icon} w-4 text-center`} />
                  )}
                  <div className={'ml-4'}>{sLink.name}</div>
                  {sLink.slot}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </motion.li>
  )
}
