/**
 * @description 图形绘制
 * @author clyan
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bezier } from 'bezier-js'
import { CurveDrawer } from './utils/curve-drawer'

export function KonvaPage() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  const [curveDrawer, setCurveDrawer] = useState<CurveDrawer>()

  useEffect(() => {
    if (!ref.current) {
      console.warn('canvas element ins\'t exit')
      return
    }
    const curveDrawer = new CurveDrawer({ canvasEle: ref.current })

    setCurveDrawer(curveDrawer)
  }, [])

  useEffect(() => {
    if (!curveDrawer) return

    const curve = new Bezier(150, 40, 80, 30, 105, 150)
    curveDrawer.drawSkeleton(curve)
    curveDrawer.drawCurve(curve)
    curveDrawer.setColor('red')
    curve.outlineshapes(25, 25).forEach((s) => {
      curveDrawer.setRandomFill(0.2)
      curveDrawer.drawShape(s)
    })
  }, [curveDrawer])

  return (
    <>
      {createPortal(
        <canvas className="absolute top-0 h-screen w-screen" ref={ref} />,
        document.body,
      )}
    </>
  )
}
