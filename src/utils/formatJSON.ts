/* eslint-disable @typescript-eslint/no-explicit-any */

interface Reader {
  key: string
  value: Reader[] | string | number | boolean | Date
}

function formatJSON(obj: string): Reader[]
function formatJSON(obj: object): Reader[]
function formatJSON(obj: unknown): Reader[] {
  obj = typeof obj === 'string' ? JSON.parse(obj) : obj
  const readable = []
  const keys = Object.keys(obj as object)

  for (const key of keys) {
    const value = (obj as object)[key as keyof typeof obj]

    readable.push({
      key: key,
      value: typeof value === 'object' ? formatJSON(value) : value,
    })
  }

  return readable
}

export {formatJSON}
