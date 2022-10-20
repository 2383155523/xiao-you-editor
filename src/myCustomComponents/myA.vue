<script setup lang="ts">
import { defineProps, toRefs } from "vue"

const props = defineProps<{
  color?: string
  href?: string
  line?: boolean
  size?: string | number
  weight?: string | number
}>()

const { weight, size, color, href, line } = toRefs(props)

const link = () => {
  href!.value && window.open(href!.value)
}
</script>

<template>
  <span class="my-a" @click="link">
    <slot></slot>
    <div class="line" v-if="line"></div>
  </span>
</template>

<style lang="scss" scoped>
.my-a {
  display: inline-block !important;
  transition: color 0.5s linear;
  position: relative;
  cursor: pointer;
  text-indent: 0 !important;
  color: v-bind("line ? '': color");
  font-size: v-bind("size");
  font-weight: v-bind("weight");
}
.my-a:hover {
  color: v-bind(color);
}
.my-a:hover .line {
  width: 100%;
}
.my-a .line {
  width: 0%;
  height: 2px;
  transition: width 0.3s linear;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: v-bind("color");
}
</style>
