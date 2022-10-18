import type { App } from "vue"
import editor from "./editor/index.vue"
export * from "./renderBox/index"

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
