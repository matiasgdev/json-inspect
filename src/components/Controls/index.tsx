import {useMemo} from 'react'
import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg'
import {useJsonStore} from '../../stores/json-store'

export const Controls = () => {
  const {selectedIndex} = useJsonStore(s => ({
    selectedIndex: s.selectedNodeIndex,
  }))
  const nodeIndex = useMemo(() => {
    if (!selectedIndex) {
      return 'root'
    }
    return `root.`.concat(selectedIndex)
  }, [selectedIndex])
  return (
    <div className="flex items-center justify-between border-b-slate-600  border-b-[1px]  p-2 pl-4 mb-4 sticky">
      <span className="text-white/70 text-sm bg-slate-800 rounded-sm px-2">
        {nodeIndex}
      </span>
      <div className="flex items-center max-w-[180px] px-2 rounded-[.2rem] bg-slate-800">
        <input
          placeholder="Search..."
          className="h-[1.5rem] w-full px-1 text-sm text-white/70 border-none outline-none bg-transparent"
          type="text"
        />
        <SearchIcon className="h-[18px] w-[18px]" />
      </div>
    </div>
  )
}
