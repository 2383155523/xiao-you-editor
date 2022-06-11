<template>
  <router-view> </router-view>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
const route = useRoute()
</script>

<style lang="scss">
@font-face {
  font-family: "oppo";
  src: url("./assets/OPPO-OS.woff2");
}
@font-face {
  font-family: "fira-code";
  src: url("./assets/FiraCode-Medium.ttf");
}
*::-webkit-scrollbar,
*::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgb(197, 161, 87);
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
// my-table
.th {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(38, 38, 42);
  color: #dfdbdb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  border-bottom: 1px solid rgb(80, 78, 78);
  box-sizing: border-box;
  z-index: 2;
}
.th-td {
  padding: 12px;
  flex: 1;
  font-weight: bold;
  text-align: center;
}
.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  overflow-y: auto;
  text-align: center;
}
.tr {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #303133;
  color: #dfdbdb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgb(80, 78, 78);
  box-sizing: border-box;
  &:hover {
    background: rgb(38, 38, 42) !important;
  }
  &:nth-child(even) {
    background: rgb(24, 24, 28);
  }
}
.tr-td {
  padding: 12px;
  flex: 1;
  text-align: center;
  line-height: 30px;
  word-break: break-all;
}
//my-tabs

.tab-item {
  width: 100%;
  display: inline-block !important;
  vertical-align: top;
}
//
:root {
  --themeColor: purple;
  --TextColor: #fff;
  // --------------------prism var----------------------------
  --prism-scheme: dark;
  --prism-foreground: #d4cfbf;
  --prism-background: #1e1e1e;
  --prism-comment: #758575;
  --prism-string: #7ec699;
  --prism-literal: #429988;
  --prism-keyword: #4d9375;
  // --prism-keyword: #cb7676;
  --prism-function: #f08d49;
  --prism-deleted: #a14f55;
  --prism-class: #54b1bf;
  --prism-builtin: #e0a569;
  --prism-property: #dd8e6e;
  --prism-namespace: #db889a;
  --prism-punctuation: #858585;
  --prism-decorator: #bd8f8f;
  --prism-number: #6394bf;
  --prism-boolean: #1c6b48;
  --prism-variable: #c2b36e;
  --prism-regex: #ab5e3f;
  --prism-json-property: #6b8b9e;
  --prism-line-number: #888888;
  --prism-line-number-gutter: #eeeeee;
  --prism-line-highlight-background: #444444;
  --prism-selection-background: #444444;
  --prism-decorator: var(--prism-class);
  --prism-operator: var(--prism-punctuation);
  --prism-number: var(--prism-literal);
  --prism-boolean: var(--prism-literal);
  --prism-variable: var(--prism-literal);
  --prism-constant: var(--prism-literal);
  --prism-symbol: var(--prism-literal);
  --prism-interpolation: var(--prism-literal);
  --prism-selector: var(--prism-keyword);
  --prism-keyword-control: var(--prism-keyword);
  --prism-regex: var(--prism-string);
  --prism-json-property: var(--prism-property);
  --prism-inline-background: var(--prism-background);

  /* Token Styles */
  --prism-comment-style: italic;
  --prism-url-decoration: underline;

  /* Extension */
  --prism-marker-color: var(--prism-foreground);
  --prism-marker-opacity: 0.4;
  --prism-marker-font-size: 0.8em;

  /* Font */
  --prism-font-size: 1em;
  --prism-line-height: 1.5em;
  --prism-font-family: monospace;
  --prism-inline-font-size: var(--prism-font-size);
  --prism-block-font-size: var(--prism-font-size);

  /* Sizing */
  --prism-tab-size: 2;

  --prism-block-padding-x: 1em;
  --prism-block-padding-y: 1em;
  --prism-block-margin-x: 0;
  --prism-block-margin-y: 0.5em;
  --prism-block-radius: 0.3em;
  --prism-inline-padding-x: 0.3em;
  --prism-inline-padding-y: 0.1em;
  --prism-inline-radius: 0.3em;
}
</style>
