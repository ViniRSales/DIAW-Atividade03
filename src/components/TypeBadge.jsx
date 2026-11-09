import { getTypeColor, getTypeIcon } from '../utils/pokemonHelpers';

// Tamanhos disponíveis para a etiqueta.
const SIZES = {
  sm: 'px-2 py-0.5 text-[0.68rem] gap-1',
  md: 'px-3 py-1 text-[0.78rem] gap-1.5',
  lg: 'px-4 py-1.5 text-[0.9rem] gap-1.5',
};

// Tamanho do ícone do tipo para cada tamanho de etiqueta.
const ICON_SIZES = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

// Etiqueta colorida que representa um tipo de Pokémon.
function TypeBadge({ type, size = 'md' }) {
  const icon = getTypeIcon(type);

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold tracking-[0.4px] text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.25)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] ${SIZES[size]}`}
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`${ICON_SIZES[size]} object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]`}
        />
      )}
      {type}
    </span>
  );
}

export default TypeBadge;
