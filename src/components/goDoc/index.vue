<script lang="ts" setup>
import documentLight from "@/assets/document-l.svg"
import documentDark from "@/assets/document-d.svg"
import { setting } from "../index/editorConfig/setting"
</script>

<template>
  <a href="https://xiao-you-editor-docs.netlify.app" target="_blank">
    <img :src="setting.theme == 'dark' ? documentLight : documentDark" alt="" />
  </a>
</template>

<style lang="scss" scoped>
a {
  display: block;

  position: absolute;
  top: 50%;
  right: 170px;
  transform: translateY(-50%);
  user-select: none;
  img {
    width: 25px;
    height: 25px;
    transition: all 0.4s var(--n-bezier);
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAMAAAC+/9RaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAbZQTFRFAAAAAAAAAAAAAAAAFiIiEhskGCQnP0pNAAAAFyIkpamqAAAAFyQm5ufnAAAAAAAAFyQnAAAAAAAAFyMmFyMmAAAAAAAAFyMmFiMlFiAjAAAAm6Ch19nZanJ0FyQmGCMnGCQn5OXlo6ip5ufnfoWGFyQmFyQoGCQmFBQUGSElFyQkFSImERoaAAAA5ebnrLCy8/P0kJaXFiMlFyMlYmttqa6vi5GTKDQ3FBoe6+vsFyMlAAAAFSAgLzo9+Pj44+XlTVZZFiIl9fX1FiMmAAAADAwMFSEjgYiJ9vf3g4mLFyMkAAAAAAAAAAkJFSAijJKT09XWFSEkAAAABwcHFSAjtLi5v8PDFSAiDhMTKjQ36uvrq6+wFCAiAAAAEh0fbnV3lpydFBwfAAAAFSIkuby9fYSGERsfChQUJzI15ebmZGxuERoaAAAAEhseV2Bi+fn5SFFUDBgYAAAAEx4gZ25w5ufnJzI1CQkJAAAAEhwfFiAjKTQ2JzI1JTAzIi0wISwvHiotGycqGSUoFyMmFiMlAAAAAAAAAAcHAAcHAAAAAAAAAAAAAAAAAAAAAAAA/Pz8+/v7////0oTyBwAAAI90Uk5TAAECAxccd6oGYtILj/MEDqUFEKanEhGofU8I0uu8holW8tTywo2Nag0+TTwdFPPY+shnbrfTxqBN9ZAKMKj98req+58NFXrI/MuTDwwdhs7qhQcjkd7hdzar9tlpFWLE0FobkN/HSzSo8747CVa9/bUrGHbB9KsbGmOXsK+vrq6trKyqnxYdJCUlJCMiHhf4pz4qAAAAAWJLR0SRDw2+mgAAAAlvRkZzAAAABQAAAAEAk/wWPAAAAAlwSFlzAAAAyAAAAMgAY/rnrQAAAAl2cEFnAAAAIAAAACAAh/qcnQAAAWFJREFUKM9t0vVbwkAYB3DuTnTUjU1CZ3diNyoGJrOwuxu7uwvj/JPdHIwN+P625/Pc7n2+72k0cgAAmmgBEMUgGMUA0sbGxWpRJAFKpyd6HRUpyGA0EZPRgCKOYNpMCDHTOPwQYNh4QSxWKnwIwNgsgtgTEjmMVNMHJCk5JTUtnWOCCCBElFUUQjIys7JzcvPy/38KcUFhUbFDEiElpWXlFeL4kKqsqq6prbOTUOobnEiYt7GpmRBXS6tC2trdWLi7o7Prl5DuHoW4ej2CYL6vf4CoMzgkiAZ62eGRUbWMjdNYbJmzTkxOqWR6RrhHJOfs3LxKFhZ5JBXgXlpeUcrqmlMqHVLs+samQra2fTBQj8+xs7sXkv0DDgbXwx8eHZ/IcnrmDfYNGfr84vLq+ub27v7h8enZJq8dQIp+eX17//D7/Z9f3z+8YreQcbpZmxSPgYKqd4WZQDCCYSuXI379AQ00jFgn0DRAAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEyLTE2VDAzOjU2OjM1KzAwOjAwG+p+UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMi0xNlQwMzo1NjozNSswMDowMGq3xuwAAAAASUVORK5CYII=),
      auto !important;
  }
}
</style>
