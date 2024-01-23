/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`

    /* // 底色
    body{
        background-color: #eeedee
    }
    .dark body{
        background-color: black;
    } */

    .article-padding {
      padding: 40px;
    }

    // 菜单下划线动画
    #theme-next .menu-link {
      text-decoration: none;
      background-image: linear-gradient(#4e80ee, #4e80ee);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 0 2px;
      transition: background-size 100ms ease-in-out;
    }
    #theme-next .menu-link:hover {
      background-size: 100% 2px;
      color: #4e80ee;
    }

    // 菜单下划线动画
    #theme-next .article-link {
      text-decoration: none;
      background-image: linear-gradient(white, white);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 0 2px;
      transition: background-size 100ms ease-in-out;
    }
    #theme-next .article-link:hover {
      background-size: 100% 2px;
      color: white;
    }

    //同上
    .replace a{
      text-decoration: none;
      background-image: linear-gradient(black, black);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 0 2px;
      transition: background-size 100ms ease-in-out;
    }

    .replace a:hover {
      background-size: 100% 2px;
      /* color: blue; */
    }

    .water-box {
        /* 小圆角 */
        border-radius: 4px;
        /* 简单定位 */
        position: relative;
        /* 显示层级最上面 */
        z-index: 0;
        padding: 3px 3px;
        /* 超出部分要隐藏 */
        overflow: hidden;
        
        &:hover ::before {
            content: "";

            /* 宽高要超过父级默认的大小 */
            width: 200%;
            height: 400%;
            /* 基础背景颜色 */
            background-color: #404040;
            /* conic-gradient 围绕中心点旋转的渐变 */
            background-image: conic-gradient(transparent, white, transparent 30%);

            /* 定位到中间 */
            position: absolute;
            left: -50%;
            top: -150%;
            /* 显示层级最底层 */
            z-index: -2;

            /* 旋转整个灯光渐变这一层 */
            animation: rotate 5s linear infinite;
        }
        &:hover ::after {
            content: "";
            /* 往内撑开盒子宽高，正好小一圈当做边框 */
            inset: 2px;
            background: white;
            border-radius: 2px;

            position: absolute;
            /* 显示层级中间，盖住最后一层的灯光 */
            z-index: -1;
        }
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    .processBar{
        position: absolute;
  
        top: 50%;
        left: 50%;
        
        transform: translate(-50%, -50%);
    }
  `}</style>
}

export { Style }
