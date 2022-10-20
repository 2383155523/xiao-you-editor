<template>
  <div class="editContainer">
    <div class="header" v-show="templates.length">
      <div
        class="item"
        v-for="(item, index) in templates"
        :key="index"
        @click="addTemplate(item.template)"
      >
        <img :src="item[theme].icon" alt="" class="icon" />
      </div>
    </div>
    <splitPane>
      <template #left>
        <div
          class="editBox"
          :style="{
            height: templates.length ? 'calc(100% - 50px)' : '100%',
          }"
        >
          <textarea
            name="write"
            class="edit"
            spellcheck="false"
            v-bind="attrs"
            ref="edit"
            @input="handleInput"
            @scroll="editScroll"
            @mouseenter="editMouseEnter"
            @keydown="keyDown"
          ></textarea>
          <div class="placeholder" v-show="placeholderIsShow">
            {{ style[theme].placeholder.content }}
          </div>
        </div>
      </template>

      <template #right>
        <div
          class="previewBox"
          :style="{
            height: templates.length ? 'calc(100% - 50px)' : '100%',
          }"
        >
          <div
            class="preview"
            ref="preview"
            @scroll="previewScroll"
            @mouseenter="previewMouseEnter"
          >
            <renderBox :template="template" :custom-parser="customParser" />
          </div>
        </div>
      </template>
    </splitPane>
  </div>
</template>

<script lang="ts" setup>
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
  withDefaults,
} from "vue"
import splitPane from "../splitPane/index.vue"
import { renderBox } from "../renderBox/index"
import { toStr, isEmpty } from "../utils/index"
import type {
  Templates,
  Styles,
  Theme,
  BorderRadius,
  TransitionMode,
  FontFamily,
  CustomParser,
} from "../index.d"
/***
 * @Global
 */

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

const defaultStyles: Styles = {
  light: {
    scrollBarColor: "red",
    border: {
      color: "#dddddd",
      style: "solid",
      width: "2px",
    },
    background: {
      url: "",
      repeat: "",
      size: "",
      color: "#fff",
    },
    placeholder: {
      color: "#333",
      content: "写点什么吧...",
      size: "16px",
      weight: "",
    },
    font: {
      color: "333",
      size: "16px",
      weight: "",
    },
  },
  dark: {
    scrollBarColor: "purple",
    border: {
      color: "#575050",
      style: "solid",
      width: "2px",
    },
    background: {
      url: "",
      repeat: "",
      size: "",
      color: "#303133",
    },
    placeholder: {
      color: "#dfdbdb",
      content: "写点什么吧...",
      size: "16px",
      weight: "",
    },
    font: {
      color: "#dfdbdb",
      size: "16px",
      weight: "",
    },
  },
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    styles?: Styles
    templates: Templates
    theme: Theme
    borderRadius?: BorderRadius
    transitionMode?: TransitionMode
    fontFamily?: FontFamily
    customParser?: CustomParser
  }>(),
  {
    fontFamily: "",
    transitionMode: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    modelValue: "",
    borderRadius: "20px",
    templates: () => [],
    styles: () => ({} as Styles),
    theme: "light",
    customParser: () => [],
  }
)

const { modelValue, theme, borderRadius, styles, transitionMode, fontFamily, customParser } =
  toRefs(props)
const style = ref<Styles>({} as Styles)

function diffAndMergeStyles(origin: Styles, target: Styles): Styles {
  const styles = {} as Styles

  for (let key in origin) {
    if (toStr(origin[key]) === "Object") {
      styles[key] = diffAndMergeStyles(origin[key], isEmpty(target) ? target : target[key])
    } else {
      if (isEmpty(target)) {
        styles[key] = origin[key]
      } else {
        styles[key] = target[key] ? target[key] : origin[key]
      }
    }
  }
  return styles
}

watch(
  styles,
  (styles: Styles) => {
    style.value = diffAndMergeStyles(defaultStyles, styles)
  },
  {
    immediate: true,
    deep: true,
  }
)

/**
 *@Data
 */

const edit = shallowRef<HTMLTextAreaElement>()
const preview = shallowRef<HTMLElement>()
const placeholderIsShow = ref<boolean>(true)
const template = ref<string>("")

/**
 * @Computed
 */

const _ref = computed(() => edit.value)
const nativeEditValue = computed(() => (props.modelValue ? String(props.modelValue) : ""))
/***
 * @Methods
 */

const keyDown = (e: KeyboardEvent) => {
  if (e.code == "Tab") {
    insertEdit(" ".repeat(4))

    e.preventDefault()
    e.returnValue = false
    return false
  }
}

const addTemplate = (template: string) => {
  insertEdit(template)
}

const handleInput = async (event: Event) => {
  let { value } = event.target as HTMLTextAreaElement
  if (value === nativeEditValue.value) return
  emit("update:modelValue", value)
  emit("input", value)
  await nextTick()
  setNativeEditValue()
}
const setNativeEditValue = () => {
  const edit = _ref.value
  if (!edit || edit.value === nativeEditValue.value) return
  edit.value = nativeEditValue.value
}
const editScroll = () => {
  if (isLeft) {
    const baiFenBi = Math.round((edit!.value!.scrollTop / edit!.value!.scrollHeight) * 100) / 100
    preview!.value!.scrollTo({
      top: baiFenBi * preview!.value!.scrollHeight,
    })
    if (edit!.value!.clientHeight + edit!.value!.scrollTop == edit!.value!.scrollHeight) {
      preview!.value!.scrollTo({
        top: preview!.value!.scrollHeight,
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
      Math.round((preview!.value!.scrollTop / preview!.value!.scrollHeight) * 100) / 100
    edit!.value!.scrollTo({
      top: baiFenBi * edit!.value!.scrollHeight,
    })
    if (preview!.value!.clientHeight + preview!.value!.scrollTop == preview!.value!.scrollHeight) {
      edit!.value!.scrollTo({
        top: edit!.value!.scrollHeight,
        behavior: "smooth",
      })
    }
  }
}
const previewMouseEnter = () => {
  isLeft = false
}

const insertEdit = (str: string) => {
  const cursorStartPosition = edit!.value!.selectionStart
  const beforeContent = modelValue.value.substring(0, cursorStartPosition)
  const afterContent = modelValue.value.substring(cursorStartPosition)
  emit("update:modelValue", `${beforeContent}${str}${afterContent}`)
  const timer = setTimeout(() => {
    edit!.value!.setSelectionRange(
      cursorStartPosition + str.length,
      cursorStartPosition + str.length
    )
    clearTimeout(timer)
  }, 0)
  // if (document.selection) {
  //   edit!.value!.focus()
  //   const sel: any = document.selection.createRange()
  //   sel.text = str
  //   sel.select()
  // }
  // //火狐/网景 浏览器
  // // || edit!.value!.selectionStart == "0"
  // else if (edit!.value!.selectionStart) {
  //   //得到光标前的位置
  //   let startPos = edit!.value!.selectionStart
  //   //得到光标后的位置
  //   let endPos = edit!.value!.selectionEnd
  //   // 在加入数据之前获得滚动条的高度
  //   let restoreTop = edit!.value!.scrollTop
  //   let value =
  //     modelValue.value.substring(0, startPos) +
  //     str +
  //     modelValue.value.substring(endPos, modelValue.value.length)
  //   // console.log("value1", modelValue.value)
  //   emit("update:modelValue", value)
  //   //如果滚动条高度大于0
  //   if (restoreTop > 0) {
  //     // 返回
  //     edit!.value!.scrollTop = restoreTop
  //   }
  //   edit!.value!.focus()
  //   edit!.value!.selectionStart = startPos + str.length
  //   edit!.value!.selectionEnd = startPos + str.length
  // } else {
  //   let value = modelValue.value + str
  //   emit("update:modelValue", value)
  //   edit!.value!.focus()
  // }
}

/**
 * @Watch
 */

watch(nativeEditValue, () => setNativeEditValue())

watch(
  modelValue,
  (newVal: string) => {
    placeholderIsShow.value = newVal.length == 0
    template.value = newVal
  },
  {
    immediate: true,
  }
)

/**
 * @onMounted
 */

onMounted(() => {
  setNativeEditValue()
  placeholderIsShow.value = modelValue.value.length == 0
})
</script>

<style scoped>
.editContainer {
  width: 100%;
  height: 100%;
  background-image: v-bind("style[theme].background.url");
  background-color: v-bind("style[theme].background.color");
  background-size: v-bind("style[theme].background.size");
  background-repeat: v-bind("style[theme].background.repeat");
  border-radius: v-bind("borderRadius");
  border-color: v-bind("style[theme].border.color");
  border-width: v-bind("style[theme].border.width");
  border-style: v-bind("style[theme].border.style");
  transition: v-bind("transitionMode");
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.editContainer .header {
  width: 100%;
  box-sizing: border-box;
  border-bottom-color: v-bind("style[theme].border.color");
  border-bottom-width: v-bind("style[theme].border.width");
  border-bottom-style: v-bind("style[theme].border.style");
  transition: v-bind("transitionMode");
  height: 50px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
}
.editContainer .header .item {
  /* width: 40px; */
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}
.editContainer .header .item .icon {
  width: 25px;
  height: 25px;
}

.editBox {
  flex: 1;
  position: relative;
}
.editBox .placeholder {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: v-bind("style[theme].placeholder.size");
  font-weight: v-bind("style[theme].placeholder.weight");
  color: v-bind("style[theme].placeholder.color");
  transition: v-bind("transitionMode");
  font-family: v-bind("fontFamily");
}
.editBox .edit {
  width: 100%;
  max-width: 100%;
  height: 100%;
  border-bottom-left-radius: v-bind("borderRadius");
  border: none;
  font-size: v-bind("style[theme].font.size");
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  outline: none;
  color: v-bind("style[theme].font.color ");
  border-right-color: v-bind("style[theme].border.color");
  border-right-width: v-bind("style[theme].border.width");
  border-right-style: v-bind("style[theme].border.style");
  word-break: break-all;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: transparent;
  transition: v-bind("transitionMode");
  font-family: v-bind("fontFamily");
}

.previewBox {
  flex: 1;
}

.previewBox .preview {
  width: 100%;
  height: 100%;
  border-bottom-right-radius: v-bind("borderRadius");
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 10px;
  word-break: break-all;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-left: none;
  background: transparent;
  color: v-bind("style[theme].font.color");
  transition: v-bind("transitionMode");
  font-family: v-bind("fontFamily");
  overflow-x: hidden;
}
*::-webkit-scrollbar,
*::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: v-bind("style[theme].scrollBarColor");
  transition: v-bind("transitionMode");
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
  background-color: v-bind("style[theme].scrollBarColor");
  transition: v-bind("transitionMode");
}

* ::-moz-selection {
  color: #fff;
  background-color: v-bind("style[theme].scrollBarColor");
  transition: v-bind("transitionMode");
}

*::-webkit-selection {
  color: #fff;
  background-color: v-bind("style[theme].scrollBarColor");
  transition: v-bind("transitionMode");
}
</style>
