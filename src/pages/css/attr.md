<script setup lang="ts">
import Attr from '~/components/Attr.vue'
</script>

# CSS语法之attr()

> Tips: attr() 理论上能用于所有的 CSS 属性但目前支持的仅有伪元素的`content`属性, 浏览器兼容性有些惨不忍睹, 其他的属性和高级特性目前是实验性的

## 1. 概述

CSS 表达式 `attr()` 用来获取选择到的元素的某一 HTML 属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素

其中
* `attribute-name`是 CSS 所引用的 HTML 属性名称
* `type-or-unit`是 表示所引用的属性值的单位。如果该单位相对于所引用的属性值不合法，那么`attr()`表达式也不合法. 若省略，则默认值为string.
全部属性可查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)
* 如果 HTML 元素缺少所规定的属性值或属性值不合法，则使用`fallback`值。该值必须合法，且不能包含另一个`attr()`表达式
 如果`attr()`不是所在 CSS 属性值的唯一值，其 `fallback` 值必须为 `type-or-unit` 所指定的类型，否则 CSS 会使用相应 `type-or-unit` 定义的默认值

## 2. 举个栗子 -> Tooltip提示框

<Attr />

HTML:

```html
  <p>
    Hover
    <span class="tooltip" data-tooltip="I am tooltip content">
      Here
    </span>
    to see the tooltip.
  </p>
```

CSS:

```css
  .tooltip {
    position: relative;
    border-bottom: 1px dotted rgba(107, 114, 128, 1);
  }

  .tooltip::before {
    content: attr(data-tooltip);
    position: absolute;
    width: 100px;
    background-color: #062B45;
    color: #fff;
    text-align: center;
    padding: 10px;
    line-height: 1.2;
    border-radius: 6px;
    z-index: 1;
    opacity: 0;
    transition: opacity .5s;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    font-size: 0.75rem;
    visibility: hidden;
  }

  .tooltip:hover::before,
  .tooltip:hover::after {
    opacity: 1;
    visibility: visible;
  }
```
