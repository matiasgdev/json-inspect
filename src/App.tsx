import {ChangeEventHandler, useState} from 'react'

function App() {
  const [json, setJSON] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0] as File
    if (!file) return

    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onloadend = event => {
      setJSON(JSON.stringify(event.target?.result, null, 4))
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="min-h-[75px] min-w-screen bg-purple-700 flex items-center px-4">
        <h1 className="text-2xl text-white uppercase text-bold">
          json <span className="text-yellow-200">inspector</span>
        </h1>
      </header>
      <section className="h-[calc(100vh-75px)] w-full flex justify-center items-center">
        <div className="flex w-full h-full p-4">
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
        <div className="flex w-full h-full p-4 border border-red-500 border-solid grow-0">
          {json}
        </div>
      </section>
    </main>
  )
}

export default App
