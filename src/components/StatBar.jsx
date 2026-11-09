import { MAX_STAT } from '../utils/pokemonHelpers';

// Cor da barra conforme o valor do atributo (vermelho -> verde).
function getBarColor(value) {
  if (value < 50) return '#f03e3e';
  if (value < 70) return '#f76707';
  if (value < 90) return '#f59f00';
  if (value < 110) return '#74b816';
  return '#2f9e44';
}

// Barra de progresso que representa um atributo do Pokémon.
function StatBar({ label, value }) {
  const percent = Math.min((value / MAX_STAT) * 100, 100);

  return (
    <div className="grid grid-cols-[44px_36px_1fr] items-center gap-2.5 text-[0.82rem]">
      <span className="font-semibold text-muted">{label}</span>
      <span className="text-right font-bold tabular-nums">{value}</span>
      <div className="h-[9px] overflow-hidden rounded-full bg-track">
        <div
          className="h-full rounded-full transition-[width] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${percent}%`, backgroundColor: getBarColor(value) }}
        />
      </div>
    </div>
  );
}

export default StatBar;
