import { siteConfig } from "@/lib/config"
import axios from "axios"
import { useState, useEffect } from "react"
function useUmami(){
    const [ activeNum, setActiveNum ] = useState(0)
    const UMAMI_SITE_ID = siteConfig('UMAMI_SITE_ID') || ''
    // https://analytics.eu.umami.is/api/share/{{你的分享id}}
    // 由于跨域原因，需要自己在next.config.js中配置反向代理
    const UMAMI_SHARE_ID = siteConfig('UMAMI_SHARE_ID') || ''    

    const isSelfHost = !!siteConfig('UMAMI_HOST_URL')

    let UMAMI_ANALYTICS_URL = siteConfig('UMAMI_HOST_URL') || 'https://api.umami.is/v1'
    // 去掉最后的斜杠
    UMAMI_ANALYTICS_URL = UMAMI_ANALYTICS_URL.replace(/\/$/, "")
    let shareToken = "lUlcOdzFQTxL3FSzjOpkdis8n8qG8bn1"
    const loadStat = async ()=>{
        if(!UMAMI_SITE_ID) return
        // console.log(`shareToken: ${shareToken}`)
        if(shareToken == "" || shareToken == undefined) return
        axios.get(`${isSelfHost ? UMAMI_ANALYTICS_URL + 'api' : UMAMI_ANALYTICS_URL}/realtime/${UMAMI_SITE_ID}`,
        {
            headers:{
                'x-umami-api-key': shareToken
            },
            params:{
                timezone: 'Asia/Shanghai'
            }
        }
        ).then(res=>{
            if( res.data){
                setActiveNum(res.data?.totals?.visitors || 0)
                // console.log(`在线人数：${res.data?.totals?.visitors}`)
            }
            return res.data
        }).catch(err=>{
            console.log(err)
            return 0
        })
    }
    useEffect(()=>{
        //  30秒刷新一次
        const timer = setInterval(async ()=>{
            await loadStat()
        }, 1000 * 30)
        loadStat()
        return ()=>{
            clearInterval(timer)
        }
    }, [])
    return { activeNum }
}
export default useUmami