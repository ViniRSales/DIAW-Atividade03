import '../css/Header.css'

// Cabeçalho da aplicação, com título, navegação entre seções e troca de tema.
function Header({ activeView, onChangeView, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header__brand" onClick={() => onChangeView('pokedex')}>
        <img src="/pokeball.svg" alt="" className="header__logo" />
        <div>
          <h1 className="header__title">Pokédex</h1>
          <p className="header__subtitle">React + Vite</p>
        </div>
      </div>

      <nav className="header__nav">
        <button
          className={`header__nav-btn ${activeView === 'pokedex' ? 'is-active' : ''}`}
          onClick={() => onChangeView('pokedex')}
        >
          🐾 Pokédex
        </button>
        <button
          className={`header__nav-btn ${activeView === 'trainers' ? 'is-active' : ''}`}
          onClick={() => onChangeView('trainers')}
        >
          🧑‍🚀 Treinadores
        </button>
      </nav>

      <button
        className="header__theme"
        onClick={onToggleTheme}
        title="Alternar tema"
        aria-label="Alternar tema claro/escuro"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Header
