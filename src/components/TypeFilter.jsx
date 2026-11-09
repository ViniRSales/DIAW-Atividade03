import { getTypeColor } from '../utils/pokemonHelpers';

const BTN =
  'rounded-full border-2 px-3.5 py-[7px] text-[0.82rem] font-bold transition duration-150 hover:-translate-y-0.5 hover:shadow-card';

// Filtro por tipo de Pokémon, renderizado como botões.
// Os tipos vêm do arquivo pokedex-data.json (prop `types`).
function TypeFilter({ types, selectedType, onSelectType }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`${BTN} ${
          selectedType === 'all'
            ? 'border-transparent bg-linear-135 from-accent to-accent-2 text-white shadow-card'
            : 'border-line bg-surface text-muted'
        }`}
        onClick={() => onSelectType('all')}
      >
        Todos
      </button>

      {types.map((type) => {
        const isActive = selectedType === type.name;
        return (
          <button
            key={type.id}
            className={`${BTN} ${isActive ? 'border-transparent shadow-card' : 'bg-surface'}`}
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
