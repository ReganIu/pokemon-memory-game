function Dial({ label, value, tone }) {
	return (
		<div className={`dial dial-${tone}`}>
			<div className="dial-value">{value}</div>
			<div className="dial-label">{label}</div>
		</div>
	);
}

export default function Scoreboard({ score, bestScore }) {
	return (
		<div className="dials">
			<Dial label="Score" value={score} tone="current" />
			<Dial label="Best" value={bestScore} tone="best" />
		</div>
	);
}
