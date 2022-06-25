# vite-plugin-vue-markdown

[![NPM version](https://img.shields.io/npm/v/vite-plugin-vue-markdown?color=a1b858)](https://www.npmjs.com/package/vite-plugin-vue-markdown)

Compile Markdown to Vue component. A lite version of [vite-plugin-md](https://github.com/antfu/vite-plugin-md).

- Use Markdown as Vue components
- Use Vue components in Markdown

```bash
npm i vite-plugin-vue-markdown -D # yarn add vite-plugin-vue-markdown -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown()
  ],
}
```

And import it as a normal Vue component

## Import Markdown as Vue components

```html
<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './README.md'

export default {
  components: {
    HelloWorld,
  },
}
</script>
```
