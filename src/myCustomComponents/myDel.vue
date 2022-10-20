<template>
  <del class="my-del">
    <slot></slot>
  </del>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue"
withDefaults(defineProps<{ color?: string }>(), {
  color: "red",
})
</script>

<style lang="scss" scoped>
.my-del {
  color: v-bind("color");
  filter: blur(3px);
  transition: filter 0.5s;
  &:hover {
    filter: blur(0);
  }
}
</style>
