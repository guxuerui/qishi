interface IFilterCards {
  title: string
  min: number
  max?: number
  className: string
}

export const FilterCards = ref<IFilterCards[]>([
  {
    title: 'grayscale() 函数将改变图像灰度值。取值在0%-100%之间, 默认为0',
    min: 0,
    max: 100,
    className: 'slide1',
  },
  {
    title: 'sepia() 函数将图像变为深褐色。取值在0%-100%之间, 默认为0',
    min: 0,
    max: 100,
    className: 'slide2',
  },
  {
    title: 'saturate() 函数转换图像饱和度。取值应大于等于0, 默认为1',
    min: 0,
    max: 100,
    className: 'slide3',
  },
  {
    title: 'hue-rotate() 函数对图像做色相旋转。默认为0deg, 0-360deg为一个循环, 超过360deg相当于又从0开始',
    min: 0,
    max: 100,
    className: 'slide4',
  },
  {
    title: 'invert() 函数反转图像。取值为0%-100%, 默认为0%',
    min: 0,
    max: 100,
    className: 'slide5',
  },
  {
    title: 'opacity() 函数转化图像的透明度。取值在0%-100%之间, 默认为100%',
    min: 0,
    max: 100,
    className: 'slide6',
  },
  {
    title: 'brightness() 函数调整图像明亮度。可以为数字或百分比值, 默认为1即100%',
    min: 0,
    max: 100,
    className: 'slide7',
  },
  {
    title: 'contrast() 函数调整图像的对比度。值大于等于0%, 默认为100%',
    min: 0,
    max: 100,
    className: 'slide8',
  },
  {
    title: 'blur() 函数将高斯模糊应用于图像。默认为0, 不能是百分比值',
    min: 0,
    max: 100,
    className: 'slide9',
  },
  {
    title: 'drop-shadow() 函数设置图像阴影效果。使用drop-shadow(offset-x offset-y blur-raduis? color?)',
    min: 0,
    max: 100,
    className: 'slide10',
  },
])
