import { reactive } from "vue"
import type {
  Styles,
  BorderRadius,
  TransitionMode,
  FontFamily,
  Theme,
} from "../../../../lib/index.d"
export const setting = reactive<{
  styles: Styles
  borderRadius: BorderRadius
  transitionMode: TransitionMode
  fontFamily: FontFamily
  theme: Theme
}>({
  theme: "dark",
  fontFamily: "fira-code",
  transitionMode: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  borderRadius: "15px",
  styles: {
    light: {
      scrollBarColor: "#E46D71FF",
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
        content: "写点什么吧...",
        size: "16px",
        weight: "",
      },
      font: {
        color: "333",
        size: "16px",
        weight: "",
      },
    },
    dark: {
      scrollBarColor: "#DA5CE3FF",
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
        content: "写点什么吧...",
        size: "16px",
        weight: "",
      },
      font: {
        color: "#dfdbdb",
        size: "16px",
        weight: "",
      },
    },
  },
})
