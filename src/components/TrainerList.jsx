import TrainerCard from './TrainerCard';
import '../css/TrainerList.css';

// Seção que lista todos os treinadores presentes nos dados.
function TrainerList({ trainers, pokemonById, onSelectPokemon }) {
  return (
    <section className="trainer-section">
      <div className="trainer-section__intro">
        <h2>Treinadores</h2>
        <p>
          Consulte os treinadores, suas insígnias e os Pokémon relacionados.
          Clique em um Pokémon para ver os detalhes.
        </p>
      </div>

      <div className="trainer-list">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            pokemonById={pokemonById}
            onSelectPokemon={onSelectPokemon}
          />
        ))}
      </div>
    </section>
  );
}

export default TrainerList;
