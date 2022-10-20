import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import xiaoYouEditor from "../lib/index"
import myCustomCop from "./myCustomComponents/index"

createApp(App).use(router).use(myCustomCop).use(xiaoYouEditor).mount("#app")
