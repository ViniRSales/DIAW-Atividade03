// Campo de pesquisa de Pokémon por nome ou ID.
// Atualiza a lista exibida conforme o usuário digita (controlado pelo App).
function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[14px] border border-line bg-surface px-4 py-2.5 shadow-card transition duration-200 focus-within:border-accent-2 focus-within:ring-3 focus-within:ring-accent-2/25">
      <span className="text-[1.05rem]" aria-hidden="true">
        🔎
      </span>
      <input
        className="min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-muted"
        type="text"
        placeholder="Pesquisar Pokémon por nome ou número..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar Pokémon"
      />
      {value && (
        <button
          className="grid size-6 place-items-center rounded-full text-[0.95rem] text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
          title="Limpar"
        >
          ✕
        </button>
      )}
      <span className="text-[0.8rem] font-bold whitespace-nowrap text-muted max-[480px]:hidden">
        {resultCount} encontrados
      </span>
    </div>
  );
}

export default SearchBar;
