import type { Styles } from "../../../lib/index.d"
import bizhi2 from "@/assets/bizhi2.jpg"
import bizhi from "@/assets/bizhi.jpg"

export const styles: Styles = {
  light: {
    background: {
      url: `url(${bizhi})`,
      size: "cover",
      repeat: "no-repeat",
    },
    // scrollBarColor: "blue",
    // border: {
    //   color: "#dddddd",
    //   style: "solid",
    //   width: "2px",
    // },
    // placeholder: {
    //   color: "#333",
    //   content: "light 写点什么吧...",
    //   size: "16px",
    //   weight: "",
    // },
    // font: {
    //   color: "#333",
    //   size: "16px",
    //   weight: "",
    // },
  },
  dark: {
    background: {
      url: `url(${bizhi2})`,
      size: "cover",
      repeat: "no-repeat",
    },
    // scrollBarColor: "#333",
    border: {
      color: "#575050",
      style: "none",
      width: "2px",
    },
    placeholder: {
      color: "#333",
      content: "dark 写点什么吧...",
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
