<template>
  <img :src="emojis[name]" class="icon" alt="emoji" />
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import emojis from "@/config/emoji"
const props = defineProps({
  name: String,
})
</script>

<style lang="scss" scoped>
.icon {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
}
</style>
