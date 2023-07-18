import type {JSON} from '../stores/json-store'

function getMetadataJSON(
  jsonStringyfied: string,
  parentKey = '',
): JSON[] | null {
  if (!jsonStringyfied) {
    return null
  }
  const parsedJSON = JSON.parse(jsonStringyfied) as object

  const metadataJSON = []
  const keys = Object.keys(parsedJSON)

  for (const key of keys) {
    const value = parsedJSON[key as keyof typeof parsedJSON]
    const deeperKey = parentKey ? `${parentKey}.${key}` : key

    metadataJSON.push({
      key: key,
      deeperKey,
      value:
        typeof value === 'object' ? getMetadataJSON(value, deeperKey) : value,
    })
  }

  return metadataJSON as JSON[]
}

export {getMetadataJSON}
