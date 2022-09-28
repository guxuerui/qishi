# 在Vue3和Ts项目中注册全局插件

> 插件(Plugins)是一种能为Vue添加全局功能的工具代码。一个插件可以是一个拥有`install()`方法的对象，也可以直接是一个安装函数本身。更多详细介绍可以查看[官方文档](https://cn.vuejs.org/guide/reusability/plugins.html)

## 1. 下面是官方示例

```ts
// plugins/i18n.ts
import type { App } from 'vue'
export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$t = (key: string) => {
      return key.split('.').reduce((o, i) => {
        if (o)
          return o[i]
        return ''
      }, options)
    }
  }
}
```

## 2. 传递参数

**引用**

```ts
// main.ts
import i18nbPlugin from './plugins/i18n'
app.use(i18nbPlugin, {
  page: {
    title: 'My Page'
  }
})
```

**在`.vue`文件中使用**

```html
<div>{{ $t('page.title') }}</div>
```

## 3. 还可以在插件中使用Provide和Inject

```ts
// plugins/i18n.ts
export default {
  install: (app: App, options: any) => {
    // ...
    app.provide('i18n', options)
  }
}
```

**然后在组件中就可以使用 `i18n` 作为key注入并访问插件的选项对象了**

```ts
// script setup
import { inject } from 'vue'
const i18n = inject('i18n')
console.log(i18n.page.title) // My Page
```

## 4. 最关键的点在这里, 为全局自定义属性设置类型

1. 当使用上面的插件时, `$t('page.title')` 会报类型错误, 找不到此全局属性的类型定义, 所以需要为它单独进行设置
2. 在 `src/` 下新建 `shim.d.ts` 文件, 使用Vue暴露的interface `ComponentCustomProperties` 为它设置类型
3. 必须有顶层的export, 即使是空的 `export {}`, 否则会覆盖Vue的源类型而不是增强
4. **这段设置不能与其他的模块声明混合, 必须在单独的文件中声明**

```ts
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}
```

> 更多的Ts类型设置可查看[官方文档](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties)
