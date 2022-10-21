<template>
  <div class="edit">
    <xy-editor
      v-model="content"
      :theme="setting.theme"
      :border-radius="setting.borderRadius"
      :font-family="setting.fontFamily"
      :transitionMode="setting.transitionMode"
      :styles="setting.styles"
      :custom-parser="customParser"
      :templates="templates"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { templates } from "./editorConfig/templates"
import { defaultContent } from "./editorConfig/defaultContent"
import { setting } from "./editorConfig/setting"
import bus from "@/eventBus/index"

//编辑内容的双向绑定
const content = ref<string>(defaultContent)
watchEffect(() => {
  console.log(content.value)
})

//自定义解析器
const customParser = [
  (template: string) => {
    //Parse code RegExp
    let templateReplaceContent = template
    const reg =
      / {0,3}\n*(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/g
    if (reg.test(template)) {
      templateReplaceContent = template.replace(reg, (...arg) => {
        const lang = arg[2].trim()
        let code = arg[3] ?? ""
        if (code) {
          code = code.replaceAll(`"`, `亻`)
        }
        return `<my-code lang="${lang}" code="${code}"></my-code>`
      })
    }
    return templateReplaceContent
  },
]
</script>

<style scoped>
.edit {
  width: 90%;
  height: 85vh;
  margin: 20px auto;
}
</style>
