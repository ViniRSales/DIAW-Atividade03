import { getTypeColor } from '../utils/pokemonHelpers'
import '../css/TypeBadge.css'

// Etiqueta colorida que representa um tipo de Pokémon.
function TypeBadge({ type, size = 'md' }) {
  return (
    <span
      className={`type-badge type-badge--${size}`}
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  )
}

export default TypeBadge
