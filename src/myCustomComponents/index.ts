import type { App, Component } from "vue"
import myVideo from "./myVideo.vue"
import myCode from "./myCode.vue"
import myMusic from "./myMusic.vue"
import myEmoji from "./myEmoji.vue"
import myImg from "./myImg.vue"
import myP from "./myP.vue"
import myH1 from "./myH1.vue"
import myH2 from "./myH2.vue"
import myIframe from "./myIframe.vue"
import myList from "./myList.vue"
import myTable from "./myTable.vue"
import myTabs from "./myTabs.vue"
import myTextBlock from "./myTextBlock.vue"
import myTips from "./myTips.vue"
import myA from "./myA.vue"
import myDel from "./myDel.vue"

declare module "vue" {
  export interface GlobalComponents {
    ["my-video"]: typeof myVideo
    ["my-code"]: typeof myCode
    ["my-music"]: typeof myMusic
    ["my-emoji"]: typeof myEmoji
    ["my-img"]: typeof myImg
    ["my-p"]: typeof myP
    ["my-h1"]: typeof myH1
    ["my-h2"]: typeof myH2
    ["my-iframe"]: typeof myIframe
    ["my-list"]: typeof myList
    ["my-table"]: typeof myTable
    ["my-tabs"]: typeof myTabs
    ["my-text-block"]: typeof myTextBlock
    ["my-tips"]: typeof myTips
    ["my-a"]: typeof myA
    ["my-del"]: typeof myDel
  }
}
const myCustomComponents: {
  [key: string]: Component
} = {
  ["my-video"]: myVideo,
  ["my-code"]: myCode,
  ["my-music"]: myMusic,
  ["my-emoji"]: myEmoji,
  ["my-img"]: myImg,
  ["my-p"]: myP,
  ["my-h1"]: myH1,
  ["my-h2"]: myH2,
  ["my-iframe"]: myIframe,
  ["my-list"]: myList,
  ["my-table"]: myTable,
  ["my-tabs"]: myTabs,
  ["my-text-block"]: myTextBlock,
  ["my-tips"]: myTips,
  ["my-a"]: myA,
  ["my-del"]: myDel,
}

export default {
  install(app: App) {
    Object.keys(myCustomComponents).forEach((key: string) => {
      app.component(key, myCustomComponents[key])
    })
  },
}
