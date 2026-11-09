import { MAX_STAT } from '../utils/pokemonHelpers';

// Barra de progresso que representa um atributo do Pokémon.
// `color` é a cor temática (tipo primário) do Pokémon.
function StatBar({ label, value, color }) {
  const percent = Math.min((value / MAX_STAT) * 100, 100);

  return (
    <div className="grid grid-cols-[44px_36px_1fr] items-center gap-2.5 text-[0.82rem]">
      <span className="font-semibold text-muted">{label}</span>
      <span className="text-right font-bold tabular-nums">{value}</span>
      <div className="h-[9px] overflow-hidden rounded-full bg-track">
        <div
          className="h-full rounded-full transition-[width] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default StatBar;
