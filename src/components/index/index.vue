<template>
  <div class="edit">
    <xy-editor
      v-model="blogContent"
      :theme="theme"
      border-radius="15px"
      font-family="HarmonyOS_Sans_SC_Medium"
      :custom-parser="customParser"
      :templates="templates"
      transitionMode="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    />
    <!-- :styles="styles" -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { styles } from "./editorConfig/styles"
import { templates } from "./editorConfig/templates"
import bus from "@/eventBus/index"

//编辑内容的双向绑定
const blogContent = ref(`<my-h1>一级标题</my-h1>

<my-h2>二级标题</my-h2>

<my-music id="1899705498"></my-music>

<my-video src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/video/zuozhu.mp4"></my-video>

<my-img src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/blog-imgs/18.jpg"></my-img>

~~~js
const str = "string"
const number = 20

function toSum (a,b){
  return a + b;
}
console.log(toSum(1,2))
  ~~~
<my-p>我是本文段落</my-p>

<my-a color="#409EFFFF" size="16px" weight="bold" href="http://www.fuyouplus.cn/" line>微若蜉蝣</my-a>

      <my-tips type="info" title="小蝣说:">
      tpye的可选值有 info | warn | error | success
  </my-tips>

<my-del>我是删除线</my-del>
  <my-list>
      <li>我是li</li>
  </my-list>

<my-table height="165px">
  
      <div class="th">
        <div class="th-td">标题</div>
        <div class="th-td">内容</div>
        <div class="th-td">时间</div>
      </div>
  
      <div class="content">
  
      <div class="tr">
  
      <div class="tr-td">标题1</div>
      <div class="tr-td">内容2</div>
      <div class="tr-td">2022</div>
  
      </div>
  
      <div class="tr">
  
      <div class="tr-td">标题1</div>
      <div class="tr-td">内容2</div>
      <div class="tr-td">2022</div>
  
      </div>
  
      </div>
      </my-table>

<my-tabs tabs="Release|Video">
  
      <div class="tab-item">
        <my-code lang="js" src="/release.js"></my-code>
      </div>

      <div class="tab-item">
      <my-video src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/video/zuozhu.mp4"></my-video>
      </div>
  
    </my-tabs>

<my-iframe src="https://fuyouplus.cn/" h="900px"></my-iframe>`)
//主题
const theme = ref<"light" | "dark">("light")

bus.on("theme", (v: "light" | "dark") => {
  console.log(v)

  theme.value = v
})

//自定义解析器
const customParser = [
  (template: string) => {
    //Parse code RegExp
    let templateReplaceContent = template
    const reg =
      / {0,3}\n*(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/g
    if (reg.test(template)) {
      console.log("code")
      templateReplaceContent = template.replace(reg, (...arg) => {
        console.log(arg)
        const lang = arg[2].trim()
        let code = arg[3] ?? ""
        if (code) {
          code = code.replaceAll(`"`, `亻`)
        }
        return `<my-code lang="${lang}" code="${code}"></my-code>`
      })
    }
    return templateReplaceContent
  },
]
</script>

<style scoped>
.edit {
  width: 90%;
  height: 85vh;
  margin: 20px auto;
}
</style>
