<script setup lang="ts">
import type { Area, BlockArea, SearchIndex } from '~/types'

defineProps({
  postInfo: {
    type: Object,
    required: false,
    default: () => ({
      title: '用vue3写个魔方',
      abstract: '这是用vue3写的模仿',
      tags: 'game',
      date: '2022-0901',
      chipColor: 'cyan',
    }),
  },
})

const ifMobile = isMobile()
const ifSafari = isSafari()
const count = $ref<number>(3)
const side = $ref<number>(50)
let transitionVal = $ref<number>(0)
let rotateX = $ref<number>(-30)
let rotateY = $ref<number>(30)
let directArr = $ref<string[]>([])

const transformDirection = $ref<SearchIndex>({
  top: `translateY(-${side}px) rotateX(90deg)`,
  bottom: `translateY(${side}px) rotateX(-90deg)`,
  left: `translateX(-${side}px) rotateY(-90deg)`,
  right: `translateX(${side}px) rotateY(90deg)`,
  before: 'translateZ(0px)',
  after: `translateZ(-${side}px)`,
})

function getTransformDirection(direct: string) {
  return transformDirection[direct]
}
const colors: SearchIndex = {
  top: '#FF0',
  bottom: '#FCCC08',
  left: '#D63F2E',
  right: '#009D54',
  before: '#fff',
  after: '#3C81F6',
}
function getAreas(x: number, y: number, z: number) {
  const areas = [] as Area[]
  if (x === 0)
    areas.push(getArea('left'))
  if (x === count - 1)
    areas.push(getArea('right'))
  if (y === 0)
    areas.push(getArea('top'))
  if (y === count - 1)
    areas.push(getArea('bottom'))
  if (z === 0)
    areas.push(getArea('before'))
  if (z === count - 1)
    areas.push(getArea('after'))

  return areas
}
function getArea(direct: string) {
  return {
    direct,
    transform: getTransformDirection(direct),
    color: colors[direct],
  }
}

const blocks = ref<BlockArea[]>([])
blocks.value = Array.from({ length: count }, (_, x) =>
  Array.from({ length: count },
    (_, y) => Array.from({ length: count },
      (_, z) => ({
        x,
        y,
        z,
        rotate: {
          x: 0, y: 0, z: 0,
        },
        areas: getAreas(x, y, z),
      }),
    ),
  ),
).flat(2)

function blockTransform(block: BlockArea) {
  return `
    translateX(${side * block.x}px) translateY(${side * block.y}px) translateZ(-${side * block.z}px)
    rotateX(${block.rotate.x}deg) rotateY(${block.rotate.y}deg) rotateZ(${block.rotate.z}deg)
  `
}

let diffx = $ref<number>(0)
let diffy = $ref<number>(0)
function getOrigin(block: BlockArea) {
  if (ifSafari || ifMobile.value)
    return
  if (Math.abs(diffx) > Math.abs(diffy)) {
    const isRotateZ = directArr.includes('top') || directArr.includes('bottom')
    if (isRotateZ) {
      if (block.x === 0 && block.y === 0)
        return `${count * side / 2}px ${count * side / 2}px 0`
      if (block.x === 0 && block.y === 1)
        return `${count * side / 2}px ${side / 2}px 0`
      if (block.x === 0 && block.y === 2)
        return `${count * side / 2}px -${side / 2}px 0`
      if (block.x === 1 && block.y === 0)
        return `${side / 2}px ${count * side / 2}px 0`
      if (block.x === 1 && block.y === 1)
        return `${side / 2}px ${side / 2}px 0`
      if (block.x === 1 && block.y === 2)
        return `${side / 2}px -${side / 2}px 0`
      if (block.x === 2 && block.y === 0)
        return `-${side / 2}px ${count * side / 2}px 0`
      if (block.x === 2 && block.y === 1)
        return `-${side / 2}px ${side / 2}px 0`
      if (block.x === 2 && block.y === 2)
        return `-${side / 2}px -${side / 2}px 0`
    }
    else {
      if (block.z === 0 && block.x === 0)
        return `${count * side / 2}px ${side / 2}px -${count * side / 2}px`
      if (block.z === 0 && block.x === 1)
        return `${side / 2}px ${side / 2}px -${count * side / 2}px`
      if (block.z === 0 && block.x === 2)
        return `-${side / 2}px ${side / 2}px -${count * side / 2}px`
      if (block.z === 1 && block.x === 0)
        return `${count * side / 2}px ${count * side / 2}px -${side / 2}px`
      if (block.z === 1 && block.x === 1)
        return `${side / 2}px 0 -${side / 2}px`
      if (block.z === 1 && block.x === 2)
        return `-${side / 2}px 0 -${side / 2}px`
      if (block.z === 2 && block.x === 0)
        return `${count * side / 2}px ${count * side / 2}px ${side / 2}px`
      if (block.z === 2 && block.x === 1)
        return `${side / 2}px 0 ${side / 2}px`
      if (block.z === 2 && block.x === 2)
        return `-${side / 2}px 0 ${side / 2}px`
    }
  }
  else {
    const isRotateZ = directArr.includes('left') || directArr.includes('right')
    if (isRotateZ) {
      if (block.x === 0 && block.y === 0)
        return `${count * side / 2}px ${count * side / 2}px 0`
      if (block.x === 0 && block.y === 1)
        return `${count * side / 2}px ${side / 2}px 0`
      if (block.x === 0 && block.y === 2)
        return `${count * side / 2}px -${side / 2}px 0`
      if (block.x === 1 && block.y === 0)
        return `${side / 2}px ${count * side / 2}px 0`
      if (block.x === 1 && block.y === 1)
        return `${side / 2}px ${side / 2}px 0`
      if (block.x === 1 && block.y === 2)
        return `${side / 2}px -${side / 2}px 0`
      if (block.x === 2 && block.y === 0)
        return `-${side / 2}px ${count * side / 2}px 0`
      if (block.x === 2 && block.y === 1)
        return `-${side / 2}px ${side / 2}px 0`
      if (block.x === 2 && block.y === 2)
        return `-${side / 2}px -${side / 2}px 0`
    }
    else {
      if (block.y === 0 && block.z === 0)
        return `0 ${count * side / 2}px -${count * side / 2}px`
      if (block.y === 0 && block.z === 1)
        return `0 ${count * side / 2}px -${side / 2}px`
      if (block.y === 0 && block.z === 2)
        return `0 ${count * side / 2}px ${side / 2}px`
      if (block.y === 1 && block.z === 0)
        return `0 ${side / 2}px -${count * side / 2}px`
      if (block.y === 1 && block.z === 1)
        return `0 ${side / 2}px -${side / 2}px`
      if (block.y === 1 && block.z === 2)
        return `0 ${side / 2}px ${side / 2}px`
      if (block.y === 2 && block.z === 0)
        return `0 -${side / 2}px -${count * side / 2}px`
      if (block.y === 2 && block.z === 1)
        return `0 -${side / 2}px -${side / 2}px`
      if (block.y === 2 && block.z === 2)
        return `0 -${side / 2}px ${side / 2}px`
    }
  }
}

// monitor keyboard event
const { arrowup, arrowdown, arrowleft, arrowright } = useMagicKeys()
watchEffect(() => {
  if (arrowup.value)
    rotateX += 20
  if (arrowdown.value)
    rotateX -= 20
  if (arrowleft.value)
    rotateY -= 20
  if (arrowright.value)
    rotateY += 20
})

function rotateBlockX(x: number, reverse: boolean) {
  blocks.value.forEach((block: BlockArea) => {
    const { y: oldy, z: oldz } = block
    if (block.x === x) {
      if (reverse) {
        block.rotate.x += 90
        setTimeout(() => {
          transitionVal = 0
          block.y = oldz
          block.z = count - 1 - oldy
          block.rotate.x = 0
          block.areas.forEach((area: Area) => {
            switch (area.direct) {
              case 'top':
                area.direct = 'after'
                break
              case 'after':
                area.direct = 'bottom'
                break
              case 'bottom':
                area.direct = 'before'
                break
              case 'before':
                area.direct = 'top'
                break
            }

            area.transform = getTransformDirection(area.direct)
          })
        }, 500)
      }
      else {
        block.rotate.x -= 90
        setTimeout(() => {
          transitionVal = 0
          block.z = oldy
          block.y = count - 1 - oldz
          block.rotate.x = 0
          block.areas.forEach((area: Area) => {
            switch (area.direct) {
              case 'top':
                area.direct = 'before'
                break
              case 'before':
                area.direct = 'bottom'
                break
              case 'bottom':
                area.direct = 'after'
                break
              case 'after':
                area.direct = 'top'
                break
            }

            area.transform = getTransformDirection(area.direct)
          })
        }, 500)
      }
    }
  })
}

function rotateBlockY(y: number, reverse: boolean) {
  blocks.value.forEach((block: BlockArea) => {
    const { x: oldx, z: oldz } = block
    if (block.y === y) {
      if (reverse) {
        block.rotate.y -= 90
        setTimeout(() => {
          transitionVal = 0
          block.x = oldz
          block.z = count - 1 - oldx
          block.rotate.y = 0
          block.areas.forEach((area: Area) => {
            switch (area.direct) {
              case 'left':
                area.direct = 'after'
                break
              case 'before':
                area.direct = 'left'
                break
              case 'right':
                area.direct = 'before'
                break
              case 'after':
                area.direct = 'right'
                break
            }

            area.transform = getTransformDirection(area.direct)
          })
        }, 500)
      }
      else {
        block.rotate.y += 90
        setTimeout(() => {
          transitionVal = 0
          block.z = oldx
          block.x = count - 1 - oldz
          block.rotate.y = 0
          block.areas.forEach((area: Area) => {
            switch (area.direct) {
              case 'left':
                area.direct = 'before'
                break
              case 'before':
                area.direct = 'right'
                break
              case 'right':
                area.direct = 'after'
                break
              case 'after':
                area.direct = 'left'
                break
            }

            area.transform = getTransformDirection(area.direct)
          })
        }, 500)
      }
    }
  })
}

function rotateBlockZ(z: number, reverse: boolean) {
  blocks.value.forEach((block: BlockArea) => {
    const { x: oldx, y: oldy } = block
    if (block.z === z) {
      if (reverse) {
        block.rotate.z -= 90
        setTimeout(() => {
          transitionVal = 0
          block.x = oldy
          block.y = count - 1 - oldx
          block.rotate.z = 0
          block.areas.forEach((area: Area) => {
            switch (area.direct) {
              case 'top':
                area.direct = 'left'
                break
              case 'left':
                area.direct = 'bottom'
                break
              case 'bottom':
                area.direct = 'right'
                break
              case 'right':
                area.direct = 'top'
                break
            }

            area.transform = getTransformDirection(area.direct)
          })
        }, 500)
      }
      else {
        block.rotate.z += 90
        setTimeout(() => {
          transitionVal = 0
          block.y = oldx
          block.x = count - 1 - oldy
          block.rotate.z = 0
          block.areas.forEach((area: Area) => {
            switch (area.direct) {
              case 'top':
                area.direct = 'right'
                break
              case 'right':
                area.direct = 'bottom'
                break
              case 'bottom':
                area.direct = 'left'
                break
              case 'left':
                area.direct = 'top'
                break
            }

            area.transform = getTransformDirection(area.direct)
          })
        }, 500)
      }
    }
  })
}

function handleMousedown(block: BlockArea, area: Area, event?: MouseEvent) {
  const { x, y, z } = block
  directArr = []
  const startX = event?.pageX || event?.clientX || 0
  const startY = event?.pageY || event?.clientY || 0
  document.onmouseup = (ev: MouseEvent) => {
    transitionVal = 0.5
    const endX = ev.pageX || ev.clientX || 0
    const endY = ev.pageY || ev.clientY || 0
    diffx = endX - startX
    diffy = endY - startY
    if (Math.abs(diffx) > Math.abs(diffy)) {
      if (diffx > 0) {
        if (area.direct === 'top' || area.direct === 'bottom') {
          directArr = ['top', 'bottom']
          rotateBlockZ(z, false)
        }
        else { rotateBlockY(y, false) }
      }
      else {
        if (area.direct === 'top' || area.direct === 'bottom') {
          directArr = ['top', 'bottom']
          rotateBlockZ(z, true)
        }
        else { rotateBlockY(y, true) }
      }
    }
    else {
      if (diffy > 0) {
        if (area.direct === 'left' || area.direct === 'right') {
          directArr = ['left', 'right']
          rotateBlockZ(z, true)
        }
        else { rotateBlockX(x, false) }
      }
      else {
        if (area.direct === 'left' || area.direct === 'right') {
          directArr = ['left', 'right']
          rotateBlockZ(z, false)
        }
        else { rotateBlockX(x, true) }
      }
    }

    document.onmouseup = null
  }
}
</script>

<template>
  <div v-if="!ifMobile" class="flex flex-col md:flex-row">
    <div>
      <p class="text-center mt-0 mb-4">
        点击键盘方向按键旋转魔方
      </p>
      <div class="flex gap-2 justify-center">
        <Key :value="arrowup">
          <div i-carbon-arrow-up />
        </Key>
        <Key :value="arrowdown">
          <div i-carbon-arrow-down />
        </Key>
        <Key :value="arrowleft">
          <div i-carbon-arrow-left />
        </Key>
        <Key :value="arrowright">
          <div i-carbon-arrow-right />
        </Key>
      </div>
    </div>
  </div>
  <div class="wrap">
    <div
      class="content"
      :style="{
        width: `${count * side}px`,
        height: `${count * side}px`,
        transformOrigin: `${count * side / 2}px ${count * side / 2}px -${count * side / 2}px`,
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0)`,
      }"
    >
      <div
        v-for="block, i in blocks"
        :key="i"
        :x="block.x"
        :y="block.y"
        :z="block.z"
        :style="{
          width: `${side}px`,
          height: `${side}px`,
          transformOrigin: getOrigin(block),
          transform: blockTransform(block),
          transition: `transform ${transitionVal}s linear`,
        }"
      >
        <p
          v-for="area, index in block.areas"
          :key="index"
          :class="area.direct"
          :style="{
            background: area.color,
            transform: area.transform,
          }"
          @mousedown.prevent="handleMousedown(block, area, $event)"
        />
      </div>
    </div>
  </div>
  <div class="markdown-body">
    <blockquote>
      <p>注: 当前版本只能在Chrome最新浏览器中使用</p>
      <a href="https://github.com/guxuerui/qishi/blob/main/src/pages/game/magicCube.vue" target="_blank">源码地址</a>
    </blockquote>
  </div>
</template>

<style scoped>
  .wrap {
    width: 100%;
    height: 50vh;
    perspective: 1200px;
    display: flex;
  }
  .content {
    transform-style: preserve-3d;
    position: relative;
    margin: auto;
  }
  .content > div {
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content > div > p {
    border: 2px solid #000;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .top {
    transform-origin: bottom;
  }
  .bottom {
    transform-origin: top;
  }
  .left {
    transform-origin: right;
  }
  .right {
    transform-origin: left;
  }
</style>
