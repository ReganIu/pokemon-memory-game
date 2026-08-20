import Card from "./Card.jsx";

export default function Board({ order, deck, collected, onCardClick }) {
	return (
		<div className="grid">
			{order.map((id) => {
				const pokemon = deck.find((p) => p.id === id);
				if (!pokemon) return null;
				return (
					<Card
						key={pokemon.id}
						pokemon={pokemon}
						collected={collected.has(pokemon.id)}
						onClick={onCardClick}
					/>
				);
			})}
		</div>
	);
}
