// --------------------------设置缓存-------------------------
export const setStorage = (key: string, value: any): void => {
  localStorage.setItem(key, value)
}
// --------------------------获取缓存-------------------------
export const getStorage = (key: string): any => {
  return localStorage.getItem(key)
}

// --------------------------删除缓存-------------------------
export const removeStorage = (key: string): void => {
  localStorage.removeItem(key)
}

// --------------------------删除所有缓存-------------------------
export const clearAllStorage = (): void => {
  localStorage.clear()
}
