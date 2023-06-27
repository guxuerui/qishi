---
title: 给node_modules打补丁
abstract: 有时候在工作中，可能会遇到使用的第三方包存在bug，比如某个UI库的某个组件，这时来不及等官方库解决，所以要自己给对应的库打补丁(patch)
tags: vue
date: 2023-06-12
chipColor: green
---

# 给node_modules打补丁

> 背景: 最近在工作中, 使用Vue3 UI库 [BalmUI](https://material.balmjs.com/) 的 `<ui-tree>` 组件的时候, 发现不能自动展开选中的树节点, 因为时间紧急，所以先手动给 `balm-ui` 包打了patch(补丁)

## 1. 安装patch-package

```bash
npm install patch-package -D

# or
(pnpm | yarn) add patch-package -D
```

## 2. 修改本地源码

**找到要修改的包在 `node_modules` 中对应的位置, 并修改对应组件的源码, 保证在本地测试通过**

## 3. 修改package.json

在 `scripts` 中增加 alias

```bash
"scripts": {
  ...,
  "postinstall": 'patch-package'
}
```

## 4. 执行补丁

给对应包执行打补丁操作命令: npx patch-package `对应的包名`

```bash
npx patch-package balm-ui
```

最后会生成一个 `patches` 文件夹, 其中包含所有以 `diff` 方式生成的补丁, 将生成的patch文件提交到远程仓库中, 以后每次重新执行 `install` 都会自动生成一个新的补丁~

> 此功能已经合并到源仓库中, **PR**: [feat(tree.vue): add new props autoExpandSelected and autoExpandAll](https://github.com/balmjs/balm-ui/pull/168)
