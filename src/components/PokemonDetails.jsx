import { useEffect, useState } from 'react';
import {
  formatPokedexNumber,
  getPokemonImage,
  getPokemonSprite,
  getStatTotal,
  getTypeColor,
  STAT_LABELS,
} from '../utils/pokemonHelpers';
import EvolutionTree from './EvolutionTree';
import StatBar from './StatBar';
import TypeBadge from './TypeBadge';

const SECTION_TITLE =
  'mb-3.5 text-[0.9rem] font-bold tracking-[0.6px] text-muted uppercase';

const PANEL =
  'rounded-3xl border border-line bg-surface p-6 shadow-card animate-pop-in';

// Página de detalhes de um Pokémon (aberta como uma aba, com botão voltar).
// Três colunas: foto | número, nome, tipos e atributos | árvore evolutiva.
function PokemonDetails({
  pokemon,
  pokemonById,
  onBack,
  onSelectPokemon,
  trainers = [],
  isFavorite,
  onToggleFavorite,
}) {
  const [imgError, setImgError] = useState(false);

  // Ao trocar de Pokémon (ex.: pela árvore evolutiva) volta ao topo e tenta
  // novamente a arte oficial.
  useEffect(() => {
    setImgError(false);
    window.scrollTo({ top: 0 });
  }, [pokemon.id]);

  // ESC também volta para a lista.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onBack();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onBack]);

  const primaryType = pokemon.types[0]?.name || 'Typeless';
  const accent = getTypeColor(primaryType);
  const total = getStatTotal(pokemon.stats);

  const imageSrc = imgError
    ? getPokemonSprite(pokemon.id)
    : getPokemonImage(pokemon.id);

  return (
    <section style={{ '--accent-type': accent }}>
      <button
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[0.9rem] font-bold transition duration-150 hover:-translate-x-0.5 hover:shadow-card"
        onClick={onBack}
      >
        <span aria-hidden="true">←</span> Voltar
      </button>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Coluna 1: foto */}
        <div
          className={`${PANEL} relative flex flex-col items-center justify-center gap-4`}
          style={{
            background: `linear-gradient(160deg, ${accent} 0%, ${accent}aa 100%)`,
            borderColor: 'transparent',
          }}
        >
          <button
            className={`absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/25 text-xl transition duration-150 hover:scale-110 hover:bg-white/40 ${isFavorite ? 'text-[#ffe066]' : 'text-white'
              }`}
            onClick={() => onToggleFavorite(pokemon.id)}
            aria-label="Favoritar"
            title={
              isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
          >
            {isFavorite ? '★' : '☆'}
          </button>

          <img
            className="aspect-square w-full max-w-[300px] animate-float object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]"
            src={imageSrc}
            alt={pokemon.name}
            onError={() => !imgError && setImgError(true)}
          />
        </div>

        {/* Coluna 2: número, nome, tipos, atributos */}
        <div className={PANEL}>
          <p className="text-[0.95rem] font-extrabold text-muted tabular-nums">
            {formatPokedexNumber(pokemon.id)}
          </p>
          <h2 className="text-[2rem] leading-tight font-black">
            {pokemon.name}
          </h2>

          <div className="mt-2.5 mb-6 flex flex-wrap gap-2">
            {pokemon.types.length > 0 ? (
              pokemon.types.map((type) => (
                <TypeBadge key={type.id} type={type.name} size="lg" />
              ))
            ) : (
              <TypeBadge type="Typeless" size="lg" />
            )}
          </div>

          <h3 className={SECTION_TITLE}>Atributos base</h3>
          <div className="flex flex-col gap-2.5">
            {STAT_LABELS.map((stat) => (
              <StatBar
                key={stat.key}
                label={stat.short}
                value={pokemon.stats[stat.key]}
                color={accent}
              />
            ))}
            <div className="mt-1.5 flex items-center justify-between border-t border-dashed border-line pt-3 text-[0.95rem]">
              <span>Total</span>
              <strong className="text-[1.2rem] text-(--accent-type)">
                {total}
              </strong>
            </div>
          </div>

          <h3 className={`${SECTION_TITLE} mt-6`}>
            Treinadores com este Pokémon
          </h3>
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
        </div>

        {/* Coluna 3: árvore evolutiva */}
        <div className={PANEL}>
          <h3 className={SECTION_TITLE}>Evoluções</h3>
          <EvolutionTree
            pokemonId={pokemon.id}
            pokemonById={pokemonById}
            onSelect={onSelectPokemon}
          />
        </div>
      </div>
    </section>
  );
}

export default PokemonDetails;
