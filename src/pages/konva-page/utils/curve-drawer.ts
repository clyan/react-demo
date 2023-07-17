/**
 * @description 贝塞尔曲线运动
 * @author clyan
 */

import type { Bezier, Shape } from 'bezier-js'

import type { Tuple } from '@/model/type'

export interface Coordinate {
  /** x */
  x: number
  /** y */
  y: number
}

interface BezierCurveProps {
  /** canvas节点 */
  canvasEle: HTMLCanvasElement
}

export class CurveDrawer {
  /** canvas节点 */
  canvasEle: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  randomIndex = 0
  randomColors: string[] = []
  constructor({ canvasEle }: BezierCurveProps) {
    this.canvasEle = canvasEle
    this.ctx = canvasEle.getContext('2d')
    this.adaptDPR()

    for (let i = 0, j; i < 360; i++) {
      j = (i * 47) % 360
      this.randomColors.push(`hsl(${j},50%,50%)`)
    }
  }

  adaptDPR() { // 在初始化 canvas 的时候就要调用该方法
    const dpr = window.devicePixelRatio
    const { height, width } = this.canvasEle.getBoundingClientRect()

    // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点
    this.canvasEle.width = Math.round(width * dpr)
    this.canvasEle.height = Math.round(height * dpr)

    this.canvasEle.style.width = `${width}px`
    this.canvasEle.style.height = `${height}px`
  }

  getCanvas() {
    return this.canvasEle
  }

  setColor(c: string) {
    const ctx = this.ctx
    if (!ctx) return
    ctx.strokeStyle = c
  }

  noColor() {
    const ctx = this.ctx
    if (!ctx) return
    ctx.strokeStyle = 'transparent'
  }

  setRandomColor() {
    const ctx = this.ctx
    if (!ctx) return
    this.randomIndex = (this.randomIndex + 1) % this.randomColors.length
    const c = this.randomColors[this.randomIndex]
    ctx.strokeStyle = c
  }

  setRandomFill(a: number) {
    const ctx = this.ctx
    if (!ctx) return

    this.randomIndex = (this.randomIndex + 1) % this.randomColors.length
    a = typeof a === 'undefined' ? 1 : a
    let c = this.randomColors[this.randomIndex]
    c = c.replace('hsl(', 'hsla(').replace(')', `,${a})`)
    ctx.fillStyle = c
  }

  setFill(c: string) {
    const ctx = this.ctx
    if (!ctx) return

    ctx.fillStyle = c
  }

  noFill() {
    const ctx = this.ctx
    if (!ctx) return
    ctx.fillStyle = 'transparent'
  }

  drawSkeleton(curve: Bezier, offset?: Coordinate, noCoords?: boolean) {
    if (!this.ctx) return
    offset = offset || { x: 0, y: 0 }
    const pts = curve.points
    this.ctx.strokeStyle = 'lightgrey'
    this.drawLine(pts[0], pts[1], offset)
    if (pts.length === 3)
      this.drawLine(pts[1], pts[2], offset)

    else
      this.drawLine(pts[2], pts[3], offset)

    this.ctx.strokeStyle = 'black'
    if (!noCoords) this.drawPoints(pts, offset)
  }

  // 绘制贝塞尔曲线
  drawCurve(curve: Bezier, offset?: Coordinate) {
    const ctx = this.ctx
    if (!ctx) return

    offset = offset || { x: 0, y: 0 }
    const ox = offset.x
    const oy = offset.y
    ctx.beginPath()
    const p = curve.points
    ctx.moveTo(p[0].x + ox, p[0].y + oy)
    if (p.length === 3)
      ctx.quadraticCurveTo(p[1].x + ox, p[1].y + oy, p[2].x + ox, p[2].y + oy)

    if (p.length === 4) {
      ctx.bezierCurveTo(
        p[1].x + ox,
        p[1].y + oy,
        p[2].x + ox,
        p[2].y + oy,
        p[3].x + ox,
        p[3].y + oy,
      )
    }
    ctx.stroke()
    ctx.closePath()
  }

  drawLine(p1: Coordinate, p2: Coordinate, offset: Coordinate) {
    const ctx = this.ctx
    if (!ctx) return

    offset = offset || { x: 0, y: 0 }
    const ox = offset.x
    const oy = offset.y
    ctx.beginPath()
    ctx.moveTo(p1.x + ox, p1.y + oy)
    ctx.lineTo(p2.x + ox, p2.y + oy)
    ctx.stroke()
  }

  drawPoint(p: Coordinate, offset: Coordinate) {
    const ctx = this.ctx
    if (!ctx) return

    offset = offset || { x: 0, y: 0 }
    const ox = offset.x
    const oy = offset.y
    ctx.beginPath()
    ctx.arc(p.x + ox, p.y + oy, 5, 0, 2 * Math.PI)
    ctx.stroke()
  }

  drawPoints(points: Coordinate[], offset: Coordinate) {
    offset = offset || { x: 0, y: 0 }
    points.forEach(p => this.drawCircle(p, 3, offset))
  }

  drawArc(p: Parameters<CanvasPath['arc']>, offset: Coordinate) {
    const ctx = this.ctx
    if (!ctx) return

    offset = offset || { x: 0, y: 0 }
    const ox = offset.x
    const oy = offset.y
    ctx.beginPath()
    ctx.moveTo(p[0] + ox, p[1] + oy)
    ctx.arc(...p)
    ctx.lineTo(p[0] + ox, p[1] + oy)
    ctx.fill()
    ctx.stroke()
  }

  drawCircle(p: Coordinate, r: number, offset: Coordinate) {
    const ctx = this.ctx
    if (!ctx) return

    offset = offset || { x: 0, y: 0 }
    const ox = offset.x
    const oy = offset.y
    ctx.beginPath()
    ctx.arc(p.x + ox, p.y + oy, r, 0, 2 * Math.PI)
    ctx.stroke()
  }

  drawHull(hull: Tuple<Coordinate, 6 | 8>) {
    const ctx = this.ctx
    if (!ctx) return

    ctx.beginPath()
    if (hull.length === 6) {
      ctx.moveTo(hull[0].x, hull[0].y)
      ctx.lineTo(hull[1].x, hull[1].y)
      ctx.lineTo(hull[2].x, hull[2].y)
      ctx.moveTo(hull[3].x, hull[3].y)
      ctx.lineTo(hull[4].x, hull[4].y)
    }
    else {
      ctx.moveTo(hull[0].x, hull[0].y)
      ctx.lineTo(hull[1].x, hull[1].y)
      ctx.lineTo(hull[2].x, hull[2].y)
      ctx.lineTo(hull[3].x, hull[3].y)
      ctx.moveTo(hull[4].x, hull[4].y)
      ctx.lineTo(hull[5].x, hull[5].y)
      ctx.lineTo(hull[6].x, hull[6].y)
      ctx.moveTo(hull[7].x, hull[7].y)
      ctx.lineTo(hull[8].x, hull[8].y)
    }
    ctx.stroke()
  }

  drawShape(shape: Shape, offset?: Coordinate) {
    const ctx = this.ctx
    if (!ctx) return

    offset = offset || { x: 0, y: 0 }
    const order = shape.forward.points.length - 1
    const scl = shape.startcap.points.length
    const ecl = shape.endcap.points.length

    ctx.beginPath()
    ctx.moveTo(
      offset.x + shape.startcap.points[0].x,
      offset.y + shape.startcap.points[0].y,
    )
    ctx.lineTo(
      offset.x + shape.startcap.points[scl - 1].x,
      offset.y + shape.startcap.points[scl - 1].y,
    )
    if (order === 3) {
      ctx.bezierCurveTo(
        offset.x + shape.forward.points[1].x,
        offset.y + shape.forward.points[1].y,
        offset.x + shape.forward.points[2].x,
        offset.y + shape.forward.points[2].y,
        offset.x + shape.forward.points[3].x,
        offset.y + shape.forward.points[3].y,
      )
    }
    else {
      ctx.quadraticCurveTo(
        offset.x + shape.forward.points[1].x,
        offset.y + shape.forward.points[1].y,
        offset.x + shape.forward.points[2].x,
        offset.y + shape.forward.points[2].y,
      )
    }
    ctx.lineTo(
      offset.x + shape.endcap.points[ecl - 1].x,
      offset.y + shape.endcap.points[ecl - 1].y,
    )
    if (order === 3) {
      ctx.bezierCurveTo(
        offset.x + shape.back.points[1].x,
        offset.y + shape.back.points[1].y,
        offset.x + shape.back.points[2].x,
        offset.y + shape.back.points[2].y,
        offset.x + shape.back.points[3].x,
        offset.y + shape.back.points[3].y,
      )
    }
    else {
      ctx.quadraticCurveTo(
        offset.x + shape.back.points[1].x,
        offset.y + shape.back.points[1].y,
        offset.x + shape.back.points[2].x,
        offset.y + shape.back.points[2].y,
      )
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  drawText(text: string, offset: Coordinate) {
    if (!this.ctx) return

    offset = offset || { x: 0, y: 0 }
    this.ctx.fillText(text, offset.x, offset.y)
  }
}
