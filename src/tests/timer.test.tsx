import { screen, render, act, cleanup } from '@testing-library/react';
import Sudoku from '../Sudoku';

test('if the sudoku timer runs', async () => {
    const initialTimer = '00:00';
    const twoSecondsTimer = '00:02';

    render(<Sudoku />);
    expect(screen.queryByText(initialTimer)).not.toBeNull();

    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    expect(screen.queryByText(initialTimer)).toBeNull();
    expect(screen.queryByText(twoSecondsTimer)).not.toBeNull();

    cleanup();
});
