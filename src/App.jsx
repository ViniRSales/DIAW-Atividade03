import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import PokemonList from './components/PokemonList'
import pokedexData from './data/pokedex-data.json'
import './css/App.css'

function App() {
  // Dados brutos vindos do arquivo JSON.
  const allPokemon = pokedexData.pokemon

  // Seção ativa: 'pokedex' ou 'trainers'.
  const [view, setView] = useState('pokedex')

  // Tema claro/escuro.
  const [theme, setTheme] = useState('light')

  // Favoritos (lista de IDs).
  const [favorites, setFavorites] = useState([])

  // Texto digitado no campo de pesquisa.
  const [search, setSearch] = useState('')

  // Lista derivada: aplica a pesquisa por nome ou ID sobre os dados brutos.
  const term = search.trim().toLowerCase()
  const filteredPokemon = allPokemon.filter((pokemon) => {
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
    // Será expandido para abrir o modal de detalhes.
    console.log('Pokémon selecionado:', pokemon.name)
  }

  return (
    <div className="app">
      <Header
        activeView={view}
        onChangeView={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="app__main">
        <div className="app__toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            resultCount={filteredPokemon.length}
          />
        </div>

        <PokemonList
          pokemonList={filteredPokemon}
          onSelect={handleSelectPokemon}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>

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
