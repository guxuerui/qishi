import image from '/imgs/street.jpeg'
import balloon from '/imgs/ballon.jpeg'
import night from '/imgs/night.jpeg'
import type { ITimeline } from '~/types'

export const timelineArr = ref<ITimeline[]>([
  {
    isCollapsed: false,
    year: '2022年',
    title: '光阴长河',
    list: [
      {
        date: '11月3日',
        iconColor: '#26c',
        chipColor: '#26C',
        chipText: '二周年',
        iconRight: '7%',
        subTitleColor: '#26c',
        subTitle: '新公司入职2周年',
        imgUrl: image,
        content: `
        不知不觉又2年过去了，在这段时间内，可以明显感觉到自己的提升。
        <br/>
        在这期间学到了很多新知识，自己也写了一些东西，很有收获感和满足感。
        言而总之, 明年继续努力吧!~ </br>
        <a style="color: #4bf;border-bottom: 1px dashed #4bf" href="https://github.com/guxuerui/pretty-timeline" target="_blank">时间轴组件: pretty-timeline</a>
        `,
      },
    ],
  },
  {
    isCollapsed: false,
    year: '2020年',
    title: '',
    list: [
      {
        date: '11月3日',
        iconColor: '#00EAFF',
        chipColor: '#00EAFF',
        chipText: '二换',
        iconRight: '7%',
        subTitleColor: '#00EAFF',
        subTitle: '今天, 第二次换工作',
        imgUrl: night,
        content: `
        又过了一年的时间, 虽然个人能力得到了很大的提升,但是项目和环境都让我感觉还有很大的提升空间,
        所以这是第二次换工作的目标和动力, 来到了艾灵网络。</br>
        继续努力吧~~
        `,
      },
    ],
  },
  {
    isCollapsed: false,
    year: '2019年',
    title: '',
    list: [
      {
        date: '9月20日',
        iconColor: '#7367F0',
        chipColor: '#7367F0',
        chipText: '换工作了',
        iconRight: '7%',
        subTitleColor: '#7367F0',
        subTitle: '今天, 第一次换工作',
        imgUrl: balloon,
        content: `
        经过了2年的摸爬滚打，终于换了第二份工作 - 芯盾易安。<br/>
        继续努力~~
        `,
      },
    ],
  },
  {
    isCollapsed: false,
    year: '2017年',
    title: '',
    list: [
      {
        date: '8月14日',
        iconColor: 'orange',
        chipColor: 'orange',
        chipText: '入职了',
        iconRight: '7%',
        subTitleColor: 'orange',
        subTitle: '今天, 入职了!',
        content: `
        岗位前端开发, 科蓝软件, 正式步入职场~<br/>
        扬帆, 起航⛴
        `,
      },
      {
        date: '6月20日',
        iconColor: 'cyan',
        chipColor: '#1c9',
        chipText: '毕业啦',
        iconRight: '7%',
        subTitleColor: '#1c9',
        subTitle: '今天, 毕业了!',
        content: '大学四年正式结束了, 离开兰州理工大学, 即将步入职场!<br/>',
      },
    ],
  },
])
