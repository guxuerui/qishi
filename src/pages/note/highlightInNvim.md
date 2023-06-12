---
title: Neovim中的高亮显示
abstract: Neovim是一个基于Vim的现代文本编辑器, 在日常工作中, 高亮显示一些需要特殊关注的文字非常有必要, 我们可以使用高亮显示插件来支持高亮显示。
tags: note
date: 2023-05-24
chipColor: teal
---

# Neovim中的高亮显示

> 在Neovim中, 我们可以使用高亮显示插件来支持高亮显示

## 1. 在markdown文件中, 使用不同颜色高亮显示不同级别标题

### 1.1 使用 [paint.nvim](https://github.com/folke/paint.nvim)

```lua
-- paint.lua
return {
  "folke/paint.nvim",
  config = function()
    local hlmap = {
      ["^#%s+(.-)%s*$"] = "Operator",
      ["^##%s+(.-)%s*$"] = "Conditional",
      ["^###%s+(.-)%s*$"] = "String",
      ["^####%s+(.-)%s*$"] = "Number",
      ["^#####%s+(.-)%s*$"] = "Include",
      ["^######%s+(.-)%s*$"] = "Structure",
    }

    local highlights = {}

    for pattern, hl in pairs(hlmap) do
      table.insert(highlights, {
        filter = { filetype = "markdown" },
        pattern = pattern,
        hl = hl,
      })
    end

    require("paint").setup({
      highlights = highlights,
    })
  end,
}
```

### 1.2 更多可选的颜色分组

![可选颜色分组](/imgs/highlightGroup.png)

## 2. 在注释中突出显示 `@` 字符

如果, 我们想在注释中看到 `@something` 高亮显示

```lua
-- paint.lua
local highlights = {
  {
    filter = { filetype = "lua" },
    pattern = "%s*%-%-%-%s*(@%w+)",
    hl = "Constant",
  },
  {
    filter = { filetype = "javascript" },
    pattern = "%s*%/%/%s*(@%w+)",
    hl = "Constant",
  },
  {
    filter = { filetype = "javascript" },
    pattern = "%s*%*%s*(@%w+)",
    hl = "Constant",
  },
  {
    filter = { filetype = "typescript" },
    pattern = "%s*%/%/%s*(@%w+)",
    hl = "Constant",
  },
  {
    filter = { filetype = "typescript" },
    pattern = "%s*%*%s*(@%w+)",
    hl = "Constant",
  },
  {
    filter = { filetype = "vue" },
    pattern = "%s*%/%/%s*(@%w+)",
    hl = "Constant",
  },
  {
    filter = { filetype = "svelte" },
    pattern = "%s*%/%/%s*(@%w+)",
    hl = "Constant",
  },
}
```

## 3. 完整的配置

```lua
-- paint.lua
return {
  "folke/paint.nvim",
  config = function()
    local hlmap = {
      ["^#%s+(.-)%s*$"] = "Operator",
      ["^##%s+(.-)%s*$"] = "Conditional",
      ["^###%s+(.-)%s*$"] = "String",
      ["^####%s+(.-)%s*$"] = "Number",
      ["^#####%s+(.-)%s*$"] = "Include",
      ["^######%s+(.-)%s*$"] = "Structure",
    }

    local highlights = {
      {
        filter = { filetype = "lua" },
        pattern = "%s*%-%-%-%s*(@%w+)",
        hl = "Constant",
      },
      {
        filter = { filetype = "javascript" },
        pattern = "%s*%/%/%s*(@%w+)",
        hl = "Constant",
      },
      {
        filter = { filetype = "javascript" },
        pattern = "%s*%*%s*(@%w+)",
        hl = "Constant",
      },
      {
        filter = { filetype = "typescript" },
        pattern = "%s*%/%/%s*(@%w+)",
        hl = "Constant",
      },
      {
        filter = { filetype = "typescript" },
        pattern = "%s*%*%s*(@%w+)",
        hl = "Constant",
      },
      {
        filter = { filetype = "vue" },
        pattern = "%s*%/%/%s*(@%w+)",
        hl = "Constant",
      },
      {
        filter = { filetype = "svelte" },
        pattern = "%s*%/%/%s*(@%w+)",
        hl = "Constant",
      },
    }

    for pattern, hl in pairs(hlmap) do
      table.insert(highlights, {
        filter = { filetype = "markdown" },
        pattern = pattern,
        hl = hl,
      })
    end

    require("paint").setup({
      highlights = highlights,
    })
  end,
}
```
