import {useEffect, type ChangeEventHandler, type DragEventHandler} from 'react'
import {useJsonStore} from '../../stores/json-store'

const dropAndDragEvents = ['dragenter', 'dragover', 'dragleave', 'drop']

export const FileButton = () => {
  const setJson = useJsonStore(s => s.setJson)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onloadend = event => {
      setJson(JSON.parse(event.target?.result as string))
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0] as File
    if (!file) return
    handleFile(file)
  }

  const handleOnDrop: DragEventHandler<HTMLDivElement> = event => {
    const file = event.dataTransfer.files[0]
    if (!file) return
    handleFile(file)
  }

  useEffect(() => {
    const preventDefaults = (event: Event) => {
      event.preventDefault()
    }
    for (const event of dropAndDragEvents) {
      window.addEventListener(event, preventDefaults, false)
    }
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        role="button"
        onDrop={handleOnDrop}
        className="w-[500px] h-[250px] px-8 py-8 flex items-center justify-center opacity-[70%] hover:opacity-[1] transition-colors cursor-pointer border-2 border-slate-200 border-dashed outline-none rounded bg-slate-800"
      >
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
      </div>
    </div>
  )
}
