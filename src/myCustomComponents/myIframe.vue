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
import { defineProps } from "vue"

interface props {
  src?: string
  h?: string
}

const props: props = defineProps({
  src: String,
  h: {
    type: String,
    default: "500px",
  },
})
// <my-text-block color="rgb(85, 138, 238)" title="Iframe">
// <my-iframe src="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIHt7IG1zZyB9fVxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG4gIGNvbnN0IG1zZyA9IHJlZignaGVsbG8gVnVlMycpXG48L3NjcmlwdD5cbjxzdHlsZT5cbiAgZGl2e1xuICAgIGNvbG9yOnJlZDtcbiAgfVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3VucGtnLmNvbS9AdnVlL3J1bnRpbWUtZG9tQDMuMi4zMS9kaXN0L3J1bnRpbWUtZG9tLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9" h="500px"/>
// </my-text-block>
</script>

<style scoped>
.my-iframe {
  width: 100%;
  border-radius: 4px;
  margin-bottom: var(--bottom);
}
</style>
