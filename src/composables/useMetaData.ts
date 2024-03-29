// get markdown file meta data
import type { IPostCard } from '~/types'

export const getMetaData = async function (folder: string, file: string): Promise<IPostCard> {
  let allPostFiles: any = null
  switch (folder) {
    case 'vue':
      allPostFiles = import.meta.glob('~/pages/vue/*')
      break
    case 'js':
      allPostFiles = import.meta.glob('~/pages/js/*')
      break
    case 'css':
      allPostFiles = import.meta.glob('~/pages/css/*')
      break
    case 'note':
      allPostFiles = import.meta.glob('~/pages/note/*')
      break
    case 'game':
      allPostFiles = import.meta.glob('~/pages/game/*')
      break
    default:
      break
  }
  let latestPost: IPostCard = {
    title: '',
    abstract: '',
    chipText: '',
    date: '',
    chipColor: '',
    fileName: '',
  }
  const post = await allPostFiles[`/src/pages/${folder}/${file}`]()
  if (file.includes('.vue')) {
    const res = post.default.props.postInfo.default()
    latestPost = {
      title: res.title,
      abstract: res.abstract,
      chipText: res.tags,
      date: useDateFormat(res.date, 'YYYY-MM-DD').value,
      chipColor: res.chipColor,
      fileName: file.split('.')[0],
    }
  }
  else {
    latestPost = {
      title: post.title,
      abstract: post.abstract,
      chipText: post.tags,
      date: useDateFormat(post.date, 'YYYY-MM-DD').value,
      chipColor: post.chipColor,
      fileName: file.split('.')[0],
    }
  }
  return latestPost
}
