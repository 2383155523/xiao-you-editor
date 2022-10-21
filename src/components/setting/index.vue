<script lang="ts" setup>
import { ref, watch, toRef } from "vue"
import settingLight from "@/assets/setting-light.svg"
import settingDark from "@/assets/setting-dark.svg"
import sun from "@/assets/sun.svg"
import moon from "@/assets/moon.svg"
import bus from "@/eventBus/index"
import {
  NDrawer,
  NDrawerContent,
  NDivider,
  NColorPicker,
  NSwitch,
  NSelect,
  NButton,
  useMessage,
  useDialog,
  NInput,
} from "naive-ui"
import { setting } from "../index/editorConfig/setting"
const settingIsShow = ref<boolean>(false)
bus.on("theme", (v: "light" | "dark") => {
  setting.theme = v
})
const theme = toRef(setting, "theme")

watch(theme, (v: "light" | "dark") => {
  const html = document.querySelector("html") as HTMLHtmlElement
  if (v == "dark") {
    html.className = "dark"
  } else {
    html.className = "light"
  }
})
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
          <n-input v-model:value="setting.fontFamily" type="text" placeholder="Define FontFamily" />
        </div>
        <n-divider title-placement="center">TransitionMode</n-divider>
        <div class="content">
          <n-input
            v-model:value="setting.transitionMode"
            type="text"
            placeholder="Define TransitionMode"
          />
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
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
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
