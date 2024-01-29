import { siteConfig } from "@/lib/config"
import axios from "axios"
import { useState, useEffect } from "react"
function useUmami(){
    const [ activeNum, setActiveNum ] = useState(0)
    const UMAMI_SITE_ID = siteConfig('UMAMI_SITE_ID') || ''
    const UMAMI_SHARE_TOKEN = siteConfig('UMAMI_SHARE_TOKEN') || ''
    let UMAMI_ANALYTICS_URL = siteConfig('UMAMI_HOST_URL') || 'https://analytics.eu.umami.is'
    // 去掉最后的斜杠
    UMAMI_ANALYTICS_URL = UMAMI_ANALYTICS_URL.replace(/\/$/, "")
    const loadStat = ()=>{
        if(!UMAMI_SITE_ID) return
        axios.get(`${UMAMI_ANALYTICS_URL}/api/websites/${UMAMI_SITE_ID}/active`,
        {
            headers:{
                'X-Umami-Share-Token': UMAMI_SHARE_TOKEN
            }
        }
        ).then(res=>{
            if( res.data instanceof Array && res.data.length > 0){
                setActiveNum(res.data[0].x)
            }
            return res.data
        }).catch(err=>{
            console.log(err)
            return 0
        })
    }
    useEffect(()=>{
        //  30秒刷新一次
        const timer = setInterval(()=>{
            loadStat()
        }, 1000 * 30)
        return ()=>{
            clearInterval(timer)
        }
    }, [])
    return { activeNum }
}
export default useUmami