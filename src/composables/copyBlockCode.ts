import { copyToClipboard } from 'utils-snap-fn'

const copyIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z"/><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z"/></svg>
`

const copiedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#00a98e" d="m14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415l-9 8.999z"/><path fill="#00a98e" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"/></svg>
`

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
