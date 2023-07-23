import {INDENT_SIZE, colorsTypes} from './configuration'
import {getTypeofValue} from './getTypeofValue'
import {ObjectIdentity, getValues} from './getValues'
import {isSeparator} from './isSeparator'
export interface ObjectMetadata {
  renderKey: string
  values: {
    key: {
      color: string
      value: string
      separator?: string
    }
    value?: {
      color: string
      value: string
      separator?: string
    }
  }
  typeofValue: string
}

export function getObjectMetadata(obj: object): ObjectMetadata[] {
  const stringifiedObj = JSON.stringify(obj, null, INDENT_SIZE)
  const metadata = stringifiedObj.split('\n').map((value, index) => {
    const objValues = getValues(value)
    const valueType = getTypeofValue(value)

    if (isSeparator(objValues)) {
      return {
        values: {
          key: {
            color: colorsTypes.separators,
            value: (objValues as ObjectIdentity).entity,
          },
        },
        key: `${index}.${value}`,
      }
    }

    const isArray = Array.isArray(objValues)

    return {
      values: {
        key: {
          color: isArray
            ? colorsTypes.key
            : colorsTypes[
                typeof JSON.parse(objValues.entity) as keyof typeof colorsTypes
              ],
          value: isArray ? objValues[0].entity : objValues.entity,
          separator: isArray ? objValues[0].separator : objValues.separator,
        },
        ...(isArray
          ? {
              value: {
                color:
                  colorsTypes[valueType as keyof typeof colorsTypes] ??
                  colorsTypes.separators,
                value: objValues[1].entity,
                separator: objValues[1].separator,
              },
            }
          : {}),
      },
      renderKey: `${index}.${value}`,
    }
  }) as ObjectMetadata[]

  return metadata
}
