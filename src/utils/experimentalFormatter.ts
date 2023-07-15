const replacer = (_: string, value: string) => {
  if (value === '') return undefined
  return value
}

export const experimentalFormatter = (json: object) => {
  return JSON.stringify(json, replacer, 1)
    .replace(/\n/g, '')
    .split(' ')
    .filter(v => !(v === ''))
    .map(v => v.trim())
}
