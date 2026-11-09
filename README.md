# 🎮 Pokédex — React + Vite

Pokédex interativa desenvolvida com **React + Vite** para a **Atividade 03** da
disciplina de Desenvolvimento e Integração de Aplicações Web.

A aplicação permite **listar, pesquisar, filtrar e explorar** os 151 Pokémon da
primeira geração, visualizar seus atributos em detalhe e consultar os
**treinadores** e os Pokémon relacionados a cada um.

Todos os dados são carregados a partir do arquivo local
[`src/data/pokedex-data.json`](src/data/pokedex-data.json). Nenhum banco de dados
é necessário.

---

## 👥 Integrantes

- Lucas Gonçalves Sivolella
- Vinicius Ramos Sales

> Atividade desenvolvida em dupla utilizando a metodologia de **Pair Programming**.

---

## ✨ Funcionalidades

### Requisitos obrigatórios

- 🐾 **Listagem da Pokédex** com cards exibindo número, nome, tipos e todos os
  atributos (HP, Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade).
- 🔎 **Pesquisa** por **nome** ou **número/ID**, atualizada conforme o usuário digita.
- 🧬 **Filtro por tipo**, com botões coloridos gerados a partir dos tipos do JSON.
- 📄 **Detalhes do Pokémon** em um **modal**, com atributos exibidos em **barras de
  progresso**, soma total dos atributos e os treinadores que possuem o Pokémon.
- 🧑‍🚀 **Seção de Treinadores** mostrando nome, quantidade de insígnias e os
  Pokémon relacionados a cada treinador.
- ⚠️ **Tratamento de lista vazia**: mensagem amigável quando nenhum Pokémon é
  encontrado.
- 📱 **Interface responsiva** (desktop, tablet e smartphone) com identidade visual
  própria.

### Funcionalidades extras (desafios opcionais)

- ⭐ **Favoritos** — marque Pokémon como favoritos e filtre apenas por eles.
- 📊 **Ordenação** — por número, nome, qualquer atributo ou total, em ordem
  crescente ou decrescente.
- 🎲 **Pokémon aleatório** — abre um Pokémon escolhido ao acaso.
- 🌙 **Dark mode** — alternância entre tema claro e escuro.
- 💫 **Animações e efeitos de hover** nos cards, modal e botões.

---

## ⚛️ Conceitos de React aplicados

- Componentes funcionais e **componentização** (`Header`, `SearchBar`,
  `TypeFilter`, `Controls`, `PokemonList`, `PokemonCard`, `PokemonDetails`,
  `TrainerList`, `TrainerCard`, `StatBar`, `TypeBadge`).
- **Props** para comunicação entre componentes.
- **`useState`** para pesquisa, filtros, tema, favoritos e seleção.
- **`useEffect`** para aplicar o tema e tratar a tecla `ESC` no modal.
- **Renderização de listas** com `map()`.
- **Eventos** (clique, digitação, teclado).
- **Estados derivados** para filtrar e ordenar a lista a partir dos dados brutos.

---

## 🚀 Como executar

Pré-requisito: **Node.js 18+** instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar a aplicação em modo de desenvolvimento
npm run dev
```

Em seguida, abra o endereço indicado no terminal (por padrão):

```
http://localhost:5173/
```

### Outros comandos

```bash
npm run build     # gera a versão de produção na pasta dist/
npm run preview   # serve localmente a versão de produção
```

---

## 📁 Organização do projeto

```text
pokedex-react/
├── public/
│   └── pokeball.svg            # favicon / ícone usado na interface
│
├── src/
│   ├── components/             # componentes React
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TypeFilter.jsx
│   │   ├── Controls.jsx
│   │   ├── PokemonList.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonDetails.jsx
│   │   ├── TrainerList.jsx
│   │   ├── TrainerCard.jsx
│   │   ├── StatBar.jsx
│   │   └── TypeBadge.jsx
│   │
│   ├── css/                    # estilos de cada componente
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── ...
│   │
│   ├── data/
│   │   └── pokedex-data.json   # 🔑 dados da aplicação (Pokémon, tipos, treinadores)
│   │
│   ├── utils/
│   │   └── pokemonHelpers.js   # cores por tipo, imagens, atributos, formatação
│   │
│   ├── App.jsx                 # componente raiz (estado e composição das telas)
│   ├── main.jsx                # ponto de entrada do React
│   └── index.css               # estilos globais e variáveis de tema
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📊 Onde estão os dados

Os dados utilizados pela aplicação ficam em:

```
src/data/pokedex-data.json
```

O arquivo contém três coleções:

- **`types`** — lista de tipos de Pokémon (`id`, `name`).
- **`pokemon`** — lista de Pokémon com `id`, `name`, `stats`
  (`hp`, `attack`, `defense`, `specialAttack`, `specialDefense`, `speed`) e `types`.
- **`trainers`** — lista de treinadores com `id`, `name`, `badges` (insígnias) e
  `pokemonIds` (relação com os Pokémon).

---

## 🖼️ Imagens dos Pokémon

As imagens são carregadas dinamicamente a partir da **[PokéAPI](https://pokeapi.co/)**,
usando o número de cada Pokémon:

- Arte oficial:
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`
- Sprite (fallback):
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`

> A utilização da PokéAPI é apenas para complementar as imagens. A Pokédex
> continua funcionando com os dados do arquivo `pokedex-data.json`, mesmo sem
> acesso à internet (nesse caso, apenas as imagens não serão exibidas).

**Fonte das imagens:** [PokéAPI / PokeAPI sprites](https://github.com/PokeAPI/sprites)

---

## 🛠️ Tecnologias

- [React 18](https://react.dev/)
- [Vite 5](https://vite.dev/)
- CSS puro (variáveis CSS para temas claro/escuro e responsividade)
