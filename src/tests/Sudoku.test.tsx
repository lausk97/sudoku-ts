import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Sudoku from '../Sudoku';

beforeEach(() => render(<Sudoku />));

afterEach(cleanup);

describe('Sudoku - Initial Renders', () => {
    it('should render initial sudoku', () => {
        const sudokuTitle = 'Sudoku';
        const defaultDifficulty = 'Difficulty: Easy';
        const newGameBtn = 'New Game';
        const solveBtn = 'Solve';
        const eraseBtn = 'Erase';

        expect(screen.queryByText(sudokuTitle)).toBeInTheDocument();
        expect(screen.queryByText(defaultDifficulty)).toBeInTheDocument();
        expect(screen.queryByText(newGameBtn)).toBeInTheDocument();
        expect(screen.queryByText(solveBtn)).toBeInTheDocument();
        expect(screen.queryByText(eraseBtn)).toBeInTheDocument();
    });

    it('should opens and closes up the difficulty option with either the "Cancel" or "Select one"', () => {
        const newGameBtn = 'New Game';
        const selectOneBtn = 'Select One';
        const cancel = 'Cancel';

        expect(screen.queryByText(newGameBtn)).not.toBeNull();
        // opens up the difficulty option
        fireEvent.click(screen.queryByText(newGameBtn) as Element);
        expect(screen.queryByText(newGameBtn)).not.toBeInTheDocument();
        expect(screen.queryByText(selectOneBtn)).toBeInTheDocument();

        // closes up the difficulty option with the 'Cancel' button
        fireEvent.click(screen.queryByText(cancel) as Element);
        expect(screen.queryByText(newGameBtn)).toBeInTheDocument();
        expect(screen.queryByText(selectOneBtn)).not.toBeInTheDocument();

        // closes up the difficulty option with the 'Select One' button
        fireEvent.click(screen.queryByText(newGameBtn) as Element);
        fireEvent.click(screen.queryByText(selectOneBtn) as Element);
        expect(screen.queryByText(newGameBtn)).toBeInTheDocument();
        expect(screen.queryByText(selectOneBtn)).not.toBeInTheDocument();
    });
});
