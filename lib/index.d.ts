interface font {
  color?: string
  size?: string
  weight?: string
  family?: string
}
interface border {
  color?: string
  style?: string
  width?: string
}
interface background {
  color?: string
  url?: string
  size?: string
  repeat?: string
}
interface Style {
  font?: font
  border?: border
  background?: background
}
interface placeholderStyle extends font {}

interface containerStyle extends Style {
  borderRadius?: string
  scrollBarColor?: string
}

interface editBoxStyle {
  background?: background
  font?: font
}
interface previewBoxStyle extends editBoxStyle {}
interface headerBoxStyle {
  background?: background
}

export interface hooks {
  beforeInsert?: (template: string) => string
  inserted?: (template: string) => void
}

export interface styles {
  containerStyle?: containerStyle
  editBoxStyle?: editBoxStyle
  previewBoxStyle?: previewBoxStyle
  placeholderStyle?: placeholderStyle
  headerBoxStyle?: headerBoxStyle
}
export interface utilItem {
  template: string
  icon: string
  hooks?: hooks
}
