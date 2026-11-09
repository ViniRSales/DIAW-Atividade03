import { useState } from 'react';
import TypeBadge from './TypeBadge';
import {
  formatPokedexNumber,
  getPokemonImage,
  getPokemonSprite,
  getTypeColor,
  STAT_LABELS,
} from '../utils/pokemonHelpers';
import '../css/PokemonCard.css';

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
      className="pokemon-card"
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
      <header className="pokemon-card__top">
        <span className="pokemon-card__number">
          {formatPokedexNumber(pokemon.id)}
        </span>
        <button
          className={`pokemon-card__fav ${isFavorite ? 'is-active' : ''}`}
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

      <div className="pokemon-card__image-wrap">
        <img
          className="pokemon-card__image"
          src={imageSrc}
          alt={pokemon.name}
          loading="lazy"
          onError={handleImgError}
        />
      </div>

      <h3 className="pokemon-card__name">{pokemon.name}</h3>

      <div className="pokemon-card__types">
        {pokemon.types.length > 0 ? (
          pokemon.types.map((type) => (
            <TypeBadge key={type.id} type={type.name} size="sm" />
          ))
        ) : (
          <TypeBadge type="Typeless" size="sm" />
        )}
      </div>

      <ul className="pokemon-card__stats">
        {STAT_LABELS.map((stat) => (
          <li key={stat.key} className="pokemon-card__stat">
            <span className="pokemon-card__stat-label">{stat.short}</span>
            <span className="pokemon-card__stat-value">
              {pokemon.stats[stat.key]}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PokemonCard;
