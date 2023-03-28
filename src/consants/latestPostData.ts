export const getLatestPost = async () => {
  const latestPostList = await Promise.all([
    getMetaData(`${vuePostList.value[0].folder}`, `${vuePostList.value[0].fileName}.md`),
    getMetaData(`${vuePostList.value[1].folder}`, `${vuePostList.value[1].fileName}.md`),
    getMetaData(`${jsPostList.value[0].folder}`, `${jsPostList.value[0].fileName}.md`),
    getMetaData(`${cssPostList.value[0].folder}`, `${cssPostList.value[0].fileName}.md`),
    getMetaData(`${notePostList.value[0].folder}`, `${notePostList.value[0].fileName}.md`),
    getMetaData(`${gamePostList.value[0].folder}`, `${gamePostList.value[0].fileName}.vue`),
  ])

  return latestPostList
}
