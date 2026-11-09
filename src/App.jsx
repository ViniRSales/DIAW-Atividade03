import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import TrainerList from './components/TrainerList';
import Controls from './components/Controls';
import { getStatTotal } from './utils/pokemonHelpers';
import pokedexData from './data/pokedex-data.json';

function App() {
  // Dados brutos vindos do arquivo JSON.
  const allPokemon = pokedexData.pokemon;
  const allTrainers = pokedexData.trainers;

  // Índice id -> Pokémon, usado para resolver os Pokémon dos treinadores.
  const pokemonById = {};
  allPokemon.forEach((pokemon) => {
    pokemonById[pokemon.id] = pokemon;
  });

  // Tipos disponíveis para o filtro: apenas os que realmente aparecem nos
  // Pokémon, ordenados alfabeticamente (ignora "Typeless").
  const usedTypeNames = new Set();
  allPokemon.forEach((pokemon) =>
    pokemon.types.forEach((type) => usedTypeNames.add(type.name)),
  );
  const availableTypes = pokedexData.types
    .filter((type) => usedTypeNames.has(type.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Seção ativa: 'pokedex' ou 'trainers'.
  const [view, setView] = useState('pokedex');

  // Tema claro/escuro.
  const [theme, setTheme] = useState('light');

  // Favoritos (lista de IDs).
  const [favorites, setFavorites] = useState([]);

  // Texto digitado no campo de pesquisa.
  const [search, setSearch] = useState('');

  // Tipo selecionado no filtro ('all' = todos).
  const [selectedType, setSelectedType] = useState('all');

  // Pokémon selecionado para exibição no modal de detalhes (null = fechado).
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Ordenação: critério, direção e flag "apenas favoritos".
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Lista derivada: aplica pesquisa (nome/ID), filtro por tipo e favoritos.
  const term = search.trim().toLowerCase();
  const filteredPokemon = allPokemon.filter((pokemon) => {
    // Filtro "apenas favoritos"
    if (onlyFavorites && !favorites.includes(pokemon.id)) return false;

    // Filtro por tipo
    const matchesType =
      selectedType === 'all' ||
      pokemon.types.some((type) => type.name === selectedType);
    if (!matchesType) return false;

    // Pesquisa por nome ou ID
    if (!term) return true;
    const matchesName = pokemon.name.toLowerCase().includes(term);
    const matchesId =
      String(pokemon.id) === term ||
      String(pokemon.id).padStart(3, '0') === term.replace('#', '');
    return matchesName || matchesId;
  });

  // Ordena a lista filtrada conforme critério e direção escolhidos.
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    let comparison;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'id') {
      comparison = a.id - b.id;
    } else if (sortBy === 'total') {
      comparison = getStatTotal(a.stats) - getStatTotal(b.stats);
    } else {
      comparison = a.stats[sortBy] - b.stats[sortBy];
    }
    return sortDir === 'asc' ? comparison : -comparison;
  });

  // Abre um Pokémon aleatório (respeitando os filtros atuais, se houver).
  function handleRandom() {
    const pool = sortedPokemon.length > 0 ? sortedPokemon : allPokemon;
    const randomPokemon = pool[Math.floor(Math.random() * pool.length)];
    setSelectedPokemon(randomPokemon);
  }

  // Aplica o tema ao elemento raiz do documento.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  function handleSelectPokemon(pokemon) {
    setSelectedPokemon(pokemon);
  }

  // Treinadores que possuem o Pokémon atualmente selecionado.
  const trainersOfSelected = selectedPokemon
    ? allTrainers.filter((trainer) =>
        trainer.pokemonIds.includes(selectedPokemon.id),
      )
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        activeView={view}
        onChangeView={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 pt-6 pb-12">
        {view === 'pokedex' ? (
          <>
            <div className="mb-6 flex flex-col gap-3.5">
              <SearchBar
                value={search}
                onChange={setSearch}
                resultCount={filteredPokemon.length}
              />
              <TypeFilter
                types={availableTypes}
                selectedType={selectedType}
                onSelectType={setSelectedType}
              />
              <Controls
                sortBy={sortBy}
                onSortBy={setSortBy}
                sortDir={sortDir}
                onToggleDir={() =>
                  setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
                onlyFavorites={onlyFavorites}
                onToggleFavorites={() => setOnlyFavorites((prev) => !prev)}
                favoritesCount={favorites.length}
                onRandom={handleRandom}
              />
            </div>

            <PokemonList
              pokemonList={sortedPokemon}
              onSelect={handleSelectPokemon}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </>
        ) : (
          <TrainerList
            trainers={allTrainers}
            pokemonById={pokemonById}
            onSelectPokemon={handleSelectPokemon}
          />
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          trainers={trainersOfSelected}
          onClose={() => setSelectedPokemon(null)}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <footer className="border-t border-line p-5 text-center text-[0.82rem] text-muted">
        <p>
          Dados:{' '}
          <code className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[0.78rem]">
            src/data/pokedex-data.json
          </code>{' '}
          · Imagens:{' '}
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
            PokéAPI
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
