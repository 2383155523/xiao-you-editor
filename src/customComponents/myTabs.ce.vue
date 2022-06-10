<template>
  <div class="my-tabs" ref="myTabs">
    <div class="tab-navs">
      <div
        class="tab-navs-item"
        v-for="(item, index) in tabList"
        :key="index"
        @click="changeTab(index)"
      >
        <span> {{ item }}</span>
      </div>
      <div class="active-box" ref="activeBox"></div>
    </div>
    <div class="content-box">
      <div class="swiper-content" ref="swiperContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, toRefs, nextTick } from "vue"
import type { PropType } from "vue"
const props = defineProps({
  tabs: {
    type: String as PropType<string>,
    defalut: "JavaScript|TypeScript",
  },
})
const { tabs } = toRefs(props)
const tabList = ref<Array<string>>(tabs.value.split("|"))
const activeBox = ref<null | HTMLElement>(null)
const swiperContent = ref<null | HTMLElement>(null)
const myTabs = ref<null | HTMLElement>(null)
const tabNavItems = ref<null | Array<HTMLElement>>(null)
const tabNavItemWidth = ref<number>(0)
const myTabsWidth = ref<number>(0)

const changeTab = (index: number) => {
  ;(activeBox.value as HTMLElement).style.transform = `translateX(${
    index * tabNavItemWidth.value
  }px)`
  ;(tabNavItems.value as Array<HTMLElement>).forEach(
    (item: HTMLElement, i: number) => {
      if (i !== index) {
        item.classList.remove("tab-navs-item-active")
      }
    },
  )
  ;(tabNavItems.value as Array<HTMLElement>)[index].classList.add(
    "tab-navs-item-active",
  )
  ;(swiperContent.value as HTMLElement).style.left = `-${
    index * myTabsWidth.value
  }px`
}

const init = () => {
  myTabsWidth.value =
    parseFloat(
      window
        .getComputedStyle(myTabs.value as HTMLElement, null)
        .getPropertyValue("width"),
    ) - 10
  tabNavItemWidth.value = myTabsWidth.value / tabList.value.length
  tabNavItems.value = Array.from(myTabs.value.children[0].children).filter(
    (el: HTMLElement, index: number) =>
      index < myTabs.value.children[0].children.length - 1,
  ) as Array<HTMLElement>
  Array.from(myTabs.value.children[0].children).forEach((el: HTMLElement) => {
    el.style.width = `${tabNavItemWidth.value}px`
  })
  ;(tabNavItems.value as Array<HTMLElement>)[0].classList.add(
    "tab-navs-item-active",
  )
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style lang="scss" scoped>
.my-tabs {
  width: 100%;
  margin-bottom: var(--bottom);
  padding: 5px;
  background: var(--tabsBgColor);
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s var(--n-bezier);
  border: 1px solid var(--tableBorderColor);
  .tab-navs {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    .tab-navs-item {
      height: 40px;
      line-height: 40px;
      color: var(--tabsItemColor);
      text-align: center;
      cursor: pointer;
      transition: all 0.3s var(--n-bezier);
      border-radius: 4px;
      span {
        position: relative;
        z-index: 2;
      }
    }
    .tab-navs-item-active {
      color: var(--themeColor) !important;
    }
    .active-box {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--tabItemActive);
      z-index: 0;
      border-radius: 3px;
      transition: all 0.3s var(--n-bezier);
    }
  }
  .content-box {
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;
    background: var(--tabItemActive);
    overflow: hidden;
    overflow-y: auto;
    transition: all 0.3s var(--n-bezier);
    .swiper-content {
      border-radius: 4px;
      white-space: nowrap;
      width: 100%;
      transition: all 0.3s var(--n-bezier);
      position: relative;
      left: 0;
      top: 0;
    }
  }
}
*::-webkit-scrollbar,
*::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: var(--themeColor);
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
*::-webkit-scrollbar-corner {
  background: transparent;
}
*::-webkit-scrollbar {
  width: 7px;
  height: 6px;
}
</style>
