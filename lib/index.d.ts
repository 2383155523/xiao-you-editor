import { renderBox as RenderBox } from "./renderBox"
import type { App } from "vue"
interface Font {
  color?: string
  size?: string
  weight?: string
}
interface Border {
  color?: string
  style?: string
  width?: string
}
interface Background {
  url?: string
  repeat?: string
  size?: string
  color?: string
}
interface Placeholder extends Font {
  content?: string
}

interface Light {
  border: Border
  placeholder: Placeholder
  background: Background
  font: Font
  scrollBarColor?: string
}
interface Dark {
  border: Border
  placeholder: Placeholder
  background: Background
  font: Font
  scrollBarColor?: string
}
export interface Styles {
  light: Light
  dark: Dark
}
export type Theme = "light" | "dark"
export type BorderRadius = string
export type Templates = Array<{ template: string; light: { icon: string }; dark: { icon: string } }>
export type TransitionMode = string
export type FontFamily = string
export type CustomParser = Array<(template: string) => string>
export type renderBox = typeof RenderBox
export default interface Plugin {
  install(app: App): void
}
