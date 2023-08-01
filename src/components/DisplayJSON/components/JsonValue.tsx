import {JsonProperties} from '../../../hooks/useJsonNodeMap'
import {JsonIdentity} from '../../../utils/getMetadataJSON'
import {cn} from '../../../utils/cn'

interface JsonValueProps {
  value?: JsonIdentity
  node: JsonProperties
  toggleExpand: (node: JsonProperties) => void
  isCollapsed: boolean
}

export const JsonValue: React.FC<JsonValueProps> = ({
  value,
  toggleExpand,
  node,
  isCollapsed,
}) => {
  const {value: objValue, separator} = {...value}
  const isObjectCollapsed = isCollapsed && node.typeofValue === 'object'
  const isArrayCollapsed = isCollapsed && node.typeofValue === 'array'

  return value ? (
    <>
      <span
        className={cn(value.color, {
          'text-white/70 hover:text-white cursor-pointer': isCollapsed,
        })}
        onClick={() => {
          if (isCollapsed) toggleExpand(node)
        }}
      >
        {isObjectCollapsed ? ' {..}' : isArrayCollapsed ? ' [..]' : objValue}
      </span>
      {separator}
    </>
  ) : null
}
