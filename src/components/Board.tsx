import Tile from './Tile';
import Action from './Action';
import type { SudokuBoard, unsolvableBoard } from '../helper/types';
import NumberPad from './NumberPad';

const Board = ({
    initialBoard,
    board,
    solvedBoard,
    focusRow,
    focusCol,
    isGameOver,
    onInputKeyboardNumber,
    onInputNumpadNumber,
    onCreateNewSudoku,
    onSolveSudoku,
    onClearTile,
    onHandleTileFocus,
    onHandleFocusOut
}: {
    initialBoard: SudokuBoard | null;
    board: SudokuBoard | unsolvableBoard | null;
    solvedBoard: SudokuBoard | unsolvableBoard | null;
    focusRow: number | undefined;
    focusCol: number | undefined;
    isGameOver: boolean;
    onInputKeyboardNumber: Function;
    onInputNumpadNumber: Function;
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
                focusRow={focusRow}
                focusCol={focusCol}
                onInputKeyboardNumber={onInputKeyboardNumber}
                onHandleTileFocus={onHandleTileFocus}
                onHandleFocusOut={onHandleFocusOut}
            />
            <Action
                onCreateNewSudoku={onCreateNewSudoku}
                onSolveSudoku={onSolveSudoku}
                onClearTile={onClearTile}
                isGameOver={isGameOver}
            />
            <NumberPad
                isGameOver={isGameOver}
                onInputNumpadNumber={onInputNumpadNumber}
            />
        </div>
    );
};

export default Board;
