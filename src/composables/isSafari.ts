// judge whether the browser is Safari
export const isSafari = function () {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
}
