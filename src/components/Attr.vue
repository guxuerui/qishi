<script setup lang="ts">
const content = ref('I am tooltip content')
</script>

<template>
  <input
    id="input"
    v-model="content"
    placeholder="Please Input Content"
    type="text"
    autocomplete="false"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >
  <p>
    Hover
    <span class="tooltip" :data-tooltip="content">Here</span>
    to see the tooltip.
  </p>
</template>

<style scoped>
  .tooltip {
    position: relative;
    border-bottom: 1px dotted rgba(107, 114, 128, 1);
  }

  .tooltip::before {
    content: attr(data-tooltip);
    position: absolute;
    min-width: 100px;
    background-color: #062B45;
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    z-index: 1;
    opacity: 0;
    transition: opacity .5s;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    font-size: 0.75rem;
    visibility: hidden;
  }

  .tooltip:hover::before,
  .tooltip:hover::after {
    opacity: 1;
    visibility: visible;
  }
</style>

