<template>
  <div class="my-table">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue"
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "200px",
  },
})
const { width, height } = toRefs(props)
</script>

<style lang="scss" scoped>
.my-table {
  width: v-bind(width);
  height: v-bind(height);
  box-sizing: border-box;
  transform: scale3d(1, 1, 1);
  border-radius: 4px;
  border-bottom: 1px solid var(--tableBorderColor);
  border: 2px solid var(--borderColor);
  transition: all 0.3s var(--n-bezier);
  margin-bottom: var(--bottom);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
