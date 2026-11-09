const NAV_BTN =
  'inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-[9px] text-[0.9rem] font-bold transition duration-200 hover:-translate-y-0.5';

// Ícone de pokébola, usado no botão da Pokédex.
function PokeballIcon() {
  return (
    <svg
      className="size-[1.1em]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h6" stroke="currentColor" strokeWidth="2" />
      <path d="M15 12h6" stroke="currentColor" strokeWidth="2" />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

// Ícone de pessoa, usado no botão de Treinadores.
function TrainerIcon() {
  return (
    <svg
      className="size-[1.1em]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
          <PokeballIcon />
          Pokédex
        </button>
        <button
          className={navClass('trainers')}
          onClick={() => onChangeView('trainers')}
        >
          <TrainerIcon />
          Treinadores
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
