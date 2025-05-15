import { useState } from 'react';
import './App.css';

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const { winner, winningLine } = calculateWinner(board);

	const handleClick = (i) => {
		if (winner || board[i]) return;
		const newBoard = [...board];
		newBoard[i] = xIsNext ? 'X' : 'O';
		setBoard(newBoard);
		setXIsNext(!xIsNext);
	};

	const renderSquare = (i) => (
		<button
			className={`square ${
				winningLine && winningLine.includes(i) ? 'winning-square' : ''
			}`}
			onClick={() => handleClick(i)}
		>
			{board[i]}
		</button>
	);

	let status;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`;
	}

	const handleReset = () => {
		setBoard(Array(9).fill(null));
		setXIsNext(true);
	};

	return (
		<div
			className={`game-container ${
				window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark-mode'
					: ''
			}`}
		>
			<h1 className='game-title'>Tic Tac Toe</h1>
			<div className='game'>
				<div className='game-board'>
					<div className='board-row'>
						{renderSquare(0)}
						{renderSquare(1)}
						{renderSquare(2)}
					</div>
					<div className='board-row'>
						{renderSquare(3)}
						{renderSquare(4)}
						{renderSquare(5)}
					</div>
					<div className='board-row'>
						{renderSquare(6)}
						{renderSquare(7)}
						{renderSquare(8)}
					</div>
				</div>
				<div className='game-info'>
					<div className='status'>{status}</div>
					<button className='reset-button' onClick={handleReset}>
						Reset Game
					</button>
				</div>
			</div>
		</div>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { winner: squares[a], winningLine: [a, b, c] };
		}
	}
	return { winner: null, winningLine: null };
}

export default App;
