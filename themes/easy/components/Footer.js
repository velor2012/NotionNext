import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'
import { extractDate, getRunTime } from '../lib/utils'
import { useGlobal } from '@/lib/global'

const Footer = ({ title }) => {
    const d = new Date()
    const currentYear = d.getFullYear()
    const { locale } = useGlobal()
    const since = siteConfig('SINCE')
    const beian = siteConfig('BEI_AN')
    const mengbei = siteConfig('MOE_BEI')
    const link = siteConfig('LINK')
    // 提取日期，形如yyyy-mm-dd
    const date = extractDate(since)
    const runTime = getRunTime(date)
    const copyrightDate = date.year < currentYear ? since + '-' + currentYear : currentYear

    return (
        <footer
            className='relative z-10 dark:bg-gray-800 flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm p-6 bg-white dark:text-gray-400'
        >

            <span>

                <i className='fas fa-copyright' /> {`${copyrightDate}`}{' '}
                <span className='mx-1 animate-pulse'>
                    <i className='fas fa-heart' />
                </span>{' '}
                <a href={siteConfig('LINK')} className='underline font-bold '>
                    {siteConfig('AUTHOR')}
                </a>
                .<br />

                {beian && <><i className='fas fa-shield-alt' /> <a href='https://beian.miit.gov.cn/' className='mr-2'>{beian}</a><br /></>}

                {mengbei && <><i className='fas fa-star' /> <a href={`https://icp.gov.moe/?keyword=${mengbei}`} target="_blank">{`萌ICP备${mengbei}号`}</a><br /></>}
                <BeiAnGongAn />
                <span className='hidden busuanzi_container_site_pv'>
                    <i className='fas fa-eye' />
                    <span className='px-1 busuanzi_value_site_pv'> </span>{' '}
                </span>
                <span className='pl-2 hidden busuanzi_container_site_uv'>
                    <i className='fas fa-users' />{' '}
                    <span className='px-1 busuanzi_value_site_uv'> </span>{' '}
                </span>
                <br />
                <h1>{title}</h1>
                <span className='text-xs font-serif  text-gray-500 dark:text-gray-300 '>
                    Powered by{' '}
                    <a
                        href='https://github.com/tangly1024/NotionNext'
                        className='underline '>
                        NotionNext {siteConfig('VERSION')}
                    </a>
                    .
                </span>
            </span>
        </footer>
    )
}

export default Footer
