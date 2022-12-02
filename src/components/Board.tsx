import React from 'react';
import Tile from './Tile';
import Action from './Action';
import type { SudokuBoard, unsolvableBoard } from '../helper/types';

const Board = ({
    initialBoard,
    board,
    solvedBoard,
    onInputNumber,
    onCreateNewSudoku,
    onSolveSudoku,
    onClearTile,
    onHandleTileFocus,
    onHandleFocusOut
}: {
    initialBoard: SudokuBoard;
    board: SudokuBoard | unsolvableBoard;
    solvedBoard: SudokuBoard | unsolvableBoard;
    onInputNumber: Function;
    onCreateNewSudoku: Function;
    onSolveSudoku: Function;
    onClearTile: Function;
    onHandleTileFocus: Function;
    onHandleFocusOut: Function;
}) => {
    return (
        <div className="board">
            <Tile
                initialBoard={initialBoard}
                board={board}
                solvedBoard={solvedBoard}
                onInputNumber={onInputNumber}
                onHandleTileFocus={onHandleTileFocus}
                onHandleFocusOut={onHandleFocusOut}
            />
            <Action
                onCreateNewSudoku={onCreateNewSudoku}
                onSolveSudoku={onSolveSudoku}
                onClearTile={onClearTile}
            />
        </div>
    );
};

export default Board;
