interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
}

export class DrawTree {
  pendingTasks: Function[] = []
  framesCount = 0
  constructor(
    public WIDTH: number,
    public HEIGHT: number,
    public depth: number,
    public ctx: CanvasRenderingContext2D,
    public img?: any,
  ) {
    this.init()
  }

  init(
    ctx = this.ctx,
    width = this.WIDTH,
    height = this.HEIGHT,
  ) {
    this.ctx = ctx
    this.WIDTH = width
    this.HEIGHT = height
    this.ctx.strokeStyle = `rgb(255, ${Math.floor(255 - 40 * Math.random() * 6)}, ${Math.floor(255 - 40 * Math.random() * 6)})`
    // ctx.strokeStyle = '#6b7280'
    this.step({
      start: { x: this.WIDTH / 2, y: this.HEIGHT },
      length: 50,
      theta: -Math.PI / 2,
    }, this.depth)
  }

  getEndPoint(b: Branch) {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta),
    }
  }

  step(b: Branch, depth = 0) {
    const end = this.getEndPoint(b)
    this.drawBranch(b)
    if (depth < 5 || Math.random() < 0.5) {
      this.pendingTasks.push(() => this.step({
        start: end,
        length: b.length * (0.7 + 0.5 * Math.random()),
        theta: b.theta - 0.8 * Math.random(),
      }, depth + 1))
    }
    if (depth < 5 || Math.random() < 0.5) {
      this.pendingTasks.push(() => this.step({
        start: end,
        length: b.length * (0.7 + 0.3 * Math.random()),
        theta: b.theta + 0.8 * Math.random(),
      }, depth + 1))
    }
  }

  drawBranch(b: Branch) {
    this.lineTo(b.start, this.getEndPoint(b))
    this.img && this.drawImg(this.img, this.getEndPoint(b))
  }

  lineTo(p1: Point, p2: Point) {
    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.ctx.lineCap = 'round'
    this.ctx.stroke()
  }

  drawImg(img: HTMLImageElement, p: Point) {
    this.ctx.drawImage(img, p.x - 5, p.y - 5, 10, 10)
  }

  frame() {
    const tasks = [...this.pendingTasks]
    this.pendingTasks.length = 0
    tasks.forEach(fn => fn())
  }

  startFrame() {
    requestAnimationFrame(() => {
      this.framesCount += 1
      if (this.framesCount % 3 === 0)
        this.frame()

      this.startFrame()
    })
  }
}
