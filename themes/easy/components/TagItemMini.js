import Link from 'next/link'
import { motion } from 'framer-motion'
const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200
        mr-2 py-0.5 px-1 text-xs whitespace-nowrap dark:hover:text-white
         ${selected
        ? 'text-white dark:text-gray-300 bg-black dark:bg-black dark:hover:bg-gray-100'
        : `text-gray-600 dark:hover:bg-gray-100 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}` }>

      <div className='font-light dark:text-gray-400 dark:hover:text-black'>{selected && <motion.i 
       layoutId="TagItemTag2"
       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
       className='fas fa-tag mr-1'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} </div>

    </Link>
  );
}

export default TagItemMini
