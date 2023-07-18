import {ChangeEventHandler} from 'react'
import {getMetadataJSON} from '../../utils/formatJSON'
import {useJsonStore} from '../../stores/json-store'

export const FileButton = () => {
  const setJSON = useJsonStore(s => s.setJSON)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0] as File
    if (!file) return

    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onloadend = event => {
      setJSON(getMetadataJSON(event.target?.result as string)!)
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button className="px-8 py-8 opacity-[70%] hover:opacity-[1] transition-colors cursor-pointer border-2 border-slate-200 border-dashed outline-none rounded bg-slate-800">
        <label htmlFor="file" className="text-white cursor-pointer">
          <span className="block text-[2rem] mb-2"> {`{ }`}</span>
          <p className="text-[.85rem]">Press to add a JSON, or drop it here</p>
        </label>
        <input
          type="file"
          id="file"
          accept="application/json"
          className="hidden"
          onChange={handleChange}
        />
      </button>
    </div>
  )
}
