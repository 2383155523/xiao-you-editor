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
export type Utils = Array<{ template: string; light: { icon: string }; dark: { icon: string } }>
export type CacheMode = boolean
export type TransitionMode = string
export type FontFamily = string
