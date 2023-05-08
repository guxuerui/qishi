<script setup lang="ts">
interface GuageData {
  [key: string]: any
}
interface GuageStyle {
  position: string
  width: string
  height: string
  borderRadius?: string
  transform?: string
  transformOrigin?: string
}

const area = ref<any>(null)
const timer = ref<any>(null)
const guageData = reactive<GuageData>({
  value: 33, // 当前默认value
  cssGauge: { // 整个仪表盘的盒子
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  } as GuageStyle,
  cssDotWrap: { // 装外层装饰刻度的盒子
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'translateX(250px)',
  } as GuageStyle,
  cssDot: { // 外层装饰刻度
    position: 'absolute',
    // backgroundColor: '#509fef',
    transformOrigin: '0px 165px',
  } as GuageStyle,
  colorList: [] as string[], // 内层刻度的颜色
})
const { value, cssDot, cssGauge, cssDotWrap } = toRefs(guageData)

// 设置内环刻度颜色
const setScaleColor = function (j: number) {
  // if (j < 40)
  //   return `${guageData.colorList[j + 50]}`

  // else
  //   return guageData.colorList[j - 40]
  if (j < 40)
    return '#fa1'

  else
    return '#87501D'
}
// 获取颜色列表：由蓝色逐渐变红
const getColorList = function () {
  const colorList = [] as string[]
  const red = {
    max: 173,
    min: 20,
  }
  const green = {
    max: 146,
    min: 25,
  }
  const blue = {
    max: 216,
    min: 45,
  }
  const lth = 120
  for (let i = 0; i < lth; i++) {
    const color = `rgb(${red.max - (red.max - red.min) / lth * i}, ${green.min + (green.max - green.min) / lth * i}, ${blue.min + (blue.max - blue.min) / lth * i})`
    colorList.unshift(color)
  }
  guageData.colorList = colorList
}

const getWidth = function () { // 获取指定容器的宽度
  return area.value.offsetWidth || 200
}
const getHeight = function () { // 获取指定容器的高度
  return area.value.offsetHeight || 200
}
const setStates = function (prop: string, data: any) {
  const cache = guageData[prop]
  guageData[prop] = Object.assign({}, cache, JSON.parse(JSON.stringify(data)))
}

// 设置仪表盘图的大小
const setSize = function () {
  const width = getWidth() // 获取 div 的宽度
  const height = getHeight() // 获取 div 的高度
  const length = width > height ? height : width // 根据较短边 以及 外层比例，计算实际使用的长度
  const paddingW = (width - length) / 2 // 获取距离左部的距离
  const paddingH = (height - length) / 2 // 获取距离顶部的距离
  // 设置仪表盘整体的大小形状
  setStates('cssGauge', {
    height: `${length}px`,
    width: `${length}px`,
    top: `${paddingH}px`,
    left: `${paddingW}px`,
  })
  const dotRadius = length * 0.5 // 设置外层刻度的半径
  // 刻度的高度和宽度
  const dotHeight = `${length * 0.09}px`
  const dotWidth = `${length * 0.02}px`
  // 外层刻度的样式
  setStates('cssDot', {
    transformOrigin: `${0}px ${dotRadius}px`,
    height: dotHeight,
    width: dotWidth,
  })
  // 设置外层刻度所在区域的位置
  setStates('cssDotWrap', {
    transform: `translateX(${length * 0.5}px)`,
  })
}
onMounted(() => {
  // 定时修改 value 值
  timer.value = setInterval(() => {
    guageData.value = Math.ceil((Math.random() * 100))
  }, 2 * 1000)
  // 获取内层指示刻度的颜色
  getColorList()
  // 设置仪表盘图的 size
  setSize()
})
onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<template>
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
    <div class="gauge-title" color="black/80" dark:color="white/80">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
  /* 仪表盘区域 */
  .gauge-area {
    width: 150px;
    height: 150px;
    /* background: #121212; */
    /* animation: loading 5s linear infinite; */
  }

  /* 中间数字 */
  .gauge-title {
    font-family: Bender;
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
  @keyframes loading {
    from {
       transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
 }
</style>
