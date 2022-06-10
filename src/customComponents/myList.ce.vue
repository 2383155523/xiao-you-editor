<template>
  <ol class="my-list" v-if="ol" :type="type">
    <slot></slot>
  </ol>
  <ul class="my-list" :type="type" v-else>
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue"
import type { PropType } from "vue"
const props = defineProps({
  ol: Boolean,
  type: String as PropType<"1" | "A" | "a" | "I" | "i">,
})
const { type, ol } = toRefs(props)
</script>

<style lang="scss">
.my-list {
  box-sizing: border-box;
  padding-left: 80px;
  font-size: 16px;
  margin-bottom: var(--bottom);
}
</style>
