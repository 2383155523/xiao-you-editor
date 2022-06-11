import { createRouter, createWebHashHistory } from "vue-router"

import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/editor-custom",
  },
  {
    path: "/editor-custom",
    component: () => import("../components/edit-custom.vue"),
  },
  {
    path: "/editor-markdown",
    component: () => import("../components/edit-markdown.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
