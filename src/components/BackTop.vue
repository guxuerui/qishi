<script setup lang="ts">
onMounted(() => {
  const backtop_btn = document.getElementById('backtop_btn') as HTMLElement
  backtop_btn.style.display = 'none'

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100)
      backtop_btn.style.display = 'block'
    else
      backtop_btn.style.display = 'none'
  })
})

const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button
    id="backtop_btn"
    class="p-2.5 text-base rounded-md hover:bg-slate/10 fixed bottom-20px right-20px z-10 transition-colors"
    @click="toTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M16 4L6 14l1.41 1.41L15 7.83V28h2V7.83l7.59 7.58L26 14L16 4z"
      />
    </svg>
  </button>
</template>
