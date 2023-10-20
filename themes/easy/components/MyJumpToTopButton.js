import { useGlobal } from '@/lib/global'
import React, { useMemo } from 'react'
import CONFIG from '../config'
import Stroke from '../lib/getStroke'

/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal()
  const [pathTotalLength, setPathTotalLength] = React.useState(148)
  
  const p = useMemo(()=>{
    return pathTotalLength *(1 -  percent / 100 )
  }, [percent, pathTotalLength])

  if (!CONFIG.WIDGET_TO_TOP) {
    return <></>
  }
  return (
    <div className='relative flex justify-center items-center transform hover:scale-105 duration-200 w-8 h-8' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >
            <svg className="process-bar absolute m-0 p-0 -top-0 left-0 w-full h-full" view-box="0 0 40 40">
                {Style()}
                <Stroke
                    percent={p}
                    setPathTotalLength={setPathTotalLength}
                    width={32}
                    height={32}
                    strokeWidth={3}
                    radius={16}
                />
                </svg>
            <div className='dark:text-gray-200 block align-middle ' title={locale.POST.TOP} >
                <i className='fa-arrow-up fas' />
            </div>
            {/* {showPercent && (<div className='text-xs dark:text-gray-200 block'>{percent}%</div>)} */}
    </div>
    )
}

const Style = () => <style jsx global>{`

.process-bar path{
    
    fill: none;
    stroke: black;
    stroke-linecap: round;
    transition-property: color,background-color,border-color,outline-color,text-decoration-color,fill,stroke;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    transition-duration: .15s; 
}

`}</style>

export default JumpToTopButton
