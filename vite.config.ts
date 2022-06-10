import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const { resolve } = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3035,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有包含短横线的标签作为自定义元素处理
          isCustomElement: tag => tag.includes("my-"),
        },
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: [
      //配置路径别名
      { find: "@", replacement: resolve(__dirname, "src") },
    ],
  },
})
