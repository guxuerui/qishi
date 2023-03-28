---
title: 打造你的专属最强IDE
abstract: Neovim是一个基于Vim的现代文本编辑器，旨在改进Vim的可扩展性和用户友好性, 具有许多新的功能和改进，例如异步插件、内置终端、Lua API等。
tags: note
date: 2023-03-05
chipColor: teal
---

# 打造你的专属最强IDE--Neovim

![preview](https://user-images.githubusercontent.com/23629097/217407314-6c672021-c42f-46af-9e2e-62afaea1858d.png)

- Q: 什么是`Neovim`？
- A: `Neovim`是一个基于`Vim`的现代文本编辑器，它旨在改进`Vim`的可扩展性和用户友好性。`Neovim`具有许多新的功能和改进，例如异步插件、内置终端、Lua API等。

## 一、Neovim的配置

1. 安装

可以通过[官网](https://github.com/neovim/neovim/wiki/Installing-Neovim)或通过包管理器在Linux、macOS和Windows上安装Neovim。例如，在macOS/OS X上可以使用以下命令进行安装：

- Homebrew

```bash
brew install neovim
```

- Or install the development version of nvim

```bash
brew install --HEAD neovim
```

- To update the development version of Nvim:

```bash
brew upgrade neovim --fetch-HEAD
```

## 二、配置

Neovim的配置文件位于 `~/.config/nvim/init.lua（Linux和macOS）`或`$HOME/AppData/Local/nvim/init.lua(Windows)`。在这个文件中，可以配置`Neovim`的各种选项和插件。

1. 基本配置

以下是一些常用的Neovim配置选项：

```lua
Copy code
set number        " 显示行号
set tabstop=4     " tab键的宽度
set expandtab     " 将tab转换为空格
set shiftwidth=4  " 每次缩进4个空格
set smartindent   " 智能缩进
set cursorline    " 高亮当前行
syntax on         " 打开语法高亮
```

2. 插件管理器

Neovim支持多个插件管理器，例如vim-plug、dein、minpac, packer, lazy等。在这里，我们将使用[lazy.nvim](https://github.com/folke/lazy.nvim)作为插件管理器。

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- 在init.lua中添加
require("lazy").setup(plugins, opts)
```

3. 常用插件介绍

以下是我常用的Neovim插件及其介绍：

- [neo-tree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim) - 查看文件树
- [alpha-nvim](https://github.com/goolord/alpha-nvim) - 快速且可定制的启动插件
- [noice.nvim](https://github.com/folke/noice.nvim) - 消息、命令行和弹出窗的UI插件
- [lualine.nvim](https://github.com/nvim-lualine/lualine.nvim) - 快速且易于配置的底部状态栏插件
- [tabline.nvim](https://github.com/kdheepak/tabline.nvim) - A "buffer and tab" tabline
- [treesitter.nvim](https://github.com/nvim-treesitter/nvim-treesitter) - 语法规则及代码高亮

> 更多详细的配置可以参考我的 [完整配置](https://github.com/guxuerui/nvim-0.8)
