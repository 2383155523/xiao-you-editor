import { defineComponent } from "vue"
import { nodesTransformVNodes, templateTransformNodes } from "xiao-you-transform-v3"
import type { Component } from "vue"

interface Cop {
  [key: string]: Component
}

//合并局部组件和全局组件
//兼容组件库的使用，前提是组件库全部安装
const mergeComponents = (globalComponents: Cop): Cop => {
  const componentsCopy: Cop = {}
  //组件合并黑名单
  const blackComponentsList: Array<string> = ["RouterLink", "RouterView"]
  const reg = /([A-Z])/g
  for (let key in globalComponents) {
    if (!blackComponentsList.some(item => item == key)) {
      let changedKey = key
      changedKey = changedKey.replace(changedKey[0], changedKey[0].toLowerCase())
      changedKey = changedKey.replace(reg, function (a, b) {
        return "-" + b.toLowerCase()
      })
      componentsCopy[changedKey] = globalComponents[key]
    }
  }
  return Object.assign(componentsCopy, {})
}

function init(template: string, globalComponents: Cop) {
  if (template.trim() === "") {
    return
  }
  const nodes = templateTransformNodes(template)
  return nodesTransformVNodes(nodes, mergeComponents(globalComponents))
}

export const renderBox = defineComponent({
  props: {
    template: String,
  },
  render() {
    return init(`<div>${this.template}</div>`, this.$root!.$.appContext.components as Cop)
  },
})
