import {DisplayJSON} from './components/DisplayJSON'

function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="min-h-[75px] min-w-screen bg-slate-800 flex items-center justify-between px-8">
        <h1 className="text-2xl text-white uppercase text-bold">
          json <span className="text-blue-300">inspector</span>
        </h1>
        <div className="flex p-4 justify-end">
          <button className="py-[.25rem] px-4 bg-green-700 rounded transition-colors cursor-pointer border-none outline-none">
            <label htmlFor="file" className="text-white cursor-pointer">
              <p className="text-[.95rem] font-semibold">Try out</p>
            </label>
          </button>
        </div>
      </header>
      <div className="flex items-center justify-center h-[calc(100vh-75px)] w-full bg-slate-200">
        <section className="flex flex-col w-[90%] h-[90%] justify-center items-center bg-slate-900">
          <div className="flex w-full h-full p-4 grow-0 overflow-y-scroll">
            <DisplayJSON />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
