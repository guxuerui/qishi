---
title: 找出数组中只出现过一次的数
abstract: 给定一个数组，其中有一个数字只出现了一次，写一个方法，返回这个数字。
tags: js
date: 2022-07-25
chipColor: yellow
---

# 找出数组中只出现过一次的数

> 给定一个数组，其中有一个数字只出现了一次，写一个方法，返回这个数字

```ts
// 给定数组
const item = [3, 3, 2, 5, 5]
```

## 1. 第一种方法

先将数组原地排序，然后通过`for`循环依次比对

```ts
const getRes = (item) => {
  item.sort()
  for (let i = 0; i < item.length; i += 2) {
    if (item[i] !== item[i + 1])
      return item[i]

  }
}

getRes(item) // -> 2
```

## 2. 第二种方法

使用异或运算符`^`，表示若两个二进制位不相同，则结果为1，否则为0，比如`3 ^ 3 = 0; 0 ^ 3 = 3`

```ts
const getSingleNumber = (item) => {
  let res = 0
  for (let i = 0; i < item.length; i++)
    res ^= item[i]

  return res
}

getSingleNumber(item) // -> 2
```

## 3. 第三种方法

使用`reduce`

```ts
const getNum = (nums) => {
  return nums.reduce((prev, next) => {
    return prev ^ next
  }, 0)
}

getNum(item) // -> 2
```

## 4. 第四种方法

使用Map()将只出现了一次的数字存储，最后通过`for...of`操作将数字返回

```ts
const getSingNum = (item) => {
  const map = new Map() 
  for (const num of item) {
    if (map.has(num))
      map.set(num, map.get(num) + 1)
    else
      map.set(num, 1)
  }

  for (const [key, value] of map) {
    if (value === 1)
      return key
  }

  return null
}

getSingNum(item) // -> 2
```

## 5. 第五种方法

用普通对象结构，将每个数字出现的次数存起来，最后通过对象的`Object.entries()`方法返回此数字

```ts
const getSingNum2 = (item) => {
  const res = {}
  for (let i = 0; i < item.length; i++)
    res[item[i]] = res[item[i]] ? res[item[i]] + 1 : 1

  for (const [k, v] of Object.entries(res)) {
    if (v === 1)
      return k
  }
}

getSingNum2(item) // -> 2
```
