<script setup lang="ts">
interface GuageData {
  [key: string]: any
}
const area = ref<any>(null)
const timer = ref<any>(null)
const guageData = reactive<GuageData>({
  value: 33, // 当前默认value
  max: 100, // 当前刻度最大值
  outerScale: 0.85, // 表盘整体占整个 div 元素的比例
  innerScale: 0.75, // 内层刻度占外层的百分比
  cssGauge: { // 整个仪表盘的盒子
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  } as any,
  cssDotWrap: { // 装外层装饰刻度的盒子
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'translateX(250px)',
  } as any,
  cssDotWrap2: { // 装内层指示刻度的盒子
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'translateX(120px)',
  } as any,
  cssDot: { // 外层装饰刻度
    position: 'absolute',
    // backgroundColor: '#509fef',
    transformOrigin: '0px 165px',
  } as any,
  cssDot2: { // 内层指示刻度们
    position: 'absolute',
    // backgroundColor: '#509fef',
    transformOrigin: '0px 165px',
  } as any,
  colorList: [] as string[], // 内层刻度的颜色
})
const { value, cssDot, cssGauge, cssDotWrap, cssDotWrap2, cssDot2 } = toRefs(guageData)

const getGaugeRotate = computed(() => {
  return (guageData.value / guageData.max * 100) * (360 / 120) - 150
})
// 设置内环刻度颜色
const setScaleColor = (j: number) => {
  // if (j < 50)
  //   return `${guageData.colorList[j + 70]}`

  // else
  //   return guageData.colorList[j - 50]
  if (j < 70)
    return '#fa1'

  else
    return '#eee'
}
// 获取颜色列表：由蓝色逐渐变红
const getColorList = () => {
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

const getWidth = () => { // 获取指定容器的宽度
  return area.value.offsetWidth || 200
}
const getHeight = () => { // 获取指定容器的高度
  return area.value.offsetHeight || 200
}
const setStates = (prop: string, data: any) => {
  const cache = guageData[prop]
  guageData[prop] = Object.assign({}, cache, JSON.parse(JSON.stringify(data)))
}

// 设置仪表盘图的大小
const setSize = () => {
  const width = getWidth() // 获取 div 的宽度
  const height = getHeight() // 获取 div 的高度
  const shortLth = width > height ? height : width // 获取较短边
  const length = shortLth * guageData.outerScale // 根据较短边 以及 外层比例，计算实际使用的长度
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
  const innerScale = guageData.innerScale // 内层刻度占外层的比例
  // 刻度的高度和宽度
  const dotHeight = `${length * 0.04}px`
  const dotWidth = `${length * 0.01}px`
  // 外层刻度的样式
  setStates('cssDot', {
    transformOrigin: `${0}px ${dotRadius}px`,
    height: dotHeight,
    width: dotWidth,
  })
  // 内层刻度的样式
  setStates('cssDot2', {
    transformOrigin: `${0}px ${dotRadius * innerScale}px`,
    height: dotHeight,
    width: dotWidth,
  })
  // 设置外层刻度所在区域的位置
  setStates('cssDotWrap', {
    transform: `translateX(${length * 0.5}px)`,
  })
  // 设置内刻度所在区域的位置
  setStates('cssDotWrap2', {
    transform: `translate(${length * 0.5}px,${length * (1 - innerScale) / 2}px)`,
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
  <div position="relative">
    <div ref="area" class="gauge-area">
      <div :style="cssGauge">
        <div :style="cssDotWrap">
          <div
            v-for="i in 90"
            :key="i"
            :style="Object.assign({}, {
              transform: `rotateZ(${i * 4}deg)`,
              backgroundColor: setScaleColor(i),
            }, cssDot)"
          />
        </div>
        <div :style="cssDotWrap2">
          <div class="gauge-back" />
          <div
            v-for="j in 120"
            :key="j"
            :style="Object.assign({}, {
              transform: `rotateZ(${j * 3}deg)`,
              backgroundColor: setScaleColor(j),
            }, cssDot2)"
          />
        </div>
        <div
          :style="Object.assign({}, {
            transform: `rotateZ(${getGaugeRotate}deg)`,
          })"
          class="gauge-needle"
        />
      </div>
    </div>
    <div class="gauge-title">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
  /* 仪表盘区域 */
  .gauge-area {
    width: 500px;
    height: 500px;
    /* background: #121212; */
    /* animation: loading 5s linear infinite; */
  }

  /* 中间数字 */
  .gauge-title {
    font-family: Bender;
    color: #fff;
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 30%;
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
