import { defineCustomElement } from "vue"
import MyA from "./myA.ce.vue"
import myMusic from "./myMusic.ce.vue"
import myVideo from "./myVideo.ce.vue"
import myCodeMd from "./myCodeMd.ce.vue"
import myCode from "./myCode.ce.vue"
import myTips from "./myTips.ce.vue"
import myIframe from "./myIframe.ce.vue"
import myImg from "./myImg.ce.vue"
import myEmoji from "./myEmoji.ce.vue"
import myP from "./myP.ce.vue"
import myH1 from "./myH1.ce.vue"
import myH2 from "./myH2.ce.vue"
import myList from "./myList.ce.vue"
import myTable from "./myTable.ce.vue"
import myTabs from "./myTabs.ce.vue"
import myDel from "./myDel.ce.vue"

const defineCustomElementsAll = () => {
  window.customElements.define("my-del", defineCustomElement(myDel))
  window.customElements.define("my-tabs", defineCustomElement(myTabs))
  window.customElements.define("my-table", defineCustomElement(myTable))
  window.customElements.define("my-list", defineCustomElement(myList))
  window.customElements.define("my-h2", defineCustomElement(myH2))
  window.customElements.define("my-h1", defineCustomElement(myH1))
  window.customElements.define("my-p", defineCustomElement(myP))
  window.customElements.define("my-emoji", defineCustomElement(myEmoji))
  window.customElements.define("my-a", defineCustomElement(MyA))
  window.customElements.define("my-music", defineCustomElement(myMusic))
  window.customElements.define("my-video", defineCustomElement(myVideo))
  window.customElements.define("my-code-md", defineCustomElement(myCodeMd))
  window.customElements.define("my-code", defineCustomElement(myCode))
  window.customElements.define("my-tips", defineCustomElement(myTips))
  window.customElements.define("my-iframe", defineCustomElement(myIframe))
  window.customElements.define("my-img", defineCustomElement(myImg))
}

export default defineCustomElementsAll
