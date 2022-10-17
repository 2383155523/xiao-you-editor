<template>
  <div class="editContainer">
    <div class="header">
      <div
        class="item"
        v-for="(item, index) in utils"
        :key="index"
        @click="addTemplate(item.template)"
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
            {{ styles[theme]?.placeholder?.content }}
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
          >
            <renderBox :template="template" />
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
import { setStorage } from "../utils/storage"
import type { Utils, Styles, Theme, BorderRadius, CacheMode } from "../index.d"
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

const props = withDefaults(
  defineProps<{
    modelValue: string
    styles?: Styles
    utils: Utils
    theme: Theme
    borderRadius?: BorderRadius
    cacheMode?: CacheMode
  }>(),
  {
    cacheMode: true,
    modelValue: "",
    borderRadius: "20px",
    styles: () => ({
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
          content: "light 写点什么吧...",
          size: "16px",
          weight: "",
        },
        font: {
          color: "333",
          size: "16px",
          weight: " ",
        },
      },
      dark: {
        scrollBarColor: "#333",
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
          content: "dark 写点什么吧...",
          size: "16px",
          weight: "",
        },
        font: {
          color: "#dfdbdb",
          size: "16px",
          weight: "",
        },
      },
    }),
    utils: () => [],
    theme: "light",
  }
)

const { modelValue, theme, styles, borderRadius, cacheMode } = toRefs(props)

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
  if (document.selection) {
    edit!.value!.focus()
    const sel: any = document.selection.createRange()
    sel.text = str
    sel.select()
  }

  //火狐/网景 浏览器
  // || edit!.value!.selectionStart == "0"
  else if (edit!.value!.selectionStart) {
    //得到光标前的位置
    let startPos = edit!.value!.selectionStart
    //得到光标后的位置
    let endPos = edit!.value!.selectionEnd
    // 在加入数据之前获得滚动条的高度
    let restoreTop = edit!.value!.scrollTop

    let value =
      modelValue.value.substring(0, startPos) +
      str +
      modelValue.value.substring(endPos, modelValue.value.length)
    // console.log("value1", modelValue.value)
    emit("update:modelValue", value)
    //如果滚动条高度大于0
    if (restoreTop > 0) {
      // 返回
      edit!.value!.scrollTop = restoreTop
    }
    edit!.value!.focus()
    edit!.value!.selectionStart = startPos + str.length
    edit!.value!.selectionEnd = startPos + str.length
  } else {
    let value = modelValue.value + str
    emit("update:modelValue", value)

    edit!.value!.focus()
  }
}

/**
 * @Watch
 */

watch(nativeEditValue, () => setNativeEditValue())
//parse code RegExp
const reg =
  / {0,3}\n*(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/g
watch(
  modelValue,
  (newVal: string) => {
    placeholderIsShow.value = newVal.length == 0
    if (reg.test(newVal)) {
      template.value = newVal.replace(reg, (...arg) => {
        const lang = arg[2].trim()
        let code = arg[3]
        if (code) {
          code = code.replaceAll(`"`, `亻`)
        }
        return `<my-code lang="${lang}" code="${code}"></my-code>`
      })
    } else {
      template.value = newVal
    }
    if (cacheMode.value) {
      //开启缓存模式 本地缓存模板信息
      setStorage("xy_editor_template", template.value)
    }
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
  background-image: v-bind("styles[theme].background.url");
  background-color: v-bind("styles[theme].background.color");
  background-size: v-bind("styles[theme].background.size");
  background-repeat: v-bind("styles[theme].background.repeat");
  border-radius: v-bind("borderRadius");
  border-color: v-bind("styles[theme].border.color");
  border-width: v-bind("styles[theme].border.width");
  border-style: v-bind("styles[theme].border.style");
}
.editContainer .header {
  width: 100%;
  box-sizing: border-box;
  border-bottom-color: v-bind("styles[theme].border.color");
  border-bottom-width: v-bind("styles[theme].border.width");
  border-bottom-style: v-bind("styles[theme].border.style");
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
  height: calc(100% - 50px);
  position: relative;
}
.editBox .placeholder {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: v-bind("styles[theme].placeholder.size");
  font-weight: v-bind("styles[theme].placeholder.weight");
  color: v-bind("styles[theme].placeholder.color");
}
.editBox .edit {
  width: 100%;
  max-width: 100%;
  height: 100%;
  border-bottom-left-radius: v-bind("borderRadius");
  border: none;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  outline: none;
  color: v-bind("styles[theme].font.color");
  border-right-color: v-bind("styles[theme].border.color");
  border-right-width: v-bind("styles[theme].border.width");
  border-right-style: v-bind("styles[theme].border.style");
  overflow-x: hidden;
  word-break: break-all;
  font-family: "oppo";
  background: transparent;
  transition: all 0.3s linear;
}

.previewBox {
  flex: 1;
  height: calc(100% - 50px);
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
  border-left: none;
  background: transparent;
  color: v-bind("styles[theme].font.color");
}
*::-webkit-scrollbar,
*::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: v-bind("styles[theme].scrollBarColor");
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
  background-color: v-bind("styles[theme].scrollBarColor");
}

* ::-moz-selection {
  color: #fff;
  background-color: v-bind("styles[theme].scrollBarColor");
}

*::-webkit-selection {
  color: #fff;
  background-color: v-bind("styles[theme].scrollBarColor");
}
</style>
