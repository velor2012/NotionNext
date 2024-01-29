import Link from 'next/link'
import { useTheme } from '../lib/themeContextProvider'
import { siteConfig } from '@/lib/config'

const TopNavCustomButtons = props => {
  const TopNavCustomButtonsStr = siteConfig('TopNavCustomButtons')
  try {
    debugger
    let arr = JSON.parse(TopNavCustomButtonsStr)

    return arr.map((item, idx) => (
      <Link
        key={idx}
        href={item?.url}
        target={item?.url?.indexOf('http') === 0 ? '_blank' : '_self'}
        className={`${
          props.className || ''
        } z-10 duration-200 text-lg cursor-pointer py-1.5 px-1`}
      >
        <i className={`hover:scale-125 transform duration-200 ${item.icon}`} />
      </Link>
    ))
  } catch (e) {
    console.log(e)
    return <></>
  }
}
export default TopNavCustomButtons
