import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const { resolve } = require("path")

export default defineConfig({
  define: {
    _VUE_OPTIONS_API_: JSON.stringify(false),
  },
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1024,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有包含短横线的标签作为自定义元素处理
          // isCustomElement: tag => tag.includes("my-"),
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.module.scss";`, //全局混入scss
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: [
      //配置路径别名
      { find: "@", replacement: resolve(__dirname, "src") },
    ],
  },
})
