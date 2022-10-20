import type { App } from "vue"
import editor from "./editor/index.vue"
import setupLog from "./utils/log"
export * from "./renderBox/index"

setupLog()
declare module "vue" {
  export interface GlobalComponents {
    xyEditor: typeof editor
  }
}

export default {
  install(app: App) {
    app.component("xy-editor", editor)
  },
}
