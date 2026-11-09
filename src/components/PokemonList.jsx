import PokemonCard from './PokemonCard';

// Grade de cards de Pokémon. Trata o caso de nenhum resultado encontrado.
function PokemonList({ pokemonList, onSelect, favorites, onToggleFavorite }) {
  if (pokemonList.length === 0) {
    return (
      <div className="px-5 py-[60px] text-center text-muted">
        <img
          src="/pokeball.svg"
          alt=""
          className="mx-auto mb-3.5 size-[72px] animate-wobble opacity-40"
        />
        <h3 className="mb-1.5 text-[1.3rem] font-bold text-fg">
          Nenhum Pokémon encontrado
        </h3>
        <p>Tente ajustar a busca ou os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-[18px] p-1 max-[520px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-[520px]:gap-3">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelect={onSelect}
          isFavorite={favorites.includes(pokemon.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default PokemonList;
