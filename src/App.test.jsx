import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
	it('renders game board', () => {
		render(<App />);
		const squareButtons = screen.getAllByRole('button');
		expect(squareButtons.length).toBe(10); // 9 squares + 1 reset button
	});

	it('displays next player status', () => {
		render(<App />);
		const statusElement = screen.getByText(/Next player: X/i);
		expect(statusElement).toBeInTheDocument();
	});

	it('displays winner status when X wins', () => {
		render(<App />);
		const squareButtons = screen.getAllByRole('button');
		fireEvent.click(squareButtons[0]); // X
		fireEvent.click(squareButtons[1]); // O
		fireEvent.click(squareButtons[3]); // X
		fireEvent.click(squareButtons[4]); // O
		fireEvent.click(squareButtons[6]); // X
		const statusElement = screen.getByText(/Winner: X/i);
		expect(statusElement).toBeInTheDocument();
	});

	it('displays winner status when O wins', () => {
		render(<App />);
		const squareButtons = screen.getAllByRole('button');
		fireEvent.click(squareButtons[1]); // X
		fireEvent.click(squareButtons[0]); // O
		fireEvent.click(squareButtons[4]); // X
		fireEvent.click(squareButtons[3]); // O
		fireEvent.click(squareButtons[5]); // X
		fireEvent.click(squareButtons[6]); // O
		const statusElement = screen.getByText(/Winner: O/i);
		expect(statusElement).toBeInTheDocument();
	});

	it('applies winning-square class to winning squares', () => {
		const { container } = render(<App />);
		const squareButtons = screen.getAllByRole('button');
		fireEvent.click(squareButtons[0]); // X
		fireEvent.click(squareButtons[1]); // O
		fireEvent.click(squareButtons[3]); // X
		fireEvent.click(squareButtons[4]); // O
		fireEvent.click(squareButtons[6]); // X
		const winningSquares = container.querySelectorAll('.winning-square');
		expect(winningSquares.length).toBe(3);
	});
});
