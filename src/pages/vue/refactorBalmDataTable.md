# 重构BalmUI表格组件

> 背景: 因为在做ToB的业务时，经常会有增删改查的页面，需要用到表格组件，为了提高开发复用效率，所以二次封装了BalmUI的表格组件

## 为什么要二次封装?
当我们只有个别几个页面里使用表格组件时，确实没有太大的必要在做二次封装，甚至可能会显得更加麻烦。
但是，假设你有10个、20个页面都需要用到此表格组件的时候，那么进行二次封装就显得很有必要了。
首先，表格本身和分页部分都是可复用的，二次封装之后，就可以省去很多重复的代码

原始表格组件可以查看 [BalmUI DataTable](https://material.balmjs.com/data-display/table)

## 开干

### 1. 基本的DOM结构
```html
<template>
  <ui-table
    v-model="selectedRows"
    fullwidth
    :data="uiTableData.data"
    :thead="uiTableData.thead"
    :tbody="uiTableData.tbody"
    :row-checkbox="showCheckbox"
    :show-progress="uiTableData.showProgress"
    class="border-none"
    :style="{ height: tableHeight }"
  >
  </ui-table>
  <v-divider />
  <ui-pagination
    v-model="pageNum"
    :total="uiTableData.total"
    show-total
    show-jumper
    :page-size="uiTableData.pageSize"
    :jumper-text="['跳转', '至']"
    class="pa-4"
    @update:model-value="changePage"
  >
    <template #default>
      每页
      <ui-select
        v-model="pageSize"
        style="width: 100px"
        class="mx-1"
        outlined
        :options="pageItems"
        @update:model-value="changePageSize"
      />
      条
      <span class="ml-2">共 {{ uiTableData.total }} 条</span>
    </template>
  </ui-pagination>
</template>
```

未完待续...
