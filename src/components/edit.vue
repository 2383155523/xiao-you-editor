<template>
  <div class="edit">
    <xy-editor-md v-model="input" :utils="utils" :styles="style" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { styles, utilItem, hooks } from "../../lib/index.d"
import h1 from "../assets/h1.svg"
import bizhi from "../assets/bizhi.jpg"
console.log(bizhi)

const input = ref("")
const utils = []
const createTitle = count => "#".repeat(count)

for (let i = 1; i <= 6; i++) {
  utils.push({
    template: `${createTitle(i)} 我是标题${i}\n`,
    icon: "https://cdn.icon-icons.com/icons2/1369/PNG/128/-title_90285.png",
    hooks: {
      beforeInsert(template: string) {
        console.log("插入前", template)
      },
      inserted(template: string) {
        console.log("插入后", template)
        console.log("input", input.value)
      },
    },
  })
}
const style: styles = {
  containerStyle: {
    borderRadius: "10px",
    scrollBarColor: "purple",
    background: {
      url: "url(https://w.wallhaven.cc/full/y8/wallhaven-y8622k.jpg)",
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
