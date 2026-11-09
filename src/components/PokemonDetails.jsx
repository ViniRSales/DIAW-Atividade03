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

// Botões circulares sobre a área colorida (fechar / favoritar).
const HERO_BTN =
  'absolute top-3.5 grid size-9 place-items-center rounded-full bg-white/25 text-base text-white transition duration-150 hover:scale-110 hover:bg-white/40';

const SECTION_TITLE =
  'mb-3.5 text-[0.9rem] font-bold tracking-[0.6px] text-muted uppercase';

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
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-[rgba(10,12,20,0.6)] p-5 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[460px] animate-pop-in overflow-y-auto rounded-3xl bg-surface shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent-type': accent }}
      >
        <div
          className="relative flex flex-col items-center rounded-t-3xl px-5 pt-[18px] pb-6 text-white"
          style={{
            background: `linear-gradient(160deg, ${accent} 0%, ${accent}aa 100%)`,
          }}
        >
          <button
            className={`${HERO_BTN} right-3.5`}
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>

          <button
            className={`${HERO_BTN} left-3.5 text-xl ${isFavorite ? 'text-[#ffe066]' : ''}`}
            onClick={() => onToggleFavorite(pokemon.id)}
            aria-label="Favoritar"
            title={
              isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
          >
            {isFavorite ? '★' : '☆'}
          </button>

          <span className="mt-1.5 text-[0.95rem] font-extrabold opacity-85">
            {formatPokedexNumber(pokemon.id)}
          </span>

          <img
            className="size-[190px] animate-float object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]"
            src={imageSrc}
            alt={pokemon.name}
            onError={() => !imgError && setImgError(true)}
          />
          <h2 className="text-[1.8rem] font-black [text-shadow:0_2px_4px_rgba(0,0,0,0.25)]">
            {pokemon.name}
          </h2>

          <div className="mt-2.5 flex gap-2">
            {pokemon.types.length > 0 ? (
              pokemon.types.map((type) => (
                <TypeBadge key={type.id} type={type.name} size="lg" />
              ))
            ) : (
              <TypeBadge type="Typeless" size="lg" />
            )}
          </div>
        </div>

        <div className="px-6 pt-[22px] pb-7">
          <section>
            <h3 className={SECTION_TITLE}>Atributos base</h3>
            <div className="flex flex-col gap-2.5">
              {STAT_LABELS.map((stat) => (
                <StatBar
                  key={stat.key}
                  label={stat.short}
                  value={pokemon.stats[stat.key]}
                />
              ))}
              <div className="mt-1.5 flex items-center justify-between border-t border-dashed border-line pt-3 text-[0.95rem]">
                <span>Total</span>
                <strong className="text-[1.2rem] text-(--accent-type)">
                  {total}
                </strong>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h3 className={SECTION_TITLE}>Treinadores com este Pokémon</h3>
            {trainers.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {trainers.map((trainer) => (
                  <li
                    key={trainer.id}
                    className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 text-[0.9rem] font-semibold"
                  >
                    🧑‍🚀 {trainer.name}
                    <span className="text-[0.78rem] text-muted">
                      {trainer.badges} 🏅
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[0.9rem] text-muted">
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
