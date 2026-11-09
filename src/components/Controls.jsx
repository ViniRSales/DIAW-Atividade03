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
];

const PILL =
  'rounded-full border px-4 py-[9px] text-[0.88rem] font-bold transition duration-150 hover:-translate-y-0.5 hover:shadow-card';

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
    <div className="flex flex-wrap items-center justify-between gap-3 max-[600px]:justify-center">
      <div className="flex items-center gap-2">
        <label className="text-[0.82rem] font-bold text-muted" htmlFor="sort">
          Ordenar por
        </label>
        <div className="relative">
          <select
            id="sort"
            className="cursor-pointer appearance-none rounded-[10px] border border-line bg-surface py-2 pr-10 pl-3 text-[0.9rem] font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent-2"
            value={sortBy}
            onChange={(e) => onSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-muted"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </div>
        <button
          className="size-[38px] rounded-[10px] border border-line bg-surface text-[1.1rem] font-extrabold transition-transform duration-150 hover:-translate-y-0.5"
          onClick={onToggleDir}
          title={sortDir === 'asc' ? 'Crescente' : 'Decrescente'}
          aria-label="Inverter ordem"
        >
          {sortDir === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2 max-[600px]:ml-0">
        <button
          className={`${PILL} ${onlyFavorites
              ? 'border-star bg-star text-[#1b1d29]'
              : 'border-line bg-surface'
            }`}
          onClick={onToggleFavorites}
        >
          ★ Favoritos ({favoritesCount})
        </button>
        <button
          className={`${PILL} border-transparent bg-linear-135 from-accent to-accent-2 text-white`}
          onClick={onRandom}
        >
          🎲 Aleatório
        </button>
      </div>
    </div>
  );
}

export default Controls;
