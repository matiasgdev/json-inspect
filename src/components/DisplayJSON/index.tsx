import {useCallback, useMemo} from 'react'
import {useJsonStore} from '../../stores/json-store'
import {ObjectMetadata, getObjectMetadata} from '../../utils/get-metadata-json'
import {FileButton} from '../FileButton'
import {JsonProperties, useJsonNodeMap} from '../../hooks/useJsonNodeMap'
import {JsonValue} from './components/JsonValue'
import {ReactComponent as ArrowRight} from '../../assets/icons/nav-arrow-right.svg'
import {cn} from '../../utils/cn'
import {Controls} from '../Controls'

export const DisplayJSON: React.FC = () => {
  const {json, collapse, collapsedKeys, selectNodeIndex, selectedIndex} =
    useJsonStore(s => ({
      json: s.json,
      collapse: s.collapseIndex,
      collapsedKeys: s.collapsedKeys,
      selectNodeIndex: s.setSelectedNodeIndex,
      selectedIndex: s.selectedNodeIndex,
    }))
  const jsonProps = useJsonNodeMap()

  const handleSelect = (node: JsonProperties) => {
    selectNodeIndex(node.key)
  }

  const toggleExpand = useCallback(
    (node: JsonProperties) => {
      if (node.typeofValue === 'object') {
        collapse(node.key, {})
      }
      if (node.typeofValue === 'array') {
        collapse(node.key, [])
      }
    },
    [collapse],
  )

  const jsonMetadata = useMemo(() => {
    if (!json) return null
    return getObjectMetadata(json)
  }, [json])

  const renderEditor = (object: ObjectMetadata[]) =>
    object.map(({renderKey, accessorKey, values: {key, value}}, index) => {
      const node = jsonProps![accessorKey]
      const isCollapsed = collapsedKeys.has(node?.key)
      const isSelected = node?.key === selectedIndex
      const isObjectOrArray =
        node?.typeofValue === 'array' || node?.typeofValue === 'object'

      return (
        <div
          key={renderKey}
          onClick={() => {
            if (node) {
              handleSelect(node)
            }
          }}
          className={cn('flex items-start gap-x-4 group', {
            'bg-slate-600': isSelected,
          })}
        >
          <div className="text-slate-400 list-none  font-serif font-[300] tracking-[.0225rem]">
            <div className="absolute flex items-center pl-1 mr-1 text-[.9rem]">
              {index}
              {isObjectOrArray ? (
                <ArrowRight
                  onClick={() => {
                    toggleExpand(node)
                  }}
                  className={cn(
                    'h-[11.5px] w-[11.5px] cursor-pointer hidden group-hover:block',
                    {
                      'rotate-90': isCollapsed,
                    },
                  )}
                />
              ) : null}
            </div>
            <div className="ml-8 text-[14px] whitespace-pre text-white">
              <span className={`${key.color}`}>{key.value}</span>
              {key.separator}
              <JsonValue {...{value, node, toggleExpand, isCollapsed}} />
            </div>
          </div>
        </div>
      )
    })

  if (jsonMetadata === null) return <FileButton />

  return (
    <div className="flex flex-col w-full h-full grow-0">
      <Controls />
      <div className="p-2 overflow-y-scroll">
        <div className="relative w-full">{renderEditor(jsonMetadata)}</div>
      </div>
    </div>
  )
}
