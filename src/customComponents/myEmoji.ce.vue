<template>
  <img :src="emojis[name]" class="icon" alt="" />
</template>

<script setup lang="ts">
import { defineProps } from "vue"
// import emojis from "@/config/emoji"
const props = defineProps({
  name: String,
})
</script>

<style>
.icon {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
}
</style>
