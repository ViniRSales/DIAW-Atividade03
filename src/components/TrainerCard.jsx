import { useState } from 'react'
import { getPokemonSprite } from '../utils/pokemonHelpers'
import '../css/TrainerCard.css'

// Miniatura de um Pokémon dentro do card de treinador.
function MiniPokemon({ pokemon, onSelect }) {
  const [imgError, setImgError] = useState(false)

  return (
    <button
      className="trainer-card__pokemon"
      onClick={() => onSelect(pokemon)}
      title={pokemon.name}
    >
      <img
        src={getPokemonSprite(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        onError={(e) => {
          if (!imgError) {
            setImgError(true)
            e.currentTarget.style.display = 'none'
          }
        }}
      />
      <span>{pokemon.name}</span>
    </button>
  )
}

// Card de um treinador: nome, quantidade de insígnias e Pokémon relacionados.
function TrainerCard({ trainer, pokemonById, onSelectPokemon }) {
  // Resolve os IDs do treinador para os objetos de Pokémon (ignora repetidos).
  const uniqueIds = [...new Set(trainer.pokemonIds)]
  const pokemons = uniqueIds
    .map((id) => pokemonById[id])
    .filter(Boolean)

  return (
    <article className="trainer-card">
      <header className="trainer-card__header">
        <div className="trainer-card__avatar">🧑‍🚀</div>
        <div>
          <h3 className="trainer-card__name">{trainer.name}</h3>
          <p className="trainer-card__badges">
            🏅 {trainer.badges}{' '}
            {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </p>
        </div>
        <span className="trainer-card__count">{pokemons.length} 🐾</span>
      </header>

      <div className="trainer-card__pokemons">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <MiniPokemon
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={onSelectPokemon}
            />
          ))
        ) : (
          <p className="trainer-card__empty">Sem Pokémon registrados.</p>
        )}
      </div>
    </article>
  )
}

export default TrainerCard
