export const normalizeRenderKey = (key: string) =>
  key.trim().replace(/["']/g, '')
