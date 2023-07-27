import {INDENT_SIZE, colorsTypes} from './configuration'
import {createNodeAccessorIndex} from './getAccessorKey'
import {getTypeofValue} from './getTypeofValue'
import {ObjectIdentity, getValues} from './getValues'
import {isSeparator} from './isSeparator'
import {normalizeRenderKey} from './normalizeRenderKey'

export interface ObjectMetadata {
  renderKey: string
  accessorKey: number
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
}

export function getObjectMetadata(obj: object): ObjectMetadata[] {
  const stringifiedObj = JSON.stringify(obj, null, INDENT_SIZE).split('\n')
  const keyMap = createNodeAccessorIndex(stringifiedObj)

  const metadata = stringifiedObj.map((value, index) => {
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
        renderKey: `${index}.${(objValues as ObjectIdentity).entity.trim()}`,
      }
    }

    const isArray = Array.isArray(objValues)
    const targetObj = isArray ? objValues[0] : objValues
    const renderKey = normalizeRenderKey(targetObj.entity)
    const accessorKey = keyMap.nodeMapIndex[0]
    keyMap.nodeMapIndex = keyMap.nodeMapIndex.slice(1)

    return {
      values: {
        key: {
          color: isArray
            ? colorsTypes.key
            : colorsTypes[
                typeof JSON.parse(objValues.entity) as keyof typeof colorsTypes
              ],
          value: targetObj.entity,
          separator: targetObj.separator,
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
      renderKey: `${index}.${renderKey}`,
      accessorKey: accessorKey,
    }
  }) as ObjectMetadata[]

  return metadata
}
