# 重构BalmUI表格组件

> 背景: 因为在做ToB的业务时，经常会有增删改查的页面，需要用到表格组件，为了提高开发复用效率，所以二次封装了BalmUI的表格组件

## 为什么要二次封装?

当我们只有个别几个页面里使用表格组件时，确实没有太大的必要在做二次封装，甚至可能会显得更加麻烦。
但是，假设你有10个、20个页面都需要用到此表格组件的时候，那么进行二次封装就显得很有必要了。
首先，表格本身和分页部分都是可复用的，二次封装之后，就可以省去很多重复的代码

原始表格组件可以查看 [BalmUI DataTable](https://material.balmjs.com/data-display/table)

## 开干

### 1. 定义需要传入的属性

```ts
// <script setup lang="ts">
/*
  showCheckbox -> 是否展示复选框
  tableHeight -> 表格高度
  uiTableData -> 表格所需要的thead、tbody、和data等属性
*/
defineProps({
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  tableHeight: {
    type: String,
    default: '500px',
  },
  uiTableData: {
    type: Object,
    default: () => ({
      data: [],
      thead: [],
      tbody: [],
      total: 0,
      showProgress: false,
    }),
  },
})

// 定义对父组件提供的方法
const emit = defineEmits<{
  (e: 'onChangePage', page: number): void
  (e: 'onChangePageSize', pageSize: number): void
}>()

// 定义表格的size -> 每页展示多少条数据
const pageItems = $ref([
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
])
// 分页页码
const pageNum = $ref<number>(1)

// 表格默认条数
const pageSize = $ref<number>(10)

// 复选表格所选中的值
const selectedRows = $ref<string[] | number[]>([])

// 切换页码
const changePage = () => {
  emit('onChangePage', pageNum)
}

// 切换每页展示多少条数据
const changePageSize = () => {
  emit('onChangePageSize', pageSize)
}
````

### 2. 基本的DOM结构

`<v-divider />`是 [vuetify](https://next.vuetifyjs.com/en/components/dividers/) 组件

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

### 3. 基本完成

到这里，二次封装就基本完成了，在父组件中使用只需要传入所需要的数据，表格组件的各种功能已经可以正常使用了。
但是，还是有那么些特殊情况，需要对某一列或某几列的数据做特殊处理，比如对状态列做样式定制，此时就需要再做进一步处理

首先需要增加`props属性`，在父组件中指定一个或多个需要特殊处理的字段，使用插槽进行处理

```ts
import type { PropType } from 'vue'

defineProps({
  slotNameArr: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})
```

然后在模板中增加插槽，插槽使用方法具体可查看官方文档 [Vue插槽](https://staging-cn.vuejs.org/guide/components/slots.html)

```html
<ui-table
  v-model="selectedRows"
  fullwidth
  :data="uiTableData.data"
  :thead="uiTableData.thead"
  :tbody="uiTableData.tbody"
  :row-checkbox="showCheckbox"
  :show-progress="uiTableData.showProgress"
  :style="{ height: tableHeight }"
>
  <!-- 这里是具体字段的slot, 使用动态插槽 -->
  <template
    v-for="(item, index) in slotNameArr"
    :key="index"
    #[item]="{ data }: any"
  >
    <slot :name="item" :data="data" />
  </template>
  <!-- 判断表格数据为空的情况 -->
  <div
    v-if="uiTableData.data.length === 0"
    class="text-center py-4 text-grey"
  >
    暂无数据
  </div>
</ui-table>
```

## 搞定啦

现在就可以直接使用这个封装好的 `BaseTableData` 组件了，如果不需要对列数据做特殊处理或编辑等操作，
就可以只定义 `uiTableData` 属性, 其他操作都不需要

```ts
const tableData = $ref({
  data: [],
  thead: [],
  tbody: [],
  total: 0,
  showProgress: false
})

function handleChangePage() {
  // do something...
}

function handleChangePageSize() {
  // do something...
}
```

```html
<BaseDataTable
  :uiTableData="tableData"
  @on-change-page="handleChangePage"
  @on-change-page-size="handleChangePageSize"
/>
```

如果需要对某一列做特殊处理，就需要传入slot了，比如

```html
<BaseDataTable
  :uiTableData="tableData"
  :slot-name-arr="['status']"
  @on-change-page="handleChangePage"
  @on-change-page-size="handleChangePageSize"
>
  <template #status="{ data }: any">
    <!-- 这里做具体的处理 -->
    {{ data.status }}
  </template>
</BaseDataTable>
```

[文件仓库地址](https://github.com/guxuerui/qishi/blob/main/src/components/BaseDataTable.vue)

> 在日常业务开发中，感觉需要这种二次封装的组件还是比较多的，所以梳理下思路，记录一下~
