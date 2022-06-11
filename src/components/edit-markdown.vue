<template>
  <div class="edit">
    <xy-editor-md
      v-model="input"
      :utils="utils"
      :styles="style"
      :renderer="render"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { styles, utilItem, hooks, renderer } from "../../lib/index.d"
import bizhi from "../assets/bizhi.jpg"
console.log(bizhi)

const input = ref("")
const utils = []
let render: renderer = {}

render.code = (code: string, lang: string, escaped: boolean) => {
  return `<my-code-md lang="${lang}" code='${code}'></my-code-md>`
}

render.blockquote = (quote: string) => {
  return `<my-tips type="primary">${quote}</my-tips>`
}

render.image = (href: string, title: string, text: string) => {
  return `<my-img src="${href}"></my-img>`
}

render.heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
  switch (level) {
    case 1:
      return `<my-h1>${text}</my-h1>\n`
    case 2:
      return `<my-h2>${text}</my-h2>\n`
    case 3:
      return `<h3>${text}</h3>\n`
    case 4:
      return `<h4>${text}</h4>\n`
    case 5:
      return `<h5>${text}</h5>\n`
    case 6:
      return `<h6>${text}</h6>\n`
  }
}

const createTitle = count => "#".repeat(count)

function createUtils() {
  for (let i = 1; i <= 6; i++) {
    utils.push({
      template: `${createTitle(i)} 我是标题${i}\n`,
      icon: h1,
      hooks: {
        beforeInsert(template: string) {
          console.log("插入前", template)
        },
        inserted(template: string) {
          console.log("插入后", template)
        },
      },
    })
  }
}
// createUtils()

const style: styles = {
  containerStyle: {
    borderRadius: "10px",
    scrollBarColor: "purple",
    background: {
      url: `url(https://fuyouplus.oss-cn-beijing.aliyuncs.com/blog-imgs/14.png)`,
      size: "cover",
      repeat: "no-repeat",
      color: "",
    },
    font: {
      size: "14px",
      color: "#fff",
      weight: "normal",
      family: "oppo",
    },
    border: {
      width: "2px",
      style: "solid",
      color: "#fff",
    },
  },
  placeholderStyle: {
    size: "16px",
    color: "#fff",
    weight: "normal",
    family: "oppo",
  },
  editBoxStyle: {
    font: {
      size: "16px",
      color: "",
      weight: "normal",
      family: "oppo",
    },
    background: {
      url: "",
      size: "cover",
      repeat: "no-repeat",
      color: "",
    },
  },
  previewBoxStyle: {
    font: {
      size: "14px",
      color: "",
      weight: "normal",
      family: "oppo",
    },
    background: {
      url: "",
      size: "cover",
      repeat: "no-repeat",
      color: "",
    },
  },
  headerBoxStyle: {
    background: {
      url: "",
      size: "cover",
      repeat: "no-repeat",
      color: "",
    },
  },
}
</script>

<style scoped>
.edit {
  width: 100%;
  height: 98vh;
  margin: 0 auto;
  overflow: hidden;
}
</style>
