# 一个类似仪表盘的圆环组件

## 需求来啦
UI新设计了一个圆环图，长得怪好看的，哈哈，不服输的我当然要挑战一下啦~

![avatar](/imgs/circle.png)

## 开动

### 1. 首先，整个圆出来
```ts
// <script setup lant="ts"></script>
// 索引类型
interface GuageData {
  [key: string]: any
}
const area = ref<any>(null)
const guageData = reactive<GuageData>({
  cssGauge: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  } as any
})
```

部分样式代码使用了 <a href="https://github.com/unocss/unocss" target="_blank">UnoCSS</a>
```html
  <div ref="area" class="gauge-area" position="relative">
    <div :style="cssGauge">
    </div>
  </div>
```

```css
  .gauge-area {
    width: 150px;
    height: 150px;
  }
```

### 2. 使用一个简单又偷懒的办法，将刻度画出来
遍历div表示刻度，并通过`transform: rotate()`来实现方向的转变
```html
  <div ref="area" class="gauge-area" position="relative">
    <div :style="cssGauge">
      <div :style="cssDotWrap">
        <div
          v-for="i in 60"
          :key="i"
          :style="Object.assign({}, {
            transform: `rotateZ(${i * 4}deg)`,
            backgroundColor: setScaleColor(i),
          }, cssDot)"
        />
      </div>
    </div>
  </div>
```
```ts
// <script setup lant="ts"></script>
interface GuageStyle {
  position: string
  width: string
  height: string
  borderRadius?: string
  transform?: string
  transformOrigin?: string
}
const guageData = reactive<GuageData>({
  value: '33',
  cssGauge: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  } as GuageStyle,
  cssDotWrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'translateX(250px)',
  } as GuageStyle,
  cssDot: {
    position: 'absolute',
    transformOrigin: '0px 165px',
  } as GuageStyle
})
const { cssGauge, cssDotWrap, cssDot } = toRefs(guageData)
// 设置刻度颜色，可自由控制环的颜色比例
const setScaleColor = (j: number) => {
  if (j < 40)
    return '#fa1'

  else
    return '#eee'
}
// 动态改变圆环刻度样式
const setStates = (prop: string, data: any) => {
  const cache = guageData[prop]
  guageData[prop] = Object.assign({}, cache, JSON.parse(JSON.stringify(data)))
}
// 设置环的大小
const setSize = () => {
  const width = area.value.offsetWidth || 150
  const height = area.value.offsetHeight || 150
  const length = width > height ? height : width // 根据较短边，计算实际使用的长度
  const paddingW = (width - length) / 2 // 获取距离左部的距离
  const paddingH = (height - length) / 2 // 获取距离顶部的距离
  // 设置整体的大小形状
  setStates('cssGauge', {
    height: `${length}px`,
    width: `${length}px`,
    top: `${paddingH}px`,
    left: `${paddingW}px`,
  })
  // 设置刻度的半径
  const dotRadius = length * 0.5
  // 刻度的高度和宽度
  const dotHeight = `${length * 0.09}px`
  const dotWidth = `${length * 0.02}px`
  // 刻度的样式
  setStates('cssDot', {
    transformOrigin: `${0}px ${dotRadius}px`,
    height: dotHeight,
    width: dotWidth,
  })
  // 设置刻度所在区域的位置
  setStates('cssDotWrap', {
    transform: `translateX(${length * 0.5}px)`,
  })
}
// init
onMounted(() => {
  setSize()
})
```
### 3. 最后在环中间加上数字展示
```html
  <div ref="area" class="gauge-area" position="relative">
    <div :style="cssGauge">
      <div :style="cssDotWrap">
        <div
          v-for="i in 60"
          :key="i"
          :style="Object.assign({}, {
            transform: `rotateZ(${i * 6}deg)`,
            backgroundColor: setScaleColor(i),
          }, cssDot)"
        />
      </div>
    </div>
    <!-- 中间数字 -->
    <div class="gauge-title" color="black/80" dark:color="white/80">
      {{ value }}
    </div>
  </div>
```
```css
  .gauge-title {
    font-family: Bender;
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
```
## 大功告成，基本完事啦
再加一个定时器模拟value值的变化
```ts
const timer = ref<any>(null)
onMounted(() => {
  timer.value = setInterval(() => {
    guageData.value = Math.ceil((Math.random() * 100))
  }, 2 * 1000)
})
onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value)
})
```
<Vue3Guage />

