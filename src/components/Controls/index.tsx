import {useCallback, useMemo} from 'react'
import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg'
import {useJsonStore} from '../../stores/json-store'
import {ReactComponent as ArrowRight} from '../../assets/icons/nav-arrow-right.svg'
import {cn} from '../../utils/cn'

const DEFAULT_PATH = 'root'

export const Controls = () => {
  const {selectedNodeIndex, setSelectedNodeIndex} = useJsonStore(s => ({
    selectedNodeIndex: s.selectedNodeIndex,
    setSelectedNodeIndex: s.setSelectedNodeIndex,
  }))
  const nodePaths = useMemo(() => {
    const paths = [DEFAULT_PATH]
    selectedNodeIndex.split('.').forEach(index => {
      if (index === DEFAULT_PATH) return
      paths.push(index)
    })
    return paths
  }, [selectedNodeIndex])

  const handleSelectPath = useCallback(
    (path: string) => {
      setSelectedNodeIndex(path.replace('root.', ''))
    },
    [setSelectedNodeIndex],
  )

  return (
    <div className="flex items-center justify-between border-b-slate-600  border-b-[1px]  p-2 pl-4 mb-4 sticky">
      <div className="flex items-center text-white/70 text-sm ">
        {nodePaths.map((path, index, paths) => {
          const isLast = index + 1 === nodePaths.length
          const calculatedPath = paths
            .slice(0, paths.indexOf(path) + 1)
            .join('.')
          return (
            <div
              onClick={() => {
                handleSelectPath(calculatedPath)
              }}
              className="flex items-center justify-start gap-x-[4px] mr-[4px]"
            >
              <div
                className={cn(
                  'cursor-pointer hover:text-white px-2',
                  isLast && 'bg-slate-800 rounded-sm ',
                )}
              >
                {path}
              </div>
              {isLast || paths.length === 1 ? null : (
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
