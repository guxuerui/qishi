---
title: 序列生成器range方法
abstract: 写一个方法，输入起始数字和结束数字，以及步数，返回一个生成的数组。
tags: js
date: 2022-09-01
chipColor: yellow
---

# 序列生成器range方法

> 写一个方法，输入起始数字和结束数字，以及步数，返回一个生成的数组

## 1. for循环

```js
function range(start = 0, end, step = 1) {
  const arr = []
  if (isNaN(start))
    return arr

  else
    start = parseInt(start)

  if (end === undefined) {
    end = start
    start = 0
  }
  else {
    end = parseInt(end)
  }
  if (step === undefined || step < 1)
    step = 1

  else
    step = parseInt(step)

  for (;start <= end; start += step)
    arr.push(start)

  return arr
}

range(0, 10, 2) // -> [0, 2, 4, 6, 8, 10]
range(0, 10) // -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 2. Array.from()

```js
const range2 = (start = 0, end, step = 1) =>
  Array.from({ length: (end - start) / step + 1 },
    (_, i) => start + (i * step))

range(0, 10, 2) // -> [0, 2, 4, 6, 8, 10]
range(0, 10) // -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 3. 计算执行时间

```js
function test(func) {
  console.time(1)
  func(0, 10) // 执行待测函数
  console.timeEnd(1)
}

console.log(test(range)) // -> 0.115ms
console.log(test(range2)) // -> 0.058ms
```

> 使用`for`循环需要手动判断多个边界值，相比之下，`Array.form()`的性能要好很多
