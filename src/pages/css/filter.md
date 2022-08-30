<script setup lang="ts">
import Filter from '~/components/filter.vue'
</script>

# CSS语法之filter

> CSS属性 filter 将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染

下面列举一些常用的属性

<Filter />

CSS使用示例

```css
  /* 灰度 */
  filter: grayscale(10%);
  /* 褐度 */
  filter: sepia(100%);
  /* 色彩纯度：色彩的构成要素之一，数值越大，表现越鲜明，否则表现则越暗淡 */
  filter: saturate(100%);
  /* 色相旋转 */
  filter: hue-rotate(200deg);
  /* 反色 */
  filter: invert(100%);
  /* 透明度 */
  filter: opacity(50%);
  /* 亮度 */
  filter: brightness(120%);
  /* 对比度 */
  filter: contrast(363%);
  /* 模糊度 */
  filter: blur(3px);
  /* 阴影 */
  filter: drop-shadow(2px 4px 8px #585858);
```

