import {useJsonStore, JSON} from '../../stores/json-store'
import {FileButton} from '../FileButton'

export const DisplayJSON: React.FC = () => {
  const readableJSON = useJsonStore(s => s.json)
  const handleExpand: React.MouseEventHandler<HTMLDetailsElement> = event => {
    console.log(event.target)
  }

  const render = (value: JSON[]) =>
    value.map(({key, value}, index) => (
      <div className="flex items-start gap-x-4">
        <span className="w-[2rem] text-left truncate text-slate-500 shrink-0 text-sm">
          {index}
        </span>
        <details
          className="text-slate-400 cursor-pointer"
          key={key}
          onClick={handleExpand}
          open
        >
          <summary className="text-sm">{`"${key}"`}</summary>
          <p className={`ml-8 text-sm`}>
            {Array.isArray(value)
              ? value.map((v, k) => (
                  <div key={`${(v as unknown as string).toString()} ${k}`}>
                    {v.toString()}
                  </div>
                ))
              : typeof value === 'object'
              ? render(value as unknown as JSON[])
              : `"${value as string}"`}
          </p>
        </details>
      </div>
    ))

  if (!readableJSON) return <FileButton />

  return (
    <div className="relative w-full">
      <div>{render(readableJSON)}</div>
    </div>
  )
}
