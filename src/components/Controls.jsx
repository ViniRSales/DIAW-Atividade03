import '../css/Controls.css'

// Opções de ordenação disponíveis para a lista de Pokémon.
export const SORT_OPTIONS = [
  { value: 'id', label: 'Número' },
  { value: 'name', label: 'Nome' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'specialAttack', label: 'Ataque Especial' },
  { value: 'specialDefense', label: 'Defesa Especial' },
  { value: 'speed', label: 'Velocidade' },
  { value: 'total', label: 'Total' },
]

// Barra de controles: ordenação, direção, favoritos e Pokémon aleatório.
function Controls({
  sortBy,
  onSortBy,
  sortDir,
  onToggleDir,
  onlyFavorites,
  onToggleFavorites,
  favoritesCount,
  onRandom,
}) {
  return (
    <div className="controls">
      <div className="controls__group">
        <label className="controls__label" htmlFor="sort">
          Ordenar por
        </label>
        <select
          id="sort"
          className="controls__select"
          value={sortBy}
          onChange={(e) => onSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          className="controls__dir"
          onClick={onToggleDir}
          title={sortDir === 'asc' ? 'Crescente' : 'Decrescente'}
          aria-label="Inverter ordem"
        >
          {sortDir === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="controls__group controls__group--right">
        <button
          className={`controls__toggle ${onlyFavorites ? 'is-active' : ''}`}
          onClick={onToggleFavorites}
        >
          ★ Favoritos ({favoritesCount})
        </button>
        <button className="controls__random" onClick={onRandom}>
          🎲 Aleatório
        </button>
      </div>
    </div>
  )
}

export default Controls
