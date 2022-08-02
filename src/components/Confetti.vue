<script setup lang="ts">
import confetti from 'canvas-confetti'

const props = defineProps<{
  passed: boolean
}>()

function congrates() {
  const defaults = {
    colors: [
      '#5D8C7B',
      '#F2D091',
      '#F2A679',
      '#D9695F',
      '#8C4646',
    ],
    shapes: ['square'],
    ticks: 500,
  } as confetti.Options
  confetti({
    ...defaults,
    particleCount: 80,
    spread: 100,
    origin: { x: 0, y: 0.5 },
  })
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 50,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.5 },
    })
  }, 0)
}

watch(
  () => props.passed,
  (v) => {
    if (v)
      setTimeout(congrates, 200)
  }, { flush: 'post' })
</script>
