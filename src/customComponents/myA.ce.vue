<script setup lang="ts">
import { defineProps, toRefs } from "vue"
interface props {
  color?: string
  href?: string | null
  line?: boolean
  size?: string | number
  weight?: string | number
}

const props: props = defineProps({
  color: String,
  size: String || Number,
  weight: String || Number,
  href: {
    type: String,
    default: null,
  },
  line: Boolean,
})

const { weight, size, color, href, line } = toRefs(props)

const link = () => {
  href.value && window.open(href.value)
}
</script>

<template>
  <span
    class="my-a"
    @click="link"
    :style="{
      color: line ? '' : color,
      'font-size': size,
      'font-weight': weight,
    }"
  >
    <slot></slot>
    <div
      class="line"
      v-if="line"
      :style="{
        background: color,
      }"
    ></div>
  </span>
</template>

<style>
.my-a {
  display: inline-block !important;
  transition: color 0.5s linear;
  position: relative;
  cursor: var(--cursor-B);
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
}
</style>
