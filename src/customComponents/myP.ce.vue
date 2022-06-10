<template>
  <div class="my-p" :style="css">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  css: Object,
})
</script>

<style lang="scss" scoped>
.my-p {
  text-indent: 1em;
  font-size: 16px;
  margin-bottom: var(--bottom);
}
</style>
