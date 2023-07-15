import {useMemo} from 'react'
import {Reader} from '../../utils/formatJSON'

interface DisplayJSONProps {
  readableJSON: Reader[]
}

export const DisplayJSON: React.FC<DisplayJSONProps> = ({readableJSON}) => {
  const lines = useMemo(() => {
    return Array.from({length: readableJSON?.length}, (_, k) => k + 1)
  }, [readableJSON])

  const render = (value: Reader[]) =>
    value.map(({key, value}) => (
      <details key={key}>
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
    ))

  if (!readableJSON) return

  return (
    <div className="relative w-full">
      <div className="absolute w-[40px] left-0 top-0 h-full">
        {lines.map(lineNumber => {
          return <div key={lineNumber}>{lineNumber}</div>
        })}
      </div>
      <div className="ml-6">{render(readableJSON)}</div>
    </div>
  )
}
