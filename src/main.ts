import { createApp } from "vue"
import App from "./App.vue"
import xiaoYouEditor from "../lib/index"
import myCustomCop from "./myCustomComponents/index"

createApp(App).use(myCustomCop).use(xiaoYouEditor).mount("#app")
