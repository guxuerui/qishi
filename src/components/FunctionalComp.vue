<script setup lang="ts">
const ListComponent = function (props: any, { _slots, emit, _attrs }) {
  const { list, activeIndex } = props
  const handleToggle = (i: number) => emit('toggle', i)
  const listVNodes = list.map((item: any, index: number) => {
    return h('div', {
      key: index,
      style: {
        width: '200px',
        height: '40px',
        paddingLeft: '1rem',
        border: '1px solid #1DB954',
        listStyle: 'none',
        cursor: 'pointer',
        backgroundColor: index === activeIndex ? '#1DB' : null,
      },
      onClick: () => handleToggle(index),
    }, item.name)
  })

  return h('ul', {}, listVNodes)
}
// If the props option is not specified, then the props object passed to the function will contain all attributes, the same as attrs. The prop names will not be normalized to camelCase unless the props option is specified.
// see more https://vuejs.org/guide/extras/render-function.html#functional-components
ListComponent.props = ['list', 'activeIndex']

const list = [{
  name: 'vue',
}, {
  name: 'vue2',
}, {
  name: 'vue3',
}]

const activeIndex = ref<number>(0)

function toggle(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <ListComponent
    :list="list"
    :active-index="activeIndex"
    @toggle="toggle"
  />
</template>
