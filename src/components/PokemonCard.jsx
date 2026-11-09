import { useState } from 'react';
import TypeBadge from './TypeBadge';
import {
  formatPokedexNumber,
  getPokemonImage,
  getPokemonSprite,
  getTypeColor,
  STAT_LABELS,
} from '../utils/pokemonHelpers';

// Card de um Pokémon na listagem da Pokédex.
// Mostra número, imagem, nome, tipos e os atributos resumidos.
function PokemonCard({ pokemon, onSelect, isFavorite, onToggleFavorite }) {
  const [imgError, setImgError] = useState(false);

  const primaryType = pokemon.types[0]?.name || 'Typeless';
  const accent = getTypeColor(primaryType);

  // Cor de fundo suave baseada no tipo primário.
  const cardStyle = {
    background: `linear-gradient(160deg, ${accent}22 0%, var(--surface) 60%)`,
    borderColor: `${accent}55`,
  };

  function handleImgError() {
    // Se a arte oficial falhar, tenta o sprite pixelado.
    if (!imgError) setImgError(true);
  }

  const imageSrc = imgError
    ? getPokemonSprite(pokemon.id)
    : getPokemonImage(pokemon.id);

  return (
    <article
      className="group relative flex cursor-pointer flex-col items-center rounded-[20px] border border-line bg-surface px-4 pt-4 pb-[18px] shadow-card outline-none transition duration-200 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:-translate-y-1.5 focus-visible:shadow-card-hover"
      style={cardStyle}
      onClick={() => onSelect(pokemon)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(pokemon);
        }
      }}
    >
      <header className="flex w-full items-center justify-between">
        <span className="text-[0.85rem] font-extrabold text-muted tabular-nums">
          {formatPokedexNumber(pokemon.id)}
        </span>
        <button
          className={`text-xl leading-none transition duration-150 hover:scale-120 ${
            isFavorite ? 'text-star' : 'text-muted'
          }`}
          title={
            isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
          aria-label="Favoritar"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </header>

      <div className="flex size-[120px] items-center justify-center">
        <img
          className="size-full object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.25)] transition-transform duration-250 group-hover:scale-[1.08]"
          src={imageSrc}
          alt={pokemon.name}
          loading="lazy"
          onError={handleImgError}
        />
      </div>

      <h3 className="mt-1.5 text-[1.1rem] font-extrabold">{pokemon.name}</h3>

      <div className="mt-2 mb-3 flex flex-wrap justify-center gap-1.5">
        {pokemon.types.length > 0 ? (
          pokemon.types.map((type) => (
            <TypeBadge key={type.id} type={type.name} size="sm" />
          ))
        ) : (
          <TypeBadge type="Typeless" size="sm" />
        )}
      </div>

      <ul className="grid w-full grid-cols-3 gap-1.5">
        {STAT_LABELS.map((stat) => (
          <li
            key={stat.key}
            className="flex flex-col items-center rounded-[10px] bg-surface-2 px-0.5 py-1.5"
          >
            <span className="text-[0.62rem] font-bold tracking-[0.3px] text-muted">
              {stat.short}
            </span>
            <span className="text-[0.95rem] font-extrabold tabular-nums">
              {pokemon.stats[stat.key]}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PokemonCard;
