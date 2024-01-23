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
      padding-bottom: 4px;
    }

    .replace a:hover {
      background-size: 100% 2px;
      /* color: blue; */
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
