import {JsonProperties} from '../../../hooks/useJsonNodeMap'
import {JsonIdentity} from '../../../utils/getMetadataJSON'

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
        className={`${
          isCollapsed ? 'text-white/70' : value.color
        } hover:text-white`}
      >
        {isObjectCollapsed ? ' {..}' : isArrayCollapsed ? ' [..]' : objValue}
      </span>
      {separator}
    </>
  ) : null
}
