const NAV_BTN =
  'rounded-full border border-transparent px-4 py-[9px] text-[0.9rem] font-bold transition duration-200 hover:-translate-y-0.5';

// Cabeçalho da aplicação, com título, navegação entre seções e troca de tema.
function Header({
  activeView,
  onChangeView,
  detailsLabel,
  theme,
  onToggleTheme,
}) {
  const navClass = (view) =>
    `${NAV_BTN} ${
      activeView === view
        ? 'bg-linear-135 from-accent to-accent-2 text-white shadow-card'
        : 'bg-surface-2 text-muted hover:text-fg'
    }`;

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface/85 px-6 py-3.5 shadow-card backdrop-blur-[10px] max-[560px]:justify-center max-[560px]:px-3.5 max-[560px]:py-3">
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => onChangeView('pokedex')}
      >
        <img src="/pokeball.svg" alt="" className="size-10 animate-spin-in" />
        <div>
          <h1 className="text-2xl leading-none font-black tracking-[0.5px]">
            Pokédex
          </h1>
          <p className="text-[0.72rem] font-semibold tracking-[1px] text-muted uppercase">
            React + Vite
          </p>
        </div>
      </div>

      <nav className="flex gap-2 max-[560px]:order-3 max-[560px]:w-full max-[560px]:justify-center">
        <button
          className={navClass('pokedex')}
          onClick={() => onChangeView('pokedex')}
        >
          🐾 Pokédex
        </button>
        <button
          className={navClass('trainers')}
          onClick={() => onChangeView('trainers')}
        >
          🧑‍🚀 Treinadores
        </button>
        {detailsLabel && (
          <button className={navClass('details')} aria-current="page">
            {detailsLabel}
          </button>
        )}
      </nav>

      <button
        className="size-[42px] rounded-full border border-line bg-surface-2 text-xl transition-transform duration-200 hover:scale-110 hover:rotate-20"
        onClick={onToggleTheme}
        title="Alternar tema"
        aria-label="Alternar tema claro/escuro"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}

export default Header;
