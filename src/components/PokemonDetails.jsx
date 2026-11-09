import { useEffect, useState } from 'react';
import TypeBadge from './TypeBadge';
import StatBar from './StatBar';
import {
  formatPokedexNumber,
  getPokemonImage,
  getPokemonSprite,
  getStatTotal,
  getTypeColor,
  STAT_LABELS,
} from '../utils/pokemonHelpers';
import '../css/PokemonDetails.css';

// Modal com informações detalhadas de um Pokémon.
// Exibe imagem, número, nome, tipos, atributos em barras, total e os
// treinadores relacionados.
function PokemonDetails({
  pokemon,
  onClose,
  trainers = [],
  isFavorite,
  onToggleFavorite,
}) {
  const [imgError, setImgError] = useState(false);

  // Fecha o modal ao pressionar ESC.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    // Impede o scroll da página por trás do modal.
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!pokemon) return null;

  const primaryType = pokemon.types[0]?.name || 'Typeless';
  const accent = getTypeColor(primaryType);
  const total = getStatTotal(pokemon.stats);

  const imageSrc = imgError
    ? getPokemonSprite(pokemon.id)
    : getPokemonImage(pokemon.id);

  return (
    <div className="details-overlay" onClick={onClose}>
      <div
        className="details"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent-type': accent }}
      >
        <div
          className="details__hero"
          style={{
            background: `linear-gradient(160deg, ${accent} 0%, ${accent}aa 100%)`,
          }}
        >
          <button
            className="details__close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>

          <button
            className={`details__fav ${isFavorite ? 'is-active' : ''}`}
            onClick={() => onToggleFavorite(pokemon.id)}
            aria-label="Favoritar"
            title={
              isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
          >
            {isFavorite ? '★' : '☆'}
          </button>

          <span className="details__number">
            {formatPokedexNumber(pokemon.id)}
          </span>

          <img
            className="details__image"
            src={imageSrc}
            alt={pokemon.name}
            onError={() => !imgError && setImgError(true)}
          />
          <h2 className="details__name">{pokemon.name}</h2>

          <div className="details__types">
            {pokemon.types.length > 0 ? (
              pokemon.types.map((type) => (
                <TypeBadge key={type.id} type={type.name} size="lg" />
              ))
            ) : (
              <TypeBadge type="Typeless" size="lg" />
            )}
          </div>
        </div>

        <div className="details__body">
          <section className="details__section">
            <h3 className="details__section-title">Atributos base</h3>
            <div className="details__stats">
              {STAT_LABELS.map((stat) => (
                <StatBar
                  key={stat.key}
                  label={stat.short}
                  value={pokemon.stats[stat.key]}
                />
              ))}
              <div className="details__total">
                <span>Total</span>
                <strong>{total}</strong>
              </div>
            </div>
          </section>

          <section className="details__section">
            <h3 className="details__section-title">
              Treinadores com este Pokémon
            </h3>
            {trainers.length > 0 ? (
              <ul className="details__trainers">
                {trainers.map((trainer) => (
                  <li key={trainer.id} className="details__trainer">
                    🧑‍🚀 {trainer.name}
                    <span className="details__trainer-badges">
                      {trainer.badges} 🏅
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="details__empty">
                Nenhum treinador possui este Pokémon nos dados.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
