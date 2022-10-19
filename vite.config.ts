import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const { resolve } = require("path")

export default defineConfig({
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1024,
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
