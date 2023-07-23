import {INDENT_SIZE, colorsTypes} from './configuration'
import {getTypeofValue} from './getTypeofValue'
import {getValues} from './getValues'
import {isSeparator} from './isSeparator'
export interface ObjectMetadata {
  key: string
  values: {
    key: {
      color: string
      value: string
    }
    value?: {
      color: string
      value: string
    }
  }
  typeofValue: string
}

export function getObjectMetadata(obj: object): ObjectMetadata[] {
  const stringifiedObj = JSON.stringify(obj, null, INDENT_SIZE)
  const metadata = stringifiedObj.split('\n').map((value, index) => {
    const identity = getValues(value)
    const valueType = getTypeofValue(value)

    if (isSeparator(identity)) {
      return {
        values: {
          key: {
            color: colorsTypes.separators,
            value: identity,
          },
        },
        key: `${index}.${value}`,
      }
    }

    return {
      values: {
        key: {
          color: colorsTypes.key,
          value: Array.isArray(identity) ? identity[0] : identity,
        },
        ...(Array.isArray(identity)
          ? {
              value: {
                color:
                  colorsTypes[valueType as keyof typeof colorsTypes] ??
                  colorsTypes.separators,
                value: identity[1],
              },
            }
          : {}),
      },
      key: `${index}.${value}`,
    }
  }) as ObjectMetadata[]

  return metadata
}
