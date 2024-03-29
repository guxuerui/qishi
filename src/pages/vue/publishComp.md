---
title: 发布vue3组件到npm
abstract: 如何使用vite+ts+vue3开发组件, 并将其发布到npm。包括组件开发、创建install.ts、配置vite.config.ts、发布到npm等。
tags: vue
date: 2022-12-04
chipColor: green
---

# 发布vue3组件到npm

> 记录一下使用vite+ts+vue3开发的组件，发布到npm的过程

## 1. 组件开发

这一步就是正常的vue组件开发, 比如时间轴组件: [pretty-timeline](https://github.com/guxuerui/pretty-timeline)

## 2. 创建install.ts

注册开发好的组件并导出

```ts
// 引入封装好的组件
import PrettyTimeline from './PrettyTimeline.vue'

export default {
  install: (app: any): void => {
    app.component('PrettyTimeline', PrettyTimeline)
  },
}

export { PrettyTimeline }
```

## 3. 配置vite.config.ts

打包配置

```ts
import { defineConfig } from 'vite'

export default defineConfig ({
  build: {
    emptyOutDir: true,
    lib: {
      // 这里入口文件是创建好的install.ts
      entry: path.resolve(__dirname, 'src/components/install.ts'),
      name: 'pretty-timeline',
      fileName: format => `pretty-timeline.${format}.ts`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

## 4. 配置package.json

> `"type": "module"` 必须得有

```json
{
  "name": "pretty-timeline",
  "type": "module",
  "version": "1.1.5",
  "packageManager": "pnpm@7.1.5",
  "description": "vue3 pretty timeline",
  "author": "guxuerui",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/guxuerui/pretty-timeline"
  },
  "keywords": [
    "vue3",
    "Vue3",
    "pretty",
    "timeline",
    "vue3-timeline"
  ],
  "exports": {
    ".": {
      "require": "./dist/pretty-timeline.umd.ts",
      "import": "./dist/pretty-timeline.es.ts"
    },
    "./dist/style.css": "./dist/style.css"
  },
  "main": "./dist/pretty-timeline.umd.ts",
  "module": "./dist/pretty-timeline.es.ts",
  "files": [
    "dist/*"
  ]
}
```

## 5. 发布到npm

- npm version patch | npm version minor | npm version major
- npm run build | pnpm run build
- npm login
- npm publish

## 6. 使用发布到npm的包

> [About Issue](https://github.com/vuejs/core/issues/2064)

如果发布前使用 `npm link` 对包进行了测试，那么在 `npm install` 后使用组件可能会报错，导致组件不能渲染,
原因大概是因为 `vue源码` 执行了两次, 需要添加如下配置

- 如果使用 `vite`

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig ({
  resolve: {
    dedupe: ['vue'],
  },
})
```

- 如果使用 `webpack`

```ts
// vue.config.js
const path = require('node:path')

module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue')
      }
    }
  }
}
```
