import type { IPostCard } from '~/types'

export const getLatestPost = async function (): Promise<IPostCard[]> {
  const latestPostList = await Promise.all([
    getMetaData(`${vuePostList.value[0].folder}`, `${vuePostList.value[0].fileName}.${vuePostList.value[0].fileType}`),
    getMetaData(`${vuePostList.value[1].folder}`, `${vuePostList.value[1].fileName}.${vuePostList.value[1].fileType}`),
    getMetaData(`${jsPostList.value[0].folder}`, `${jsPostList.value[0].fileName}.${jsPostList.value[0].fileType}`),
    getMetaData(`${cssPostList.value[0].folder}`, `${cssPostList.value[0].fileName}.${cssPostList.value[0].fileType}`),
    getMetaData(`${notePostList.value[0].folder}`, `${notePostList.value[0].fileName}.${notePostList.value[0].fileType}`),
    getMetaData(`${gamePostList.value[0].folder}`, `${gamePostList.value[0].fileName}.${gamePostList.value[0].fileType}`),
  ])

  return latestPostList
}
