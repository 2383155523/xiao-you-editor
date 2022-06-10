<template>
  <div class="img-box">
    <img src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/image/loading.gif" alt="loading" v-show="!isLoaded" />
    <img :src="src" :alt="alt" @load="imgLoad" v-show="isLoaded" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"
interface props {
  src?: string
  alt?: string
}
const props: props = defineProps({
  src: String,
  alt: String,
})
const isLoaded = ref<boolean>(false)
const imgLoad = () => {
  setTimeout(() => {
    isLoaded.value = true
  }, 1000)
}
</script>

<style>
.img-box {
  display: inline-block;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--bottom);
}
img {
  max-width: 100%;
  border-radius: 4px;
  transition: transform 0.7s ease-out;
}
.img-box:hover img {
  transform: scale(1.05);
}
</style>
