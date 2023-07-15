import {Reader} from '../../utils/formatJSON'

interface DisplayJSONProps {
  readableJSON: Reader[]
}

export const DisplayJSON: React.FC<DisplayJSONProps> = ({readableJSON}) => {
  const handleExpand: React.MouseEventHandler<HTMLDetailsElement> = event => {
    console.log(event.target)
  }

  const render = (value: Reader[]) =>
    value.map(({key, value}, index) => (
      <div className="flex items-start gap-x-4">
        <span className="w-[2rem] text-left truncate text-slate-500">
          {index}
        </span>
        <details key={key} onClick={handleExpand}>
          <summary>{key}</summary>
          <p className={`indent-4`}>
            {Array.isArray(value)
              ? value.map((v, k) => (
                  <div key={`${(v as unknown as string).toString()} ${k}`}>
                    {v.toString()}
                  </div>
                ))
              : typeof value === 'object'
              ? render(value as unknown as Reader[])
              : value}
          </p>
        </details>
      </div>
    ))

  if (!readableJSON) return

  return (
    <div className="relative w-full">
      <div>{render(readableJSON)}</div>
    </div>
  )
}
