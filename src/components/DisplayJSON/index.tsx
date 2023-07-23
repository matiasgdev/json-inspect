import {useJsonStore} from '../../stores/json-store'
import {ObjectMetadata, getObjectMetadata} from '../../utils/getMetadataJSON'
import {FileButton} from '../FileButton'

export const DisplayJSON: React.FC = () => {
  const planeJSON = useJsonStore(s => s.planeJSON)
  const handleExpand: React.MouseEventHandler<HTMLDivElement> = event => {
    console.log(event.target)
  }

  const render = (value: ObjectMetadata[]) =>
    value.map(({renderKey, values: {key, value}}) => (
      <div
        key={renderKey}
        className="flex items-start gap-x-4 hover:bg-slate-600"
      >
        <div
          className="text-slate-400 cursor-pointer list-none"
          onClick={handleExpand}
        >
          <div className={`ml-8 text-sm whitespace-pre text-white`}>
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

  if (!planeJSON) return <FileButton />

  return (
    <div className="relative w-full">
      <div>{render(getObjectMetadata(planeJSON))}</div>
    </div>
  )
}
