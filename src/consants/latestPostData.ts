export const getLatestPost = async () => {
  const latestVue = await getMetaData(`${vuePostList.value[0].folder}`, `${vuePostList.value[0].fileName}.md`)
  const latestJs = await getMetaData(`${jsPostList.value[0].folder}`, `${jsPostList.value[0].fileName}.md`)
  const latestCss = await getMetaData(`${cssPostList.value[0].folder}`, `${cssPostList.value[0].fileName}.md`)
  const latestNote = await getMetaData(`${notePostList.value[0].folder}`, `${notePostList.value[0].fileName}.md`)
  const latestGame = await getMetaData(`${gamePostList.value[0].folder}`, `${gamePostList.value[0].fileName}.vue`)

  const latestPostList = [latestVue, latestJs, latestCss, latestNote, latestGame]
  return latestPostList
}
