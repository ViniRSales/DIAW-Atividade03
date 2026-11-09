import {
  formatPokedexNumber,
  getEvolutionTree,
  getPokemonSprite,
  getTypeColor,
} from '../utils/pokemonHelpers';

// Um nó da árvore: botão-link que abre o Pokémon correspondente.
function EvolutionNode({ node, currentId, pokemonById, onSelect }) {
  const pokemon = pokemonById[node.id];
  if (!pokemon) return null;

  const isCurrent = node.id === currentId;
  const color = getTypeColor(pokemon.types[0]?.name || 'Typeless');

  return (
    <div>
      {node.how && (
        <p className="my-1.5 ml-[26px] flex items-center gap-1.5 text-[0.75rem] font-semibold text-muted">
          <span aria-hidden="true">↓</span>
          {node.how}
        </p>
      )}

      <button
        className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-surface-2 p-2 text-left transition duration-150 ${
          isCurrent
            ? 'cursor-default'
            : 'border-line hover:-translate-y-0.5 hover:shadow-card'
        }`}
        style={isCurrent ? { borderColor: color } : undefined}
        onClick={() => !isCurrent && onSelect(pokemon)}
        aria-current={isCurrent ? 'page' : undefined}
        title={isCurrent ? 'Pokémon atual' : `Ver ${pokemon.name}`}
      >
        <img
          className="size-14 shrink-0 object-contain"
          src={getPokemonSprite(pokemon.id)}
          alt=""
          loading="lazy"
        />
        <span className="min-w-0">
          <span className="block text-[0.75rem] font-bold text-muted tabular-nums">
            {formatPokedexNumber(pokemon.id)}
          </span>
          <span className="block truncate font-extrabold">{pokemon.name}</span>
        </span>
      </button>

      {node.children.length > 0 && (
        <div className="mt-0.5 ml-5 border-l-2 border-line pl-3">
          {node.children.map((child) => (
            <EvolutionNode
              key={child.id}
              node={child}
              currentId={currentId}
              pokemonById={pokemonById}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Árvore evolutiva da família do Pokémon, com link para cada forma.
function EvolutionTree({ pokemonId, pokemonById, onSelect }) {
  const tree = getEvolutionTree(pokemonId);

  if (tree.children.length === 0) {
    return (
      <p className="text-[0.9rem] text-muted">
        Este Pokémon não possui evoluções.
      </p>
    );
  }

  return (
    <EvolutionNode
      node={tree}
      currentId={pokemonId}
      pokemonById={pokemonById}
      onSelect={onSelect}
    />
  );
}

export default EvolutionTree;
