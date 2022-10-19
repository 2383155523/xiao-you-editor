<template>
  <iframe
    :src="src"
    frameborder="0"
    allow-same-origin
    allow-top-navigation
    allow-forms
    allow-scripts
    seamless
    class="my-iframe"
    :style="{
      height: h,
    }"
  ></iframe>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from "vue"
withDefaults(defineProps<{ src: string; h: string }>(), { h: "500px" })
</script>

<style scoped>
.my-iframe {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
