---
title: CSS水平垂直居中方法大全
abstract: CSS实现水平垂直居中的七种方法，这些方法可以帮助我们在工作中更加便捷地实现元素的居中布局，也是面试中常考的知识点。
tags: css
date: 2022-12-12
chipColor: blue
---

# CSS水平垂直居中方法大全

> 水平垂直居中是工作经常需要用到的技巧，也是面试常考题

HTML:

```html
<div class="outer">
  <div class="inner">inner</div>
</div>
```

CSS:

```css
.outer {
  width: 300px;
  height: 300px;
  background-color: aqua;
}
.inner {
  width: 100px;
  height: 100px;
  background-color: chartreuse;
}
```

> Tip: 这些代码将在各示例中复用

## 二、方案总结

1. Flex
2. Grid
3. absolute + transform
4. absolute + calc
5. absolute + 负 margin
6. absolute + margin: auto
7. writing-mode

### 1. Flex

**优点: 不需要固定居中元素的宽高**

- 第一种写法

```css
.outer {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
```

- 另一种写法

```css
.outer {
  display: flex;
}
.inner {
  margin: auto;
}
```

因为设置了`display: flex`后父元素就变成了`FFC(弹性盒格式化上下文)`, 在`FFC`中`margin-top` 和 `margin-bottom` 的值如果是 `auto`，则他们平均分配垂直方向上的剩余空间,
并且使用了`margin: auto` 的 flex 子项目，它们父元素设置的 `justify-content` 以及它们本身的 `align-self` 将不再生效

### 2. Grid

**优点: 不需要固定居中元素的宽高**

- 第一种写法

```css
.outer {
  display: grid;
}

.inner {
  justify-self: center; /* 水平居中 */
  align-self: center; /* 垂直居中 */
}
```

- 第二种写法

```css
.outer {
  display: grid;
}

.inner {
  margin: auto;
}
```

`grid`和`flex`类似，但`grid`更强大，它是二维布局，声明`display: grid`后会创建`GFC(网格格式化上下文)`, 设置子元素 `margin: auto` 后，将会平分垂直方向的剩余空间

### 3. absolute + transform

**优点: 不需要固定居中元素的宽高**

```css
.outer {
  position: relative;
}
.inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

CSS3中新增的 `transform`，其 `translate` 属性是根据元素自身计算的。例如：设置 `transform: translateX(-50%)`，元素会向左偏移自身宽度的一半

### 4. absolute + calc

**缺点: 需要固定居中元素的宽高**

```css
.outer {
  position: relative;
}
.inner {
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
```

### 5. absolute + 负margin

**缺点: 需要固定居中元素的宽高**

```css
.outer {
  position: relative;
}

.inner {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

### 6. absolute + margin: auto

**缺点: 需要设置居中元素的宽高，否则其宽高会被设置为100%**

```css
.outer {
  position: relative;
}
.inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
```

使用了 CSS 中的定位属性`absolute`、`fixed` 等）后，如果 `left` 设置了具体值，没有设置 `right` 和 `width`，那么就会自动计算，把剩余的空间分配给 `right` 和 `width`。
如果 `left`、`right` 和 `width` 都设置了具体值，并且没有占满横向空间，那么剩余空间就处于待分配状态，此时设置 `margin: auto` 意味着把剩余的空间分配给 `margin`，
并且左右均分，所以就实现了水平居中，垂直方向同理

### 7. writing-mode

`writing-mode` 可以改变文字显示方向。例如，将文字垂直显示

```html
<div>垂直文字</div>
```

```css
div {
  writing-mode: vertical-lr;
}
```

显示效果为

```html
垂
直
文
字
```

该属性最神奇的地方在于，不仅可以使文字显示方向改变，还能使所有作用于水平方向上的属性，变成作用于垂直方向。
所以，通过 `writing-mode` 和 `text-align: center` 就可以实现垂直居中了

这里需要先改造下DOM结构

```html
<div class="outer">
  <div class="inner">
    <div class="content"></div>
  </div>
</div>
```

CSS

```css
.outer {
  writing-mode: vertical-lr;
  text-align: center;
}

.inner {
  display: inline-block;
  width: 100%;
  height: auto;
  writing-mode: horizontal-tb;
  text-align: center;
}

.content {
  display: inline-block;
  text-align: left; /* 重置文字位置（如果需要） */
}
```
