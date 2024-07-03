import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     VueSetupExtend(),
//     viteMockServe({
//       localEnabled: command === 'serve',
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

export default defineConfig(({ command })=> {
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      viteMockServe({
        enable: command === 'serve',
        mockPath: './src/mock'
      }),
    ],
    resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  }
})