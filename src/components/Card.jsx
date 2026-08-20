export default function Card({ pokemon, collected, onClick }) {
  return (
    <button
      className="card"
      onClick={() => onClick(pokemon.id)}
      aria-pressed={collected}
    >
      <div className="card-art">
        <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      </div>
      <div className="card-name">{pokemon.name}</div>
    </button>
  );
}
