import { copyToClipboard } from 'utils-snap-fn'

const copyIcon = '<span class="dark:text-white" i-carbon-copy>copy</span>'

const copiedIcon = '<span class="dark:text-white" i-carbon-checkmark-outline>copy</span>'

function htmlDecode(input: any) {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

async function copyCode(block: any) {
  const copiedCode = block.cloneNode(true)
  copiedCode.removeChild(copiedCode.querySelector('button.copy-btn'))
  // remove all HTML tags in pre tag
  const html = copiedCode.outerHTML.replace(/<[^>]*>?/gm, '')

  const iconBtn = block.querySelector('button.copy-btn')
  iconBtn.innerHTML = copiedIcon
  setTimeout(() => {
    iconBtn.innerHTML = copyIcon
  }, 2000)

  const parsedHTML = htmlDecode(html)

  await copyToClipboard(parsedHTML)
}

export function setCopy() {
  if (!navigator.clipboard)
    return

  const preTags = document.getElementsByTagName('pre')
  setTimeout(() => {
    const preTagsArr = Array.from(preTags)

    for (let i = 0; i < preTagsArr.length; i++) {
      preTagsArr[i].style.position = 'relative'
      const copyBtn = document.createElement('button')
      copyBtn.innerHTML = copyIcon
      copyBtn.classList.add('copy-btn')
      preTagsArr[i].appendChild(copyBtn)

      copyBtn.addEventListener('click', async () => {
        await copyCode(preTagsArr[i])
      })
    }
  }, 100)
}
