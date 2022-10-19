<template>
  <div class="edit">
    <xy-editor
      v-model="blogContent"
      :theme="theme"
      border-radius="15px"
      font-family="HarmonyOS_Sans_SC_Medium"
      :custom-parser="customParser"
      :templates="templates"
    />
    <!-- :styles="styles" -->
    <button @click="changeTheme">changeTheme</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { styles } from "./editorConfig/styles"
import { templates } from "./editorConfig/templates"

const customParser = [
  (template: string) => {
    //Parse code RegExp
    let templateReplaceContent = template
    const reg =
      / {0,3}\n*(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/g
    if (reg.test(template)) {
      console.log("code")
      templateReplaceContent = template.replace(reg, (...arg) => {
        console.log(arg)
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

const blogContent = ref("")
const theme = ref<"light" | "dark">("dark")
function changeTheme() {
  if (theme.value == "light") {
    theme.value = "dark"
  } else {
    theme.value = "light"
  }
}
</script>

<style scoped>
.edit {
  width: 95vw;
  height: 90vh;
  margin: 50px auto;
  /* color: ; */
  border: 1px;
}
button {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
