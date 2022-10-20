<template>
  <editorTest1 />
</template>

<script setup lang="ts">
import editorTest1 from "@/components/editorTest1.vue"
document.querySelector("html")!.className = "dark"
</script>

<style lang="scss">
@import "@/styles/reset";
</style>
