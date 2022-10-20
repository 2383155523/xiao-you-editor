import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const { resolve } = require("path")

export default defineConfig({
  base: "/xiao-you-editor/", //production Mode
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1024,
  },
  server: {
    proxy: {
      "/release.js": "https://fuyouplus.oss-cn-beijing.aliyuncs.com",
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.module.scss";`, //全局混入scss
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
})
