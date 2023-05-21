// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx({
      baseFontSize: 16,
    }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        mdi: () =>
          import('@iconify-json/mdi').then(i => i.icons as any),
      },
    }),
  ],
})
