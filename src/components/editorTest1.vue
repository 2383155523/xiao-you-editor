<template>
  <div class="edit">
    <xy-editor
      v-model="blogContent"
      :theme="theme"
      :utils="utils"
      border-radius="20px"
      font-family="HarmonyOS_Sans_SC_Medium"
    />
    <!-- :styles="styles" -->
    <button @click="changeTheme">changeTheme</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { styles } from "./editorConfig/styles"
import { utils } from "./editorConfig/utils"

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
