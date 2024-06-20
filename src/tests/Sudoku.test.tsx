import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Sudoku from '../Sudoku';

describe('Sudoku - Initial Renders', () => {
    it('should render initial sudoku', () => {
        render(<Sudoku />);
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

        cleanup();
    });

    it('should opens and closes up the difficulty option with either the "Cancel" or "Select one"', () => {
        render(<Sudoku />);

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

        cleanup();
    });
});

describe('Sudoku - Resume', () => {
    it('should display/hide pause container', () => {
        const { container } = render(<Sudoku />);

        const pause = 'Pause';
        const resumeInPauseContainer = 'Resume';

        // initially assuming the local storage board is there
        expect(screen.queryByText(pause)).toBeInTheDocument();
        expect(screen.queryByText(resumeInPauseContainer)).toBeInTheDocument();

        // click resume in pause container will close up the pause container
        // back to main sudoku container
        fireEvent.click(screen.queryByText(resumeInPauseContainer) as Element);
        expect(screen.queryByText(pause)).not.toBeInTheDocument();
        expect(
            screen.queryByText(resumeInPauseContainer)
        ).not.toBeInTheDocument();

        const resumeInMainContainer = container.querySelector('.rx-pointer');
        expect(resumeInMainContainer).not.toBeNull();
        // click resume in main container will open up the pause container
        fireEvent.click(resumeInMainContainer as Element);
        expect(screen.queryByText(pause)).toBeInTheDocument();
        expect(screen.queryByText(resumeInPauseContainer)).toBeInTheDocument();

        cleanup();
    });
});
