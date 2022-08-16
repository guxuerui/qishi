export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref<number>(0)
  const y = ref<number>(0)

  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  // 通过返回值暴露所管理的状态
  return { x, y }
}
