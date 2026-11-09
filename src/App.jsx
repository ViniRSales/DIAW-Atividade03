import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import pokedexData from './data/pokedex-data.json'
import './css/App.css'

function App() {
  // Dados brutos vindos do arquivo JSON.
  const allPokemon = pokedexData.pokemon
  const allTrainers = pokedexData.trainers

  // Índice id -> Pokémon, usado para resolver os Pokémon dos treinadores.
  const pokemonById = {}
  allPokemon.forEach((pokemon) => {
    pokemonById[pokemon.id] = pokemon
  })

  // Tipos disponíveis para o filtro: apenas os que realmente aparecem nos
  // Pokémon, ordenados alfabeticamente (ignora "Typeless").
  const usedTypeNames = new Set()
  allPokemon.forEach((pokemon) =>
    pokemon.types.forEach((type) => usedTypeNames.add(type.name))
  )
  const availableTypes = pokedexData.types
    .filter((type) => usedTypeNames.has(type.name))
    .sort((a, b) => a.name.localeCompare(b.name))

  // Seção ativa: 'pokedex' ou 'trainers'.
  const [view, setView] = useState('pokedex')

  // Tema claro/escuro.
  const [theme, setTheme] = useState('light')

  // Favoritos (lista de IDs).
  const [favorites, setFavorites] = useState([])

  // Texto digitado no campo de pesquisa.
  const [search, setSearch] = useState('')

  // Tipo selecionado no filtro ('all' = todos).
  const [selectedType, setSelectedType] = useState('all')

  // Pokémon selecionado para exibição no modal de detalhes (null = fechado).
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // Lista derivada: aplica pesquisa (nome/ID) e filtro por tipo.
  const term = search.trim().toLowerCase()
  const filteredPokemon = allPokemon.filter((pokemon) => {
    // Filtro por tipo
    const matchesType =
      selectedType === 'all' ||
      pokemon.types.some((type) => type.name === selectedType)
    if (!matchesType) return false

    // Pesquisa por nome ou ID
    if (!term) return true
    const matchesName = pokemon.name.toLowerCase().includes(term)
    const matchesId =
      String(pokemon.id) === term ||
      String(pokemon.id).padStart(3, '0') === term.replace('#', '')
    return matchesName || matchesId
  })

  // Aplica o tema ao elemento raiz do documento.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  function handleSelectPokemon(pokemon) {
    setSelectedPokemon(pokemon)
  }

  // Treinadores que possuem o Pokémon atualmente selecionado.
  const trainersOfSelected = selectedPokemon
    ? allTrainers.filter((trainer) =>
        trainer.pokemonIds.includes(selectedPokemon.id)
      )
    : []

  return (
    <div className="app">
      <Header
        activeView={view}
        onChangeView={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="app__main">
        {view === 'pokedex' ? (
          <>
            <div className="app__toolbar">
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
            </div>

            <PokemonList
              pokemonList={filteredPokemon}
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

      <footer className="app__footer">
        <p>
          Dados: <code>src/data/pokedex-data.json</code> · Imagens:{' '}
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
            PokéAPI
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
