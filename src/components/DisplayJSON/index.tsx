import {useMemo, useState} from 'react'
import {useJsonStore} from '../../stores/json-store'
import {ObjectMetadata, getObjectMetadata} from '../../utils/getMetadataJSON'
import {FileButton} from '../FileButton'
import {useJsonNodeMap} from '../../hooks/useJsonNodeMap'

export const DisplayJSON: React.FC = () => {
  const {json, collapse} = useJsonStore(s => ({
    json: s.json,
    collapse: s.collapseIndex,
  }))
  const jsonProps = useJsonNodeMap()
  const handleExpand = (nodeIndex: number) => {
    const node = jsonProps![nodeIndex]
    if (node.typeofValue === 'object') {
      collapse(node.key, {})
    }
    if (node.typeofValue === 'array') {
      collapse(node.key, [])
    }
  }

  const jsonMetadata = useMemo(() => {
    if (!json) return null
    return getObjectMetadata(json)
  }, [json])

  const renderEditor = (object: ObjectMetadata[]) =>
    object.map(({renderKey, accessorKey, values: {key, value}}, index) => (
      <div
        key={renderKey}
        className="flex items-start gap-x-4 hover:bg-slate-600"
      >
        <div
          className="text-slate-400 cursor-pointer list-none  font-serif font-[300] tracking-[.0225rem]"
          onClick={() => handleExpand(accessorKey)}
        >
          <div className="absolute pl-1 text-[.9rem]">{index}</div>
          <div className={`ml-8 text-[14px] whitespace-pre text-white`}>
            <span className={`${key.color}`}>{key.value}</span>
            {key.separator}
            {value && (
              <>
                <span className={`${value.color}`}>{value.value}</span>
                {value.separator}
              </>
            )}
          </div>
        </div>
      </div>
    ))

  if (jsonMetadata === null) return <FileButton />

  return (
    <div className="relative w-full">
      <div>{renderEditor(jsonMetadata)}</div>
    </div>
  )
}
