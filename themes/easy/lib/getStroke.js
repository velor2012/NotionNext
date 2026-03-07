import * as React from "react"

function getPath(r, w, h, lineWidth) {
  // 描边后的半径、宽度、高度
  const adjR = r - lineWidth
  const adjW = w - lineWidth
  const adjH = h - lineWidth

  // 左上角起始点
  let path = `M${adjR + lineWidth / 2} ${lineWidth / 2}`
  // 上边线
  path += `h${adjW - 2 * adjR}`
  // 右上角圆弧
  path += `a${adjR + lineWidth / 2} ${
    adjR + lineWidth / 2
  } 0 0 1 ${adjR} ${adjR}`
  // 右边线
  path += `v${adjH - 2 * adjR}`
  // 右下角圆弧
  path += `a${adjR + lineWidth / 2} ${
    adjR + lineWidth / 2
  } 0 0 1 -${adjR} ${adjR}`
  // 下边线
  path += `h${-adjW + 2 * adjR}`
  // 左下角圆弧
  path += `a${adjR + lineWidth / 2} ${
    adjR + lineWidth / 2
  } 0 0 1 -${adjR} -${adjR}`
  // 左边线
  path += `v${-adjH + 2 * adjR}`
  // 左上角圆弧
  path += `a${adjR + lineWidth / 2} ${
    adjR + lineWidth / 2
  } 0 0 1 ${adjR} -${adjR}`
  path += 'Z'
  return path
}

const Stroke = props => {
  const myRef = React.createRef();
  const [st, setSt] = React.useState({});
  const strokeWidth = props.strokeWidth || 0
  const computedPath = React.useMemo(
    () => getPath(props.radius, props.width, props.height, props.strokeWidth),
    [props.radius, props.width, props.height, props.strokeWidth]
  )

  React.useEffect(()=>{
    const pathTotalLength = myRef.current?.getTotalLength() || 0
    if(props.setPathTotalLength && pathTotalLength){
        props.setPathTotalLength(pathTotalLength)
      }
      setSt({
        strokeDashoffset: props.percent || 0,
        strokeDasharray: `${pathTotalLength}px ${pathTotalLength}px`,
        strokeWidth: `${strokeWidth}px`
    })
  }, [props])

  return (
    <path className={props.className ? props.className : ""} d={computedPath} ref={myRef} style={st}
        >
        </path>
  )
}

export default Stroke
