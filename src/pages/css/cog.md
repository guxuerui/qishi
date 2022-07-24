# 使用纯CSS实现樱花般的齿轮动画

## 1. HTML
HTML结构非常简单，只需要几个div
```html
  <div class="cog">
    <div />
    <div />
    <div />
  </div>
```
## 2. CSS
- 首先给几个div定位,  这里的`--cogBg`是背景颜色，可以适配light和dark模式
```css
  .cog {
    width: 50px;
    height: 50p;
    position: relative;
    --cogBg: #fff;
  }
  html.dark .cog {
    --cogBg: #1d1e22;
  }
  .cog div {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: #FF4560;
    border-radius: 5px;
  }
```
- 这时几个div是重叠在一起的，接下来需要让它们错位开
```css
  .cog div:first-child {
    transform: rotate(120deg);
  }
  .cog div:nth-child(2) {
    transform: rotate(240deg)
  }
```
- 现在得到了实心的齿轮，然后再让它镂空
```css
  .cog::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--cogBg);
  }
```
- 最后，让它动起来吧~
```css
  .cog {
    animation: spin 4s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
```

<Cog m="4"/>
