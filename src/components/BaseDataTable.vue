<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  selectedKey: {
    type: String,
    default: '',
  },
  slotNameArr: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
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

const emit = defineEmits<{
  (e: 'onChangePage', page: number): void
  (e: 'onChangePageSize', pageSize: number): void
  (e: 'onChangeSelectedRows', selectedRows: any[]): void
}>()

const pageItems = $ref([
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
])
const selectedRows = $ref<any[]>([])
const pageSize = $ref<number>(10)
let pageNum = $ref<number>(1)

const changePage = function () {
  // 没有数据时，不会触发changePage事件
  if (props.uiTableData.data.length === 0)
    return
  emit('onChangePage', pageNum)
}
const changePageSize = function () {
  pageNum = 1
  emit('onChangePageSize', pageSize)
}

watch(() => selectedRows, (newValue) => {
  emit('onChangeSelectedRows', newValue)
}, { deep: true })
</script>

<template>
  <ui-table
    v-model="selectedRows"
    fullwidth
    :data="uiTableData.data"
    :thead="uiTableData.thead"
    :tbody="uiTableData.tbody"
    :selected-key="selectedKey"
    :row-checkbox="showCheckbox"
    :show-progress="uiTableData.showProgress"
    class="border-none"
    :style="{ height: tableHeight }"
  >
    <!-- 这里是具体字段的slot, 动态插槽 -->
    <template v-for="(item, index) in slotNameArr" :key="index" #[item]="{ data }: any">
      <slot :name="item" :data="data" />
    </template>
    <div v-if="uiTableData.data.length === 0" class="text-center py-4 text-grey">
      暂无数据
    </div>
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
