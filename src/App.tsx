import {ChangeEventHandler, useMemo, useState} from 'react'
import {formatJSON} from './utils/formatJSON'
import {DisplayJSON} from './components/DisplayJSON'

function App() {
  const [json, setJSON] = useState('')

  const formattedJSON = useMemo(() => {
    return formatJSON(json)
  }, [json])

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0] as File
    if (!file) return

    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onloadend = event => {
      setJSON(event.target?.result as string)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="min-h-[75px] min-w-screen bg-purple-700 flex items-center px-4">
        <h1 className="text-2xl text-white uppercase text-bold">
          json <span className="text-yellow-200">inspector</span>
        </h1>
      </header>
      <div className="flex items-center justify-center h-[calc(100vh-75px)] w-full bg-purple-900">
        <section className="flex flex-col w-[90%] h-[90%] justify-center items-center bg-slate-900">
          <div className="flex w-full p-4">
            <button className="max-h-[40px] bg-purple-300 py-1 px-2 hover:bg-purple-400 transition-colors cursor-pointer border-none outline-none">
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
          </div>
          <div className="flex w-full h-full p-4 grow-0 overflow-y-scroll">
            <DisplayJSON readableJSON={formattedJSON} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
