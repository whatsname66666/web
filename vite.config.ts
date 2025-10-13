import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { viteMockServe } from "vite-plugin-mock";
// import commonjs from '@rollup/plugin-commonjs'; // 引入commonjs插件
// import requireTransform from 'vite-plugin-require-transform'; // 引入require转换插件
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

export default defineConfig(({ command }) => {
  return {
    plugins: [
      VueSetupExtend(),
      // commonjs(), // 使用commonjs插件
      // requireTransform({ // 配置require转换
      //   fileRegex: /.js$|.vue$|.ts$/ // 根据你的文件类型配置
      // }),
      vue(),
      viteMockServe({
        enable: command === "serve",
        mockPath: "./src/mock",
      }),
    ],
    assetsInclude: ["**/*.lrc",'**/*.jpeg', '**/*.jpg', '**/*.png'],
    // transforms: [
    //   {
    //     test: ({ path }) => path.endsWith(".lrc"),
    //     transform: ({ code }) => `export default ${JSON.stringify(code)}`,
    //   },
    // ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
