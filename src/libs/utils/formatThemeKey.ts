export function formatThemeKey(themeKey: string) {
  return themeKey.replace(/([A-Z])/g, " $1").replace(/-/g, " ");
}
