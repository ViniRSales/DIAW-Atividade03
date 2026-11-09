import { getTypeColor } from '../utils/pokemonHelpers';
import '../css/TypeFilter.css';

// Filtro por tipo de Pokémon, renderizado como botões.
// Os tipos vêm do arquivo pokedex-data.json (prop `types`).
function TypeFilter({ types, selectedType, onSelectType }) {
  return (
    <div className="type-filter">
      <button
        className={`type-filter__btn ${selectedType === 'all' ? 'is-active' : ''}`}
        onClick={() => onSelectType('all')}
      >
        Todos
      </button>

      {types.map((type) => {
        const isActive = selectedType === type.name;
        return (
          <button
            key={type.id}
            className={`type-filter__btn ${isActive ? 'is-active' : ''}`}
            style={
              isActive
                ? { backgroundColor: getTypeColor(type.name), color: '#fff' }
                : {
                    borderColor: getTypeColor(type.name),
                    color: getTypeColor(type.name),
                  }
            }
            onClick={() => onSelectType(type.name)}
          >
            {type.name}
          </button>
        );
      })}
    </div>
  );
}

export default TypeFilter;
