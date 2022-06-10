<template>
  <div class="text-block" ref="text_block">
    <div class="text-block-header" ref="text_block_header">
      <div class="circle one"></div>
      <div class="circle two"></div>
      <div class="circle three"></div>
    </div>

    <div class="title">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, ref, onMounted, nextTick } from "vue"
import bus from "@/eventBus"
const text_block = ref<null | HTMLElement>(null)
const text_block_header = ref<null | HTMLElement>(null)
onMounted(() => {
  bus.on("theme", data => {
    nextTick(() => {
      try {
        if (data == "light") {
          text_block.value.classList.remove(`text-block-dark`)
          text_block.value.classList.add(`text-block-light`)
          text_block_header.value.style.background = "var(--linear-gradient)"
        } else {
          text_block.value.classList.remove(`text-block-light`)
          text_block.value.classList.add(`text-block-dark`)
          text_block_header.value.style.background = "rgba(27, 30, 43, 0.9)"
        }
      } catch (error) {}
    })
  })
})

interface props {
  color?: string
  title?: string
}

const props: props = defineProps({
  color: String,
  title: String,
})

let { color, title } = toRefs(props)
</script>

<style scoped>
.text-block {
  --linear-gradient: linear-gradient(135deg, #558aee 10%, #db6ffb 100%);
  --border-radius: 4px;
}
.text-block-light {
  background: rgba(255, 255, 255, 0.7);
  color: #333333;
}
.text-block-dark {
  background: rgba(45, 49, 56, 0.8);
  color: #dfdbdb;
}
.text-block {
  position: relative;
  width: 100%;
  margin-top: 50px;
  margin-bottom: var(--bottom);
  padding: 14px 20px;
  box-sizing: border-box;
  text-align: justify;
  overflow: unset;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  box-shadow: 0 14px 38px rgb(0 0 0 / 8%), 0 3px 8px rgb(0 0 0 / 6%);
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.text-block:hover {
  box-shadow: 0 14px 38px rgb(0 0 0 / 14%), 0 3px 8px rgb(0 0 0 / 12%);
}
.text-block-header {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  height: 30px;
  position: absolute;
  top: -30px;
  left: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 10px;
}
.one {
  background: #fc625d;
}
.two {
  background: #fdbc40;
}
.three {
  background: #35cd4b;
}

.text-block .title {
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
  padding: 0 14px 0 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  background-color: v-bind(color);
  color: #fff;
  transform: translateX(-35px);
}
.text-block .title::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-width: 0 16px 16px 0;
  border-color: transparent;
  border-right-color: v-bind(color);
  filter: brightness(120%);
}
</style>
