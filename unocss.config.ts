import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    {
      'fc': 'flex justify-center',
      'fi': 'flex items-center',
      'fb': 'flex justify-between',
      'fcc': 'fc items-center',
      'fie': 'fi justify-end',
      'col-fcc': 'flex-col fcc',
      'inline-fcc': 'inline-flex items-center justify-center',
      'chip': 'max-w-14 my-3 text-center text-sm border-1 border-solid rounded-3xl cursor-pointer transition',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
