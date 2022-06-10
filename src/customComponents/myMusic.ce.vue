<script setup lang="ts">
import { defineProps, toRefs, onMounted, onUnmounted, ref } from "vue"
import APlayer from "aplayer"
import bus from "@/eventBus"
interface props {
  id?: string
}

const aplayer = ref<null | HTMLElement>(null)
const props: props = defineProps({
  id: String,
})
const { id } = toRefs(props)
let instance = null
onUnmounted(() => {
  try {
    instance.destroy()
  } catch (error) {}
})
onMounted(() => {
  const theme = getComputedStyle(document.documentElement).getPropertyValue(
    "--themeColor",
  )
  const repeatData = bus.state.musicData.filter(item => item.id == id.value)
  if (repeatData.length) {
    const song = repeatData[0]
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
  } else {
    let url = `https://api.i-meto.com/meting/api?server=netease&type=song&id=${
      id.value
    }&r=${Math.random()}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let song = data[0]
        bus.state.musicData.push({
          id: id.value,
          title: song.title,
          url: song.url,
          pic: song.pic,
          lrc: song.lrc,
          author: song.author,
        })
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
  console.clear()
})
</script>

<template>
  <div class="aplayer" ref="aplayer"></div>
</template>

<style>
@import url("aplayer/dist/APlayer.min.css");
.aplayer {
  margin-bottom: var(--bottom);
}
.aplayer-title {
  color: #333 !important;
}
</style>
