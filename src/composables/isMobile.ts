import { computedEager } from '@vueuse/core'

export function isMobile() {
  return computedEager(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  })
}
