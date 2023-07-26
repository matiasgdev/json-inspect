export type TypeOf =
  | 'string'
  | 'number'
  | 'array'
  | 'object'
  | 'null'
  | 'boolean'

const types: Record<string, TypeOf> = {
  '[object String]': 'string',
  '[object Number]': 'number',
  '[object Array]': 'array',
  '[object Object]': 'object',
  '[object Null]': 'null',
  '[object Boolean]': 'boolean',
}

export const type = (value: unknown): TypeOf =>
  types[Object.prototype.toString.call(value)]
