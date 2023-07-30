import SearchIcon from '../../assets/icons/search.svg'

export const Controls = () => {
  return (
    <div className="flex items-center justify-end border-b-slate-600  border-b-[1px]  p-2 mb-4 sticky">
      <div className="flex items-center max-w-[180px] px-2 rounded-[.2rem] bg-slate-800">
        <input
          placeholder="Search..."
          className="h-[1.5rem] w-full px-1 text-sm text-white/70 border-none outline-none bg-transparent"
          type="text"
        />
        <img className="h-[18px] w-[18px]" src={SearchIcon} alt="Search" />
      </div>
    </div>
  )
}
