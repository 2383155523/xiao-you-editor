<template>
  <NConfigProvider :locale="zhCN" :theme="ProjectSetting.theme == 'light' ? lightTheme : darkTheme">
    <NNotificationProvider>
      <div class="root">
        <header>
          <div class="name">Xiao You Editor Playground</div>
          <setting />
          <changeTheme />
          <goDoc />
          <img src="@/assets/logo.png" alt="" class="logo" />
        </header>
        <main>
          <router-view></router-view>
        </main>
      </div>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import changeTheme from "@/components/changeTheme/index.vue"
import setting from "@/components/setting/index.vue"
import goDoc from "@/components/goDoc/index.vue"
import { NConfigProvider, darkTheme, lightTheme, zhCN, NNotificationProvider } from "naive-ui"
import { setting as ProjectSetting } from "./components/index/editorConfig/setting"
</script>

<style lang="scss">
@import "@/styles/reset";

body {
  background-color: var(--BodyColor);
  transition: all 0.4s var(--n-bezier);
  font-family: "HarmonyOS_Sans_SC_Medium";
  font-size: 16px;
  overflow: hidden;
}

.root {
  padding-top: 8vh;
  box-sizing: border-box;
  .logo {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
  header {
    width: 100%;
    height: 8vh;
    line-height: 8vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    transition: all 0.4s var(--n-bezier);
    background: var(--color-background);
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    user-select: none;
    color: var(--TextColor);
  }
  main {
    width: 100%;
  }
}
</style>
