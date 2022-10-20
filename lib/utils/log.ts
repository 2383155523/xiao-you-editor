import pkg from "../../package.json"
/**
 * Xiao You Log
 */
const XiaoYouLog = () => {
  console.info(
    "\n" +
      " %c xiao-you-editor v" +
      pkg.version +
      ` %c  https://2383155523.github.io/xiao-you-editor-docs/ ` +
      "\n",
    "color: #E5E7EB; background: #6739b6; padding:5px 0;",
    "background: #333; padding:5px 0;"
  )
}

export default function setupLog() {
  XiaoYouLog()
}
