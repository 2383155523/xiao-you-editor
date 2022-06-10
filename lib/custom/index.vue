<template>
  <div class="editContainer">
    <div class="header">
      <div
        class="item"
        v-for="(item, index) in utils"
        :key="index"
        @click="addTemplate(item.template, item.hooks)"
      >
        <img :src="item.icon" alt="" class="icon" />
      </div>
    </div>
    <splitPane>
      <template #left>
        <div class="editBox">
          <textarea
            name="write"
            class="edit"
            spellcheck="false"
            v-bind="attrs"
            ref="edit"
            @input="handleInput"
            @scroll="editScroll"
            @mouseenter="editMouseEnter"
          ></textarea>
          <div class="placeholder" v-show="placeholderIsShow">
            {{ placeholder }}
          </div>
        </div>
      </template>

      <template #right>
        <div class="previewBox">
          <div
            class="preview"
            ref="preview"
            @scroll="previewScroll"
            @mouseenter="previewMouseEnter"
          ></div>
        </div>
      </template>
    </splitPane>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  defineProps,
  defineEmits,
  toRefs,
  ref,
  useAttrs,
  shallowRef,
  computed,
  watch,
  nextTick,
} from "vue"
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  attributesModule,
  toVNode,
} from "snabbdom"
import splitPane from "../splitPane/index.vue"
import type { PropType } from "vue"
import type { styles, utilItem, hooks } from "../index.d"
/***
 * @Global
 */

const patch = init([
  // 通过传入模块初始化 patch 函数
  classModule, // 开启 classes 功能
  attributesModule, //开启attributes功能
  propsModule, // 支持传入 props
  styleModule, // 支持内联样式同时支持动画
  eventListenersModule, // 添加事件监听
])
let oldVnode: any
let isLeft: boolean = false
/**
 * @Attrs
 */

const attrs = useAttrs()

/**
 * @Emit
 */

const emit = defineEmits(["input", "update:modelValue"])

/**
 * @Props
 */

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: "",
  },
  styles: {
    type: Object as PropType<styles>,
    default: {
      containerStyle: {
        borderRadius: "10px",
      },
    },
  },
  placeholder: {
    type: String as PropType<string>,
    default: "写点什么吧...",
  },
  utils: {
    type: Array as PropType<Array<utilItem>>,
    default: [],
  },
})
const { modelValue, utils, placeholder } = toRefs(props)

/**
 *@Data
 */

const edit = shallowRef<HTMLTextAreaElement>()
const preview = shallowRef<HTMLElement>()
const placeholderIsShow = ref<boolean>(true)
const style = ref<styles>(props.styles)
console.log("style", style)

/**
 * @Computed
 */

const _ref = computed(() => edit.value)
const nativeEditValue = computed(() =>
  props.modelValue ? String(props.modelValue) : "",
)
/***
 * @Methods
 */

const addTemplate = (template: string, hooks: hooks) => {
  const newTemplate = hooks?.beforeInsert ? hooks.beforeInsert(template) : null
  insertEdit(newTemplate ? newTemplate : template)
  hooks?.inserted(newTemplate ? newTemplate : template)
}

const handleInput = async (event: Event) => {
  let { value } = event.target as HTMLTextAreaElement
  if (value === nativeEditValue.value) return
  emit("update:modelValue", value)
  emit("input", value)
  await nextTick()
  setNativeEditValue()
  renderPreview(value)
}
const setNativeEditValue = () => {
  const edit = _ref.value
  if (!edit || edit.value === nativeEditValue.value) return
  edit.value = nativeEditValue.value
}
const editScroll = () => {
  if (isLeft) {
    const baiFenBi =
      Math.round((edit.value.scrollTop / edit.value.scrollHeight) * 100) / 100
    preview.value.scrollTo({
      top: baiFenBi * preview.value.scrollHeight,
    })
    if (
      edit.value.clientHeight + edit.value.scrollTop ==
      edit.value.scrollHeight
    ) {
      preview.value.scrollTo({
        top: preview.value.scrollHeight,
        behavior: "smooth",
      })
    }
  }
}

const editMouseEnter = () => {
  isLeft = true
}
const previewScroll = () => {
  if (!isLeft) {
    const baiFenBi =
      Math.round((preview.value.scrollTop / preview.value.scrollHeight) * 100) /
      100
    edit.value.scrollTo({
      top: baiFenBi * edit.value.scrollHeight,
    })
    if (
      preview.value.clientHeight + preview.value.scrollTop ==
      preview.value.scrollHeight
    ) {
      edit.value.scrollTo({
        top: edit.value.scrollHeight,
        behavior: "smooth",
      })
    }
  }
}
const previewMouseEnter = () => {
  isLeft = false
}
const insertEdit = (str: string) => {
  if (document.selection) {
    edit.value.focus()
    const sel: any = document.selection.createRange()
    sel.text = str
    sel.select()
  }

  //火狐/网景 浏览器
  else if (edit.value.selectionStart || edit.value.selectionStart == "0") {
    //得到光标前的位置
    let startPos = edit.value.selectionStart
    //得到光标后的位置
    let endPos = edit.value.selectionEnd
    // 在加入数据之前获得滚动条的高度
    let restoreTop = edit.value.scrollTop

    let value =
      modelValue.value.substring(0, startPos) +
      str +
      modelValue.value.substring(endPos, modelValue.value.length)
    // console.log("value1", modelValue.value)
    emit("update:modelValue", value)
    //如果滚动条高度大于0
    if (restoreTop > 0) {
      // 返回
      edit.scrollTop = restoreTop
    }
    edit.value.focus()
    edit.value.selectionStart = startPos + str.length
    edit.value.selectionEnd = startPos + str.length
  } else {
    let value = modelValue.value + str
    console.log("value2", value)
    emit("update:modelValue", value)

    edit.value.focus()
  }
}
const initPreviewBox = () => {
  try {
    const preview = document.querySelector(".preview")
    oldVnode = toVNode(preview)
    patch(preview, oldVnode)
  } catch (error) {}
}
const renderPreview = (value: string) => {
  const el = document.createElement("div")
  el.className = "preview"
  el.innerHTML = value
  const newVnode = toVNode(el)
  try {
    patch(oldVnode, newVnode)
  } catch (error) {}
  oldVnode = newVnode
}

/**
 * @Watch
 */

watch(nativeEditValue, () => setNativeEditValue())

watch(modelValue, (newVal: string) => {
  placeholderIsShow.value = newVal.length == 0
  renderPreview(newVal)
})

/**
 * @onMounted
 */

onMounted(() => {
  setNativeEditValue()
  initPreviewBox()
  placeholderIsShow.value = modelValue.value.length == 0
  renderPreview(modelValue.value)
})
</script>

<style scoped>
.editContainer {
  width: 100%;
  height: 100%;
  background: v-bind("style.containerStyle.background.url");
  background-color: v-bind("style.containerStyle.background.color");
  background-size: v-bind("style.containerStyle.background.size");
  background-repeat: v-bind("style.containerStyle.background.repeat");
  border-radius: v-bind(
    "style.containerStyle.borderRadius ? style.containerStyle.borderRadius : '10px'"
  );
  font-family: v-bind("style.containerStyle.font.family");
  font-size: v-bind("style.containerStyle.font.size");
  font-weight: v-bind("style.containerStyle.font.weight");
  color: v-bind("style.containerStyle.font.color");
}
.editContainer .header {
  width: 100%;
  box-sizing: border-box;
  border-bottom-color: v-bind("style.containerStyle.border.color");
  border-bottom-width: v-bind("style.containerStyle.border.width");
  border-bottom-style: v-bind("style.containerStyle.border.style");
  height: 50px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  background: v-bind("style.headerBoxStyle.background.url");
  background-color: v-bind("style.headerBoxStyle.background.color");
  background-size: v-bind("style.headerBoxStyle.background.size");
  background-repeat: v-bind("style.headerBoxStyle.background.repeat");
}
.editContainer .header .item {
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.editContainer .header .item .icon {
  width: 25px;
  height: 25px;
}

.editBox {
  flex: 1;
  height: calc(100% - 50px);
  position: relative;
  background: v-bind(
    "style.editBoxStyle.background.url ? style.editBoxStyle.background.url :'transparent'"
  );
  background-color: v-bind("style.editBoxStyle.background.color");
  background-size: v-bind("style.editBoxStyle.background.size");
  background-repeat: v-bind("style.editBoxStyle.background.repeat");
}
.editBox .placeholder {
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: v-bind("style.placeholderStyle.family");
  font-size: v-bind("style.placeholderStyle.size");
  font-weight: v-bind("style.placeholderStyle.weight");
  color: v-bind("style.placeholderStyle.color");
}
.editBox .edit {
  width: 100%;
  height: 100%;
  border-bottom-left-radius: v-bind(
    "style.containerStyle.borderRadius ? style.containerStyle.borderRadius : '10px'"
  );
  border: none;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  outline: none;
  border-right-color: v-bind("style.containerStyle.border.color");
  border-right-width: v-bind("style.containerStyle.border.width");
  border-right-style: v-bind("style.containerStyle.border.style");

  font-family: v-bind("style.editBoxStyle.font.family");
  font-size: v-bind("style.editBoxStyle.font.size");
  font-weight: v-bind("style.editBoxStyle.font.weight");
  color: v-bind("style.editBoxStyle.font.color");

  overflow-x: hidden;
  word-break: break-all;
  font-family: "oppo";
  background: transparent;
}

.previewBox {
  flex: 1;
  height: calc(100% - 50px);
}

.previewBox .preview {
  width: 100%;
  height: 100%;
  border-bottom-right-radius: v-bind(
    "style.containerStyle.borderRadius ? style.containerStyle.borderRadius : '10px'"
  );
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 10px;
  word-break: break-all;
  border-left: none;
  font-family: v-bind("style.priviewBoxStyle.font.family");
  font-size: v-bind("style.priviewBoxStyle.font.size");
  font-weight: v-bind("style.priviewBoxStyle.font.weight");
  color: v-bind("style.priviewBoxStyle.font.color");

  background: v-bind(
    "style.priviewBoxStyle.background.url ? style.priviewBoxStyle.background.url :'transparent'"
  );
  background-color: v-bind("style.priviewBoxStyle.background.color");
  background-size: v-bind("style.priviewBoxStyle.background.size");
  background-repeat: v-bind("style.priviewBoxStyle.background.repeat");
}
*::-webkit-scrollbar,
*::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: v-bind("style.containerStyle.scrollBarColor");
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

*::-webkit-scrollbar {
  width: 7px;
  height: 6px;
}
* ::selection {
  color: #fff;
  background-color: v-bind("style.containerStyle.scrollBarColor");
}

* ::-moz-selection {
  color: #fff;
  background-color: v-bind("style.containerStyle.scrollBarColor");
}

*::-webkit-selection {
  color: #fff;
  background-color: v-bind("style.containerStyle.scrollBarColor");
}
</style>
