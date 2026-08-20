# Pokédex Memory

A memory-matching card game built for [The Odin Project's Memory Card assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card)
Click a Pokémon card once per round, if you click the same one twice and the round resets!

## How to run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  main.jsx                  entry point, mounts <App />
  App.jsx                   game state & rules (score, best score, click handling)
  App.css                   all styling
  hooks/
    usePokemonDeck.js        <- fetches data from PokeAPI
  components/
    Board.jsx                renders the grid of cards
    Card.jsx                 a single card (renders the fetched image)
    Scoreboard.jsx            current score / best score display
    PokeballSpinner.jsx       loading indicator
```

## Game rules recap

- Clicking a card you haven't seen this round adds it to your score and
  reshuffles the board
- You lose when you click a card you've already seen this round and your score
  resets to 0 (but "Best" is preserved)
- Clearing every card in the deck without a repeat is a perfect round
- Best score persists for the browser session
