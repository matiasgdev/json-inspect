import type {JSON} from '../stores/json-store'

function getMetadataJSON(jsonStringyfied: string): JSON[] | null {
  if (!jsonStringyfied) {
    return null
  }
  const parsedJSON = JSON.parse(jsonStringyfied) as object

  const metadataJSON = []
  const keys = Object.keys(parsedJSON)

  for (const key of keys) {
    const value = parsedJSON[key as keyof typeof parsedJSON]

    metadataJSON.push({
      key: key,
      value: Array.isArray(value)
        ? value
        : typeof value === 'object'
        ? getMetadataJSON(value)
        : value,
    })
  }

  return metadataJSON as JSON[]
}

export {getMetadataJSON}
