<script setup lang="ts">
import { defineProps, toRefs, onMounted, ref, shallowRef, onUpdated, watch } from "vue"
import "@/prism/prism.js"
// import "@/prism/codeThemes/Pinia/index.css"
// import "@/prism/codeThemes/lucario/index.css"
// import "@/prism/codeThemes/ghcolors/index.css"
// import "@/prism/codeThemes/hopscotch/index.css"
// import "@/prism/codeThemes/laserwave/index.css"
// import "@/prism/codeThemes/duotone-dark/index.css"
import "@/prism/codeThemes/vitesse-dark/index.css"

const props = defineProps<{
  lang: string
  code: string
  src: string
}>()

const pre = shallowRef<HTMLPreElement>()
const { lang, code, src } = toRefs(props)
let codeContent: string
const render = async () => {
  if (src.value) {
    await fetchCode()
    return
  }
  codeContent = code.value
  codeContent = codeContent.replaceAll(`亻`, `"`)
  try {
    const el = pre.value
    const html = Prism.highlight(
      codeContent,
      Prism.languages[lang.value == "vue" ? "html" : lang.value],
      lang.value == "vue" ? "html" : lang.value
    )
    el.children[0].innerHTML = html
  } catch (error) {}
}

async function fetchCode() {
  await fetch(src.value).then(res => {
    console.log(res)
  })
  // .then(data => {
  //   console.log(data)
  // })
}

watch(props, render)
onMounted(render) //初始化
onUpdated(render) //更新,

const copyCode = (e: MouseEvent) => {
  const oInput = document.createElement("textarea")
  oInput.value = codeContent
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand("copy")
  document.body.removeChild(oInput)
  alert("复制成功🎉")
}
const myCode = ref<null | HTMLElement>(null)
const header = ref<null | HTMLElement>(null)
let isFullScreen = false
const fullScreen = () => {
  myCode!.value!.classList.toggle("my-code-fullScreen")
  header!.value!.classList.toggle("header-fullScreen")
  pre!.value!.classList.toggle("pre-fullScreen")
  isFullScreen = !isFullScreen
}
</script>

<template>
  <div class="my-code" ref="myCode">
    <div class="code-header" ref="header">
      <div class="icons">
        <div class="circle one"></div>
        <div class="circle two"></div>
        <div class="circle three"></div>
      </div>
      <div class="lang">{{ lang }}</div>
      <div class="utils">
        <svg
          t="1644040761636"
          class="copy"
          @click="copyCode"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7993"
        >
          <path
            class="copy-p"
            d="M576 384a64 64 0 0 1 64 64v341.333333a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V448a64 64 0 0 1 64-64h341.333333z m0 64H234.666667v341.333333h341.333333V448z m-64 192v64H298.666667v-64h213.333333zM789.333333 170.666667a64 64 0 0 1 64 64v341.333333a64 64 0 0 1-64 64h-106.666666v-64h106.666666V234.666667H448v106.666666h-64v-106.666666a64 64 0 0 1 64-64h341.333333zM512 533.333333v64H298.666667v-64h213.333333z"
            p-id="7994"
          ></path>
        </svg>
        <svg
          t="1644743728676"
          class="fullScreen"
          viewBox="0 0 1024 1024"
          @click="fullScreen"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3925"
          width="200"
          height="200"
        >
          <path
            class="fullScreen-p"
            d="M368.896 192H224a32 32 0 0 0-32 32v137.888a32 32 0 0 0 64 0V256h112.896a32 32 0 0 0 0-64zM784.864 192H640a32 32 0 1 0 0 64h112.864v105.888a32 32 0 1 0 64 0V224a32 32 0 0 0-32-32zM368.896 777.92H256V672a32 32 0 1 0-64 0v137.92a32 32 0 0 0 32 32h144.896a32 32 0 1 0 0-64zM784.864 640a32 32 0 0 0-32 32v105.92H640a32 32 0 1 0 0 64h144.864a32 32 0 0 0 32-32V672a32 32 0 0 0-32-32z"
            p-id="3926"
          ></path>
          <path
            d="M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z"
            p-id="3927"
          ></path>
        </svg>
      </div>
    </div>
    <div class="code">
      <pre ref="pre">
    <div :class="['language-' + lang]" id="code" >
    </div>
</pre>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-code-fullScreen {
  position: fixed !important;
  width: 100vw !important;
  height: 100vh !important;
  top: 0;
  left: 0;
  z-index: 999;
  margin: 0 !important;
}
.header-fullScreen,
.pre-fullScreen {
  border-radius: 0 !important;
}
.header-fullScreen {
  height: 4vh !important;
}
.pre-fullScreen {
  height: 96vh !important;
  max-height: 96vh !important;
}

.my-code {
  margin-bottom: var(--bottom);
  width: 100%;
  max-height: 700px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .code-header {
    position: relative;
    width: 100%;
    height: 30px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    .lang {
      color: #fff;
    }
    .icons {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
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
    }
    .utils {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      .copy {
        display: block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        transition: transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
          -webkit-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
        &:hover {
          transform: translateY(-2px);
        }
        .copy-p {
          fill: #dbdbdb;
          transition: all 0.3s ease 0s;
        }
        &:hover .copy-p {
          fill: var(--themeColor);
        }
      }
      .fullScreen {
        margin-right: 10px;
        margin-left: 10px;
        display: block;
        width: 20px;
        height: 20px;
        fill: #dbdbdb;
        cursor: pointer;
        transition: transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
          -webkit-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
        transition: all 0.3s ease 0s;
        &:hover {
          transform: translateY(-2px);
          fill: var(--themeColor);
        }
      }
    }
  }
  .code {
    width: 100%;
    max-width: 100%;
    max-height: 670px;
    // opacity: 0.9;
  }
}

* ::selection {
  color: #fff;
  background-color: var(--themeColor);
}

* ::-moz-selection {
  color: #fff;
  background-color: var(--themeColor);
}

*::-webkit-selection {
  color: #fff;
  background-color: var(--themeColor);
}

*::-webkit-scrollbar,
*::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: var(--themeColor);
  background-image: -webkit-linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.6) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.6) 0,
    hsla(0, 0%, 100%, 0.6) 75%,
    transparent 0,
    transparent
  );
}
@media screen and (max-width: 765px) {
  .circle {
    width: 10px !important;
    height: 10px !important;
  }
}
*::-webkit-scrollbar-corner {
  background: transparent;
}
*::-webkit-scrollbar {
  width: 7px;
  height: 6px;
}
</style>
