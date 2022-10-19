import type { Styles } from "../../../lib/index.d"
import bizhi2 from "@/assets/bizhi2.jpg"
import bizhi from "@/assets/bizhi.jpg"

export const styles: Styles = {
  light: {
    background: {
      url: `url(https://fuyouplus.gitee.io/admin-template/assets/bizhi.09117828.png)`,
      size: "cover",
      repeat: "no-repeat",
    },
    scrollBarColor: "#c792ea",
    border: {
      color: "",
      style: "none",
      width: "",
    },
    placeholder: {
      color: "#fff",
      content: "写点什么吧...",
      size: "16px",
      weight: "",
    },
    font: {
      color: "#fff",
      size: "16px",
      weight: "",
    },
  },
  dark: {
    background: {
      url: `url(${bizhi2})`,
      size: "cover",
      repeat: "no-repeat",
    },
    scrollBarColor: "#333",
    border: {
      color: "#575050",
      style: "none",
      width: "2px",
    },
    placeholder: {
      color: "#333",
      content: "写点什么吧...",
      size: "16px",
      weight: "",
    },
    font: {
      color: "#333",
      size: "16px",
      weight: "blod",
    },
  },
}
