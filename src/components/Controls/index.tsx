import {useMemo} from 'react'
import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg'
import {useJsonStore} from '../../stores/json-store'
import {ReactComponent as ArrowRight} from '../../assets/icons/nav-arrow-right.svg'
import {cn} from '../../utils/cn'

export const Controls = () => {
  const {selectedIndex} = useJsonStore(s => ({
    selectedIndex: s.selectedNodeIndex,
  }))
  const nodePaths = useMemo(() => {
    const paths = ['root']
    selectedIndex.split('.').forEach(index => {
      paths.push(index)
    })
    return paths
  }, [selectedIndex])

  return (
    <div className="flex items-center justify-between border-b-slate-600  border-b-[1px]  p-2 pl-4 mb-4 sticky">
      <div className="flex items-center text-white/70 text-sm ">
        {nodePaths.map((path, index) => {
          const isLast = index + 1 === nodePaths.length
          return (
            <div className="flex items-center justify-start gap-x-[4px] mr-[4px]">
              <div
                className={cn(
                  'cursor-pointer hover:text-white',
                  isLast && 'bg-slate-800 rounded-sm px-2',
                )}
              >
                {path}
              </div>
              {isLast ? null : (
                <ArrowRight className="h-[11.5px] w-[11.5px] block" />
              )}
            </div>
          )
        })}
      </div>
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
