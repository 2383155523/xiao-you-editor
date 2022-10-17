<template>
  <del class="my-del" :style="{ color: color }">
    <slot></slot>
  </del>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  color: String,
})
</script>

<style lang="scss" scoped>
.my-del {
  color: var(--themeColor);
  filter: blur(3px);
  transition: filter 0.5s;
  &:hover {
    filter: blur(0);
  }
}
</style>
