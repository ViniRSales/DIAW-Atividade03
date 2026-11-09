import TrainerCard from './TrainerCard';

// Seção que lista todos os treinadores presentes nos dados.
function TrainerList({ trainers, pokemonById, onSelectPokemon }) {
  return (
    <section>
      <div className="mb-[22px]">
        <h2 className="mb-1 text-[1.8rem] font-black">Treinadores</h2>
        <p className="max-w-[560px] text-muted">
          Consulte os treinadores, suas insígnias e os Pokémon relacionados.
          Clique em um Pokémon para ver os detalhes.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px] max-[520px]:grid-cols-1">
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
