import { useState } from 'react';
import { getPokemonSprite, getTrainerImage } from '../utils/pokemonHelpers';

// Avatar do treinador: mostra o sprite do Pokémon Showdown e, se a imagem
// falhar, recai para um ícone de pessoa.
function TrainerAvatar({ trainer }) {
  const [imgError, setImgError] = useState(false);
  const src = getTrainerImage(trainer.id);

  if (!src || imgError) {
    return (
      <div className="grid size-14 place-items-center rounded-full bg-linear-135 from-accent to-accent-2 text-white">
        <svg
          className="size-7"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="8"
            r="3.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="grid size-14 place-items-center overflow-hidden rounded-full bg-linear-135 from-accent to-accent-2">
      <img
        className="size-full object-contain [image-rendering:pixelated]"
        src={src}
        alt={trainer.name}
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

// Miniatura de um Pokémon dentro do card de treinador.
function MiniPokemon({ pokemon, onSelect }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      className="flex flex-col items-center gap-0.5 rounded-xl bg-surface-2 px-1 py-1.5 transition duration-150 hover:-translate-y-[3px] hover:scale-105 hover:bg-[color-mix(in_srgb,var(--accent-2)_15%,var(--surface-2))]"
      onClick={() => onSelect(pokemon)}
      title={pokemon.name}
    >
      <img
        className="size-12 object-contain [image-rendering:pixelated]"
        src={getPokemonSprite(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        onError={(e) => {
          if (!imgError) {
            setImgError(true);
            e.currentTarget.style.display = 'none';
          }
        }}
      />
      <span className="max-w-full truncate text-center text-[0.62rem] font-semibold text-muted">
        {pokemon.name}
      </span>
    </button>
  );
}

// Card de um treinador: nome, quantidade de insígnias e Pokémon relacionados.
function TrainerCard({ trainer, pokemonById, onSelectPokemon }) {
  // Resolve os IDs do treinador para os objetos de Pokémon (ignora repetidos).
  const uniqueIds = [...new Set(trainer.pokemonIds)];
  const pokemons = uniqueIds.map((id) => pokemonById[id]).filter(Boolean);

  return (
    <article className="rounded-[18px] border border-line bg-surface p-[18px] shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <header className="mb-4 flex items-center gap-3">
        <TrainerAvatar trainer={trainer} />
        <div>
          <h3 className="text-[1.2rem] font-extrabold">{trainer.name}</h3>
          <p className="text-[0.85rem] font-semibold text-muted">
            🏅 {trainer.badges}{' '}
            {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </p>
        </div>
        <span className="ml-auto rounded-full bg-surface-2 px-2.5 py-1 text-[0.9rem] font-extrabold text-muted">
          {pokemons.length} 🐾
        </span>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-2">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <MiniPokemon
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={onSelectPokemon}
            />
          ))
        ) : (
          <p className="text-[0.85rem] text-muted">Sem Pokémon registrados.</p>
        )}
      </div>
    </article>
  );
}

export default TrainerCard;
