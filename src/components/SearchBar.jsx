import '../css/SearchBar.css';

// Campo de pesquisa de Pokémon por nome ou ID.
// Atualiza a lista exibida conforme o usuário digita (controlado pelo App).
function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        🔎
      </span>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Pesquisar Pokémon por nome ou número..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar Pokémon"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
          title="Limpar"
        >
          ✕
        </button>
      )}
      <span className="search-bar__count">{resultCount} encontrados</span>
    </div>
  );
}

export default SearchBar;
