import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import xiaoYouEditor from "../lib/index"
import defineCustomElementsAll from "./customComponents/index"

createApp(App).use(xiaoYouEditor).use(router).mount("#app")
defineCustomElementsAll()
