import LANGS from '@/lib/lang'
import { useGlobal } from '@/lib/global'

const TranslateButton = (props) => {
  const { lang, changeLang } = useGlobal()

  const onLangSelectChange = () => {
    const newLang = lang.startsWith('zh') ? 'en' : 'zh'
    debugger
    changeLang(newLang)
  }

  return <div className={`${props.className || ''} 'z-10 duration-200 cursor-pointer py-1.5 hover:scale-125 transform`}>
        <i id='darkModeButton' className={` iconfont ${lang.startsWith('zh') ? 'icon-chinese' : 'icon-english'} text-xl`}
        onClick={onLangSelectChange} />
    </div>
}
export default TranslateButton
