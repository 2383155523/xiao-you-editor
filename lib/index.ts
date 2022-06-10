import custom from "./custom/index.vue"
import markdown from "./markdown/index.vue"
export default {
  install(app, options) {
    app.component("xy-editor-custom", custom)
    app.component("xy-editor-md", markdown)
  },
}
