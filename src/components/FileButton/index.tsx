import {ChangeEventHandler} from 'react'
import {formatJSON} from '../../utils/formatJSON'
import {useJsonStore} from '../../stores/json-store'

export const FileButton = () => {
  const setJSON = useJsonStore(s => s.setJSON)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0] as File
    if (!file) return

    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onloadend = event => {
      setJSON(formatJSON(event.target?.result as string))
    }
  }
  return (
    <button className="max-h-[40px] bg-slate-700 py-1 px-2 hover:bg-purple-400 transition-colors cursor-pointer border-none outline-none">
      <label htmlFor="file" className="text-white cursor-pointer">
        <p>Add here</p>
      </label>
      <input
        type="file"
        id="file"
        accept="application/json"
        className="hidden"
        onChange={handleChange}
      />
    </button>
  )
}
