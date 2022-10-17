<script setup lang="ts">
import { defineProps, toRefs, onMounted, onUnmounted, shallowRef, onUpdated } from "vue"
import APlayer from "aplayer"
import "aplayer/dist/APlayer.min.css"

const aplayer = shallowRef<HTMLElement>()

const props = defineProps<{
  id?: string
  src?: string
  name?: string
  author?: string
  img?: string
  lrc?: string
}>()
const { id, src, name, author, img, lrc } = toRefs(props)
let instance = null

const init = () => {
  unMount()
  const theme = getComputedStyle(document.documentElement).getPropertyValue("--themeColor")
  if (src.value) {
    //自给模式
    instance = new APlayer({
      container: aplayer.value,
      theme: theme,
      loop: "loop",
      lrcType: 3,
      audio: [
        {
          name: name.value,
          url: src.value,
          artist: author.value,
          cover: img.value,
          lrc: lrc.value,
        },
      ],
    })
  } else {
    //网易云模式
    const url = `https://api.i-meto.com/meting/api?server=netease&type=song&id=${
      id.value
    }&r=${Math.random()}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const song = data[0]
        instance = new APlayer({
          container: aplayer.value,
          theme: theme,
          loop: "loop",
          lrcType: 3,
          audio: [
            {
              name: song.title,
              artist: song.author,
              url: song.url,
              cover: song.pic,
              lrc: song.lrc,
            },
          ],
        })
      })
  }
}
const unMount = () => {
  if (instance) {
    instance.destroy()
  }
}

onUnmounted(unMount)
onUpdated(init)
onMounted(init)
</script>

<template>
  <div class="aplayer" ref="aplayer"></div>
</template>

<style lang="scss" scoped>
.aplayer {
  margin-bottom: var(--bottom);
}
.aplayer:deep(.aplayer-title) {
  color: #333;
}
</style>
