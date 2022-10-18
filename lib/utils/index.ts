export const toStr = (data: any): string => {
  return Object.prototype.toString.call(data).slice(8, -1)
}

export const isEmpty = (value: any): boolean => {
  if (value === null) return true
  if (value === undefined) return true
  if (value.length === 0) return true
  if (Object.keys(value).length === 0) return true
  if (typeof value === "string" && value.trim() === "") return true
  if (value === 0) return true
  if (toStr(value) === "Boolean") return true
  return false
}
