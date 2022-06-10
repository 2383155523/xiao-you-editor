import { createApp } from "vue"
import App from "./App.vue"
import xiaoYouEditor from "../lib/index"
import defineCustomElementsAll from "./customComponents/index"

createApp(App).use(xiaoYouEditor).mount("#app")
defineCustomElementsAll()
