import { render, cleanup } from '@testing-library/react';
import { generateRandomSudoku } from '../helper/map';
import { copy2DArray } from '../helper/util';
import { returnSolvedBoard } from '../helper/solver';

import Tile from '../components/Tile';

it('should render all tiles according to the generated random sudoku', () => {
    const initialBoard = generateRandomSudoku();
    const board = copy2DArray(initialBoard);
    const solvedBoard = returnSolvedBoard(copy2DArray(initialBoard));
    const noop = () => {};
    const tiles = render(
        <Tile
            initialBoard={initialBoard}
            board={board}
            solvedBoard={solvedBoard}
            onInputNumber={noop}
            onHandleTileFocus={noop}
            onHandleFocusOut={noop}
        />
    );
    const rows = tiles.container.querySelectorAll('.block-border-tile');

    // tiles check via id
    rows.forEach((row, index) => {
        expect(
            !`board-${initialBoard[index].toString()}-${index}`.localeCompare(
                row.id.toString()
            )
        ).toBeTruthy();
    });

    cleanup();
});
