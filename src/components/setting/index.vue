<script lang="ts" setup>
import { ref, watch, toRef } from "vue"
import settingLight from "@/assets/setting-light.svg"
import settingDark from "@/assets/setting-dark.svg"
import sun from "@/assets/sun.svg"
import moon from "@/assets/moon.svg"
import {
  NDrawer,
  NDrawerContent,
  NDivider,
  NColorPicker,
  NSwitch,
  NInput,
  NButton,
  useNotification,
} from "naive-ui"
import { setting } from "../index/editorConfig/setting"
import { content } from "../index/editorConfig/defaultContent"
import type { Theme } from "xiao-you-editor"
const settingIsShow = ref<boolean>(false)
const templateHeaderIsShow = ref<boolean>(Boolean(setting.templates.length))
const theme = toRef(setting, "theme")
const templatesClone = JSON.parse(JSON.stringify(setting.templates))
const notification = useNotification()

watch(templateHeaderIsShow, (v: boolean) => {
  if (v) {
    setting.templates = templatesClone
  } else {
    setting.templates = []
  }
})

watch(theme, (v: Theme) => {
  const html = document.querySelector("html") as HTMLHtmlElement
  if (v == "dark") {
    html.className = "dark"
  } else {
    html.className = "light"
  }
})

function generateSettingCode() {
  const settingCode = `~~~js
  //Editor custom setting code
  const fontFamily = "${setting.fontFamily}"

  const transitionMode = "${setting.transitionMode}"

  const borderRadius = "${setting.borderRadius}"

  const styles = {
    light: {
      scrollBarColor: "${setting.styles.light.scrollBarColor}",
      border: {
        color: "${setting.styles.light.border.color}",
        style: "${setting.styles.light.border.style}",
        width: "${setting.styles.light.border.width}",
      },
      background: {
        url: "${setting.styles.light.background.url}",
        repeat: "${setting.styles.light.background.repeat}",
        size: "${setting.styles.light.background.size}",
        color: "${setting.styles.light.background.color}",
      },
      placeholder: {
        color: "${setting.styles.light.placeholder.color}",
        content: "${setting.styles.light.placeholder.content}",
        size: "${setting.styles.light.placeholder.size}",
        weight: "${setting.styles.light.placeholder.weight}",
      },
      font: {
        color: "${setting.styles.light.font.color}",
        size: "${setting.styles.light.font.size}",
        weight: "${setting.styles.light.font.weight}",
      },
    },
    dark: {
      scrollBarColor: "${setting.styles.dark.scrollBarColor}",
      border: {
        color: "${setting.styles.dark.border.color}",
        style: "${setting.styles.dark.border.style}",
        width: "${setting.styles.dark.border.width}",
      },
      background: {
        url: "${setting.styles.dark.background.url}",
        repeat: "${setting.styles.dark.background.repeat}",
        size: "${setting.styles.dark.background.size}",
        color: "${setting.styles.dark.background.color}",
      },
      placeholder: {
        color: "${setting.styles.dark.placeholder.color}",
        content: "${setting.styles.dark.placeholder.content}",
        size: "${setting.styles.dark.placeholder.size}",
        weight: "${setting.styles.dark.placeholder.weight}",
      },
      font: {
        color: "${setting.styles.dark.font.color}",
        size: "${setting.styles.dark.font.size}",
        weight: "${setting.styles.dark.font.weight}",
      },
    },
  }
~~~
  `
  content.value = settingCode
  notification.success({
    content: "生成成功🎉🎉🎉",
    meta: "配置代码已生成在编辑器的预览区哟 快去愉快的Copy叭 ~~ . ~~",
    duration: 3000,
    keepAliveOnHover: true,
  })
}
</script>

<template>
  <div class="setting">
    <img
      :src="setting.theme == 'dark' ? settingDark : settingLight"
      alt=""
      class="icon"
      @click="settingIsShow = true"
    />
  </div>
  <n-drawer v-model:show="settingIsShow" :width="300">
    <n-drawer-content closable>
      <template #header>
        <div class="settingHeader">Custom Setting</div>
      </template>
      <template #default>
        <div class="setting-box">
          <n-divider title-placement="center">BorderRadius</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.borderRadius"
              type="text"
              placeholder="Define BorderRadius"
            />
          </div>
          <n-divider title-placement="center">FontFamily</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.fontFamily"
              type="text"
              placeholder="Define FontFamily"
            />
          </div>
          <n-divider title-placement="center">TransitionMode</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.transitionMode"
              type="text"
              placeholder="Define TransitionMode"
            />
          </div>
          <n-divider title-placement="center">Show Templates Header</n-divider>
          <div class="content">
            <div style="display: inline-block">
              <n-switch v-model:value="templateHeaderIsShow">
                <template #checked>show</template>
                <template #unchecked>hidden</template>
              </n-switch>
            </div>
          </div>
          <n-divider title-placement="center">Theme Toggle</n-divider>
          <div class="content">
            <div style="display: inline-block">
              <n-switch v-model:value="setting.theme" checked-value="dark" unchecked-value="light">
                <template #checked>
                  <img :src="sun" alt="" class="theme-icon" />
                </template>
                <template #unchecked>
                  <img :src="moon" alt="" class="theme-icon" />
                </template>
              </n-switch>
            </div>
          </div>
          <n-divider title-placement="center">Theme Styles</n-divider>
          <n-divider title-placement="center">ScrollBarColor</n-divider>
          <div class="content">
            <n-color-picker
              :show-preview="true"
              placement="bottom"
              v-model:value="setting.styles[theme].scrollBarColor"
            />
          </div>
          <n-divider title-placement="center">Border Color</n-divider>
          <div class="content">
            <n-color-picker
              :show-preview="true"
              placement="bottom"
              v-model:value="setting.styles[theme].border.color"
            />
          </div>
          <n-divider title-placement="center">Border Style</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].border.style"
              type="text"
              placeholder="Define Border Style"
            />
          </div>
          <n-divider title-placement="center">Border Width</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].border.width"
              type="text"
              placeholder="Define Border Width"
            />
          </div>
          <n-divider title-placement="center">Background Url</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].background.url"
              type="text"
              placeholder="Define Background Url"
            />
          </div>
          <n-divider title-placement="center">Background Repeat</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].background.repeat"
              type="text"
              placeholder="Define Background Repeat"
            />
          </div>
          <n-divider title-placement="center">Background Size</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].background.size"
              type="text"
              placeholder="Define Background Size"
            />
          </div>
          <n-divider title-placement="center">Background Color</n-divider>
          <div class="content">
            <n-color-picker
              :show-preview="true"
              placement="bottom"
              v-model:value="setting.styles[theme].background.color"
            />
          </div>
          <n-divider title-placement="center">Placeholder Color</n-divider>
          <div class="content">
            <n-color-picker
              :show-preview="true"
              placement="bottom"
              v-model:value="setting.styles[theme].placeholder.color"
            />
          </div>
          <n-divider title-placement="center">Placeholder Content</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].placeholder.content"
              type="text"
              placeholder="Define Placeholder Content"
            />
          </div>
          <n-divider title-placement="center">Placeholder Size</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].placeholder.size"
              type="text"
              placeholder="Define Placeholder Size"
            />
          </div>
          <n-divider title-placement="center">Placeholder Weight</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].placeholder.weight"
              type="text"
              placeholder="Define Placeholder Weight"
            />
          </div>
          <n-divider title-placement="center">Font Color</n-divider>
          <div class="content">
            <n-color-picker
              :show-preview="true"
              placement="bottom"
              v-model:value="setting.styles[theme].font.color"
            />
          </div>
          <n-divider title-placement="center">Font Size</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].font.size"
              type="text"
              placeholder="Define Font Size"
            />
          </div>
          <n-divider title-placement="center">Font Weight</n-divider>
          <div class="content">
            <n-input
              v-model:value="setting.styles[theme].font.weight"
              type="text"
              placeholder="Define Font Weight"
            />
          </div>
          <div class="generate-setting-code">
            <n-button type="primary" @click="generateSettingCode">Generate Setting Code</n-button>
          </div>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
.setting-box {
  padding-bottom: 80px;
  box-sizing: border-box;
}
.generate-setting-code {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--BodyColor);
  opacity: 0.8;
  transition: all 0.4s var(--n-bezier);
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-icon {
  width: 20px;
  height: 20px;
  transition: all 0.4s var(--n-bezier);
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAMAAAC+/9RaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAbZQTFRFAAAAAAAAAAAAAAAAFiIiEhskGCQnP0pNAAAAFyIkpamqAAAAFyQm5ufnAAAAAAAAFyQnAAAAAAAAFyMmFyMmAAAAAAAAFyMmFiMlFiAjAAAAm6Ch19nZanJ0FyQmGCMnGCQn5OXlo6ip5ufnfoWGFyQmFyQoGCQmFBQUGSElFyQkFSImERoaAAAA5ebnrLCy8/P0kJaXFiMlFyMlYmttqa6vi5GTKDQ3FBoe6+vsFyMlAAAAFSAgLzo9+Pj44+XlTVZZFiIl9fX1FiMmAAAADAwMFSEjgYiJ9vf3g4mLFyMkAAAAAAAAAAkJFSAijJKT09XWFSEkAAAABwcHFSAjtLi5v8PDFSAiDhMTKjQ36uvrq6+wFCAiAAAAEh0fbnV3lpydFBwfAAAAFSIkuby9fYSGERsfChQUJzI15ebmZGxuERoaAAAAEhseV2Bi+fn5SFFUDBgYAAAAEx4gZ25w5ufnJzI1CQkJAAAAEhwfFiAjKTQ2JzI1JTAzIi0wISwvHiotGycqGSUoFyMmFiMlAAAAAAAAAAcHAAcHAAAAAAAAAAAAAAAAAAAAAAAA/Pz8+/v7////0oTyBwAAAI90Uk5TAAECAxccd6oGYtILj/MEDqUFEKanEhGofU8I0uu8holW8tTywo2Nag0+TTwdFPPY+shnbrfTxqBN9ZAKMKj98req+58NFXrI/MuTDwwdhs7qhQcjkd7hdzar9tlpFWLE0FobkN/HSzSo8747CVa9/bUrGHbB9KsbGmOXsK+vrq6trKyqnxYdJCUlJCMiHhf4pz4qAAAAAWJLR0SRDw2+mgAAAAlvRkZzAAAABQAAAAEAk/wWPAAAAAlwSFlzAAAAyAAAAMgAY/rnrQAAAAl2cEFnAAAAIAAAACAAh/qcnQAAAWFJREFUKM9t0vVbwkAYB3DuTnTUjU1CZ3diNyoGJrOwuxu7uwvj/JPdHIwN+P625/Pc7n2+72k0cgAAmmgBEMUgGMUA0sbGxWpRJAFKpyd6HRUpyGA0EZPRgCKOYNpMCDHTOPwQYNh4QSxWKnwIwNgsgtgTEjmMVNMHJCk5JTUtnWOCCCBElFUUQjIys7JzcvPy/38KcUFhUbFDEiElpWXlFeL4kKqsqq6prbOTUOobnEiYt7GpmRBXS6tC2trdWLi7o7Prl5DuHoW4ej2CYL6vf4CoMzgkiAZ62eGRUbWMjdNYbJmzTkxOqWR6RrhHJOfs3LxKFhZ5JBXgXlpeUcrqmlMqHVLs+samQra2fTBQj8+xs7sXkv0DDgbXwx8eHZ/IcnrmDfYNGfr84vLq+ub27v7h8enZJq8dQIp+eX17//D7/Z9f3z+8YreQcbpZmxSPgYKqd4WZQDCCYSuXI379AQ00jFgn0DRAAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEyLTE2VDAzOjU2OjM1KzAwOjAwG+p+UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMi0xNlQwMzo1NjozNSswMDowMGq3xuwAAAAASUVORK5CYII=),
    auto !important;
}

.setting {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  user-select: none;
  .icon {
    width: 25px;
    height: 25px;
    transition: all 0.4s var(--n-bezier);
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAMAAAC+/9RaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAbZQTFRFAAAAAAAAAAAAAAAAFiIiEhskGCQnP0pNAAAAFyIkpamqAAAAFyQm5ufnAAAAAAAAFyQnAAAAAAAAFyMmFyMmAAAAAAAAFyMmFiMlFiAjAAAAm6Ch19nZanJ0FyQmGCMnGCQn5OXlo6ip5ufnfoWGFyQmFyQoGCQmFBQUGSElFyQkFSImERoaAAAA5ebnrLCy8/P0kJaXFiMlFyMlYmttqa6vi5GTKDQ3FBoe6+vsFyMlAAAAFSAgLzo9+Pj44+XlTVZZFiIl9fX1FiMmAAAADAwMFSEjgYiJ9vf3g4mLFyMkAAAAAAAAAAkJFSAijJKT09XWFSEkAAAABwcHFSAjtLi5v8PDFSAiDhMTKjQ36uvrq6+wFCAiAAAAEh0fbnV3lpydFBwfAAAAFSIkuby9fYSGERsfChQUJzI15ebmZGxuERoaAAAAEhseV2Bi+fn5SFFUDBgYAAAAEx4gZ25w5ufnJzI1CQkJAAAAEhwfFiAjKTQ2JzI1JTAzIi0wISwvHiotGycqGSUoFyMmFiMlAAAAAAAAAAcHAAcHAAAAAAAAAAAAAAAAAAAAAAAA/Pz8+/v7////0oTyBwAAAI90Uk5TAAECAxccd6oGYtILj/MEDqUFEKanEhGofU8I0uu8holW8tTywo2Nag0+TTwdFPPY+shnbrfTxqBN9ZAKMKj98req+58NFXrI/MuTDwwdhs7qhQcjkd7hdzar9tlpFWLE0FobkN/HSzSo8747CVa9/bUrGHbB9KsbGmOXsK+vrq6trKyqnxYdJCUlJCMiHhf4pz4qAAAAAWJLR0SRDw2+mgAAAAlvRkZzAAAABQAAAAEAk/wWPAAAAAlwSFlzAAAAyAAAAMgAY/rnrQAAAAl2cEFnAAAAIAAAACAAh/qcnQAAAWFJREFUKM9t0vVbwkAYB3DuTnTUjU1CZ3diNyoGJrOwuxu7uwvj/JPdHIwN+P625/Pc7n2+72k0cgAAmmgBEMUgGMUA0sbGxWpRJAFKpyd6HRUpyGA0EZPRgCKOYNpMCDHTOPwQYNh4QSxWKnwIwNgsgtgTEjmMVNMHJCk5JTUtnWOCCCBElFUUQjIys7JzcvPy/38KcUFhUbFDEiElpWXlFeL4kKqsqq6prbOTUOobnEiYt7GpmRBXS6tC2trdWLi7o7Prl5DuHoW4ej2CYL6vf4CoMzgkiAZ62eGRUbWMjdNYbJmzTkxOqWR6RrhHJOfs3LxKFhZ5JBXgXlpeUcrqmlMqHVLs+samQra2fTBQj8+xs7sXkv0DDgbXwx8eHZ/IcnrmDfYNGfr84vLq+ub27v7h8enZJq8dQIp+eX17//D7/Z9f3z+8YreQcbpZmxSPgYKqd4WZQDCCYSuXI379AQ00jFgn0DRAAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEyLTE2VDAzOjU2OjM1KzAwOjAwG+p+UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMi0xNlQwMzo1NjozNSswMDowMGq3xuwAAAAASUVORK5CYII=),
      auto !important;
  }
}
</style>
