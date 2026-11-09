import PokemonCard from './PokemonCard';
import '../css/PokemonList.css';

// Grade de cards de Pokémon. Trata o caso de nenhum resultado encontrado.
function PokemonList({ pokemonList, onSelect, favorites, onToggleFavorite }) {
  if (pokemonList.length === 0) {
    return (
      <div className="pokemon-list__empty">
        <img src="/pokeball.svg" alt="" className="pokemon-list__empty-icon" />
        <h3>Nenhum Pokémon encontrado</h3>
        <p>Tente ajustar a busca ou os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
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
