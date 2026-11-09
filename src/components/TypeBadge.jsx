import { getTypeColor } from '../utils/pokemonHelpers';

// Tamanhos disponíveis para a etiqueta.
const SIZES = {
  sm: 'px-2 py-0.5 text-[0.68rem]',
  md: 'px-3 py-1 text-[0.78rem]',
  lg: 'px-4 py-1.5 text-[0.9rem]',
};

// Etiqueta colorida que representa um tipo de Pokémon.
function TypeBadge({ type, size = 'md' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold tracking-[0.4px] text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.25)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] ${SIZES[size]}`}
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  );
}

export default TypeBadge;
