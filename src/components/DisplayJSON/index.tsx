import {Reader} from '../../utils/formatJSON'

interface DisplayJSONProps {
  readableJSON: Reader[]
}

export const DisplayJSON: React.FC<DisplayJSONProps> = ({readableJSON}) => {
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

  return <div className="w-full">{render(readableJSON)}</div>
}
