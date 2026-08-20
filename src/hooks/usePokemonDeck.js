import { useState, useEffect, useCallback } from "react";

export const DECK_SIZE = 12;

const NATIONAL_DEX_MAX = 1025;

function formatPokemonName(rawName) {
  return rawName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

async function fetchPokemonDeck(size) {
	// pick unique random Pokédex numbers
	const ids = new Set();
	while (ids.size < size) {
		const randomId = Math.floor(Math.random() * NATIONAL_DEX_MAX) + 1;
		ids.add(randomId);
	}

	// fire off one GET request per id, in parallel
	const requests = [...ids].map(async (id) => {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		if (!response.ok) {
			throw new Error(
				`PokeAPI request failed for #${id} (${response.status})`,
			);
		}
		return response.json(); // parse the JSON body
	});

	const results = await Promise.all(requests);

	// shrink each big API object down to what the UI needs
	return results.map((pokemon) => ({
		id: pokemon.id,
		name: formatPokemonName(pokemon.species.name),
		image:
			pokemon.sprites?.front_default,
	}));
}

export function usePokemonDeck(size = DECK_SIZE) {
	const [deck, setDeck] = useState([]);
	const [status, setStatus] = useState("loading");
	const [error, setError] = useState("");

	const reload = useCallback(async () => {
		setStatus("loading");
		setError("");
		try {
			const freshDeck = await fetchPokemonDeck(size);
			setDeck(freshDeck);
			setStatus("ready");
		} catch (err) {
			setError(err.message || "Couldn't reach PokeAPI.");
			setStatus("error");
		}
	}, [size]);

	useEffect(() => {
		reload();
	}, [reload]);

	return { deck, status, error, reload };
}
