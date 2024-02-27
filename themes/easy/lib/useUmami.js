import { siteConfig } from "@/lib/config"
import axios from "axios"
import { useState, useEffect } from "react"
function useUmami(){
    const [ activeNum, setActiveNum ] = useState(0)
    const UMAMI_SITE_ID = siteConfig('UMAMI_SITE_ID') || ''
    // https://analytics.eu.umami.is/api/share/{{你的分享id}}
    // 由于跨域原因，需要自己在next.config.js中配置反向代理
    const UMAMI_SHARE_ID = siteConfig('UMAMI_SHARE_ID') || ''      
    
    let UMAMI_ANALYTICS_URL = siteConfig('UMAMI_HOST_URL') || 'https://analytics.eu.umami.is'
    // 去掉最后的斜杠
    UMAMI_ANALYTICS_URL = UMAMI_ANALYTICS_URL.replace(/\/$/, "")
    let shareToken = ""
    const loadStat = async ()=>{
        if(!UMAMI_SITE_ID) return
        if(shareToken == "" || shareToken == undefined){
            const res = await axios.get(`/umami/api/share/${UMAMI_SHARE_ID}`)
            shareToken = res.data.token
            // console.log(res.data.token)
        }
        // console.log(`shareToken: ${shareToken}`)
        if(shareToken == "" || shareToken == undefined) return
        axios.get(`${UMAMI_ANALYTICS_URL}/api/websites/${UMAMI_SITE_ID}/active`,
        {
            headers:{
                'X-Umami-Share-Token': shareToken
            }
        }
        ).then(res=>{
            if( res.data){
                setActiveNum(res.data.x)
                // console.log(`在线人数：${res.data.x}`)
            }
            return res.data
        }).catch(err=>{
            console.log(err)
            return 0
        })
    }
    useEffect(async ()=>{
        //  30秒刷新一次
        const timer = setInterval(async ()=>{
            await loadStat()
        }, 1000 * 30)
        await loadStat()
        return ()=>{
            clearInterval(timer)
        }
    }, [])
    return { activeNum }
}
export default useUmami