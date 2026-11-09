// Funções auxiliares usadas em vários componentes da Pokédex.
import { EVOLUTION_EDGES } from '../data/evolutions';

// Cores associadas a cada tipo de Pokémon (usadas em badges, cards e barras).
export const TYPE_COLORS = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Grass: '#7AC74C',
  Electric: '#F7D02C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6F35FC',
  Steel: '#B7B7CE',
  Typeless: '#68A090',
};

// Retorna a cor de um tipo, com fallback para cinza.
export function getTypeColor(typeName) {
  return TYPE_COLORS[typeName] || '#777';
}

// Ícones locais dos tipos ("New Symbol"). O Vite resolve a URL final de cada
// arquivo em tempo de build. Chave: nome do arquivo (ex.: "fire.png").
const TYPE_ICON_MODULES = import.meta.glob('../assets/type-symbols/*.png', {
  eager: true,
  import: 'default',
});

// Mapa nome do tipo (como vem no JSON) -> arquivo do ícone.
const TYPE_ICON_FILES = {
  Normal: 'normal.png',
  Fighting: 'fighting.png',
  Flying: 'flying.png',
  Poison: 'poison.png',
  Ground: 'ground.png',
  Rock: 'rock.png',
  Bug: 'bug.png',
  Ghost: 'ghost.png',
  Steel: 'steel.png',
  Fire: 'fire.png',
  Water: 'water.png',
  Grass: 'grass.png',
  Electric: 'electric.png',
  Psychic: 'psychic.png',
  Ice: 'ice.png',
  Dragon: 'dragon.png',
  Dark: 'dark.png',
  Fairy: 'fairy.png',
};

// Retorna a URL do ícone ("New Symbol") de um tipo, ou null se não houver.
// Fonte dos ícones: terastal.net (coluna "New Symbol"), salvos em
// src/assets/type-symbols.
export function getTypeIcon(typeName) {
  const file = TYPE_ICON_FILES[typeName];
  if (!file) return null;
  return TYPE_ICON_MODULES[`../assets/type-symbols/${file}`] || null;
}

// Monta a URL da imagem (sprite oficial) do Pokémon a partir do ID.
// Fonte: PokéAPI sprites (official-artwork). Documentado no README.
export function getPokemonImage(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Sprite menor/pixelado, usado como fallback caso a arte oficial falhe.
export function getPokemonSprite(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

// Nome do sprite de cada treinador no Pokémon Showdown, por ID do treinador.
// Prioriza os sprites da 1ª geração (-gen1) para combinar com a Pokédex de Kanto.
const TRAINER_SPRITES = {
  1: 'ash', // Ash
  2: 'brock-gen1', // Brock
  3: 'misty-gen1', // Misty
  4: 'ltsurge', // Lt. Surge
  5: 'erika-gen1', // Erika
  6: 'koga-gen1', // Koga
  7: 'sabrina-gen1', // Sabrina
  8: 'blaine-gen1', // Blaine
  9: 'giovanni-gen1', // Giovanni
  10: 'blue-gen1', // Gary (rival, conhecido como Blue)
  11: 'teamrocket', // Team Rocket
  12: 'lance-gen1', // Lance
};

// URL da imagem de um treinador (sprites do Pokémon Showdown).
// Fonte: https://play.pokemonshowdown.com/sprites/trainers
export function getTrainerImage(trainerId) {
  const name = TRAINER_SPRITES[trainerId];
  if (!name) return null;
  return `https://play.pokemonshowdown.com/sprites/trainers/${name}.png`;
}

// Formata o ID no padrão da Pokédex: 1 -> "#001".
export function formatPokedexNumber(id) {
  return `#${String(id).padStart(3, '0')}`;
}

// Lista "amigável" dos atributos (chave do JSON -> rótulo exibido + abreviação).
export const STAT_LABELS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATK' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'SpA' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'SpD' },
  { key: 'speed', label: 'Velocidade', short: 'SPD' },
];

// Valor máximo usado para calcular a largura das barras de atributo.
export const MAX_STAT = 255;

// Soma total dos atributos base de um Pokémon.
export function getStatTotal(stats) {
  return Object.values(stats).reduce((total, value) => total + value, 0);
}

// ---- Evolução ----

// Índices construídos uma única vez a partir de EVOLUTION_EDGES.
const parentOf = {};
const childrenOf = {};
EVOLUTION_EDGES.forEach(([from, to, how]) => {
  parentOf[to] = from;
  (childrenOf[from] ||= []).push({ to, how });
});

function buildEvolutionNode(id, how = null) {
  return {
    id,
    how,
    children: (childrenOf[id] || []).map((edge) =>
      buildEvolutionNode(edge.to, edge.how),
    ),
  };
}

// Retorna a árvore evolutiva completa (a partir da forma inicial) da família
// do Pokémon informado: { id, how, children: [...] }.
export function getEvolutionTree(id) {
  let root = id;
  while (parentOf[root]) root = parentOf[root];
  return buildEvolutionNode(root);
}
