<template>
  <div class="my-table">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue"
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "200px",
  },
})
const { width, height } = toRefs(props)
</script>

<style lang="scss">
.my-table {
  width: v-bind(width);
  height: v-bind(height);
  box-sizing: border-box;
  transform: scale3d(1, 1, 1);
  border-radius: 4px;
  border-bottom: 1px solid var(--tableBorderColor);
  border: 2px solid var(--borderColor);
  transition: all 0.3s var(--n-bezier);
  margin-bottom: var(--bottom);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  white-space: nowrap !important;
  .th {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: var(--tableHoverBg);
    // background-color: red;
    color: var(--TextColor);
    transition: all 0.3s var(--n-bezier);
    position: fixed;
    border-bottom: 1px solid var(--tableBorderColor);
    box-sizing: border-box;
    z-index: 2;
    .th-td {
      padding: 12px;
      flex: 1;
      font-weight: bold;
      text-align: center;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    overflow-y: auto;
    text-align: center;

    .tr {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: var(--BlockBgColor);
      color: var(--TextColor);
      transition: all 0.3s var(--n-bezier);
      border-bottom: 1px solid var(--tableBorderColor);
      box-sizing: border-box;
      .tr-td {
        padding: 12px;
        flex: 1;
        text-align: center;
        line-height: 30px;
        word-break: break-all;
      }
      &:hover {
        background: var(--tableHoverBg) !important;
      }
      &:nth-child(even) {
        background: var(--tableOddBg);
      }
    }
  }
}
// my-table

//my-tabs

.tab-item {
  width: 100%;
  display: inline-block !important;
  vertical-align: top;
}
</style>
