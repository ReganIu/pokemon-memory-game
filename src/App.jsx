import { useState, useEffect } from "react";
import { usePokemonDeck } from "./hooks/usePokemonDeck.js";
import Scoreboard from "./components/Scoreboard.jsx";
import Board from "./components/Board.jsx";
import PokeballSpinner from "./components/PokeballSpinner.jsx";
import "./App.css";

// Fisher-Yates shuffle
function shuffle(array) {
	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

export default function App() {
	const { deck, status, error, reload } = usePokemonDeck();

	const [order, setOrder] = useState([]); // ids in their current on-screen positions
	const [collected, setCollected] = useState(new Set()); // ids clicked this round
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (deck.length > 0) {
			setOrder(shuffle(deck.map((p) => p.id)));
			setCollected(new Set());
			setScore(0);
			setMessage("");
		}
	}, [deck]);

	function handleCardClick(id) {
		if (status !== "ready") return;

		if (collected.has(id)) {
			// clicked a Pokémon already seen this round -> round over
			setBestScore((prev) => Math.max(prev, score));
			setMessage(`Womp womp! You remembered ${score} Pokémon in a row.`);
			setCollected(new Set());
			setScore(0);
		} else {
			const next = new Set(collected);
			next.add(id);
			setCollected(next);
			setScore(next.size);

			if (next.size === deck.length) {
				// cleared the whole deck without a repeat click
				setBestScore((prev) => Math.max(prev, next.size));
				setMessage("You win!");
				setCollected(new Set());
				setScore(0);
			} else {
				setMessage("");
			}
		}

		// reshuffle the board after every single click
		setOrder((prev) => shuffle(prev));
	}

	return (
		<div className="dex">
			<header className="dex-header">
				<div className="dex-title-row">
					<div className="lens" />
					<div className="dex-title">Pokédex Memory Game</div>
				</div>
				<Scoreboard score={score} bestScore={bestScore} />
			</header>

			<div className="dex-screen">
				<div className="message-row">{message}</div>

				{status === "loading" && (
					<div className="loading-wrap">
						<PokeballSpinner />
						<div className="loading-text">Fetching Pokémon…</div>
					</div>
				)}

				{status === "error" && (
					<div className="error-wrap">
						<div className="error-text">{error}</div>
						<button className="refresh-btn" onClick={reload}>
							Retry
						</button>
					</div>
				)}

				{status === "ready" && (
					<>
						<Board
							order={order}
							deck={deck}
							collected={collected}
							onCardClick={handleCardClick}
						/>
						<div className="footer-row">
							<button className="refresh-btn" onClick={reload}>
								New Pokédex
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
