import Tile from './Tile';
import Action from './Action';
import type { SudokuBoard, unsolvableBoard } from '../helper/types';
import NumberPad from './NumberPad';

const Board = ({
    initialBoard,
    board,
    solvedBoard,
    onInputKeyboardNumber,
    onInputNumpadNumber,
    onCreateNewSudoku,
    onSolveSudoku,
    onClearTile,
    onHandleTileFocus,
    onHandleFocusOut
}: {
    initialBoard: SudokuBoard;
    board: SudokuBoard | unsolvableBoard;
    solvedBoard: SudokuBoard | unsolvableBoard;
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
                onInputKeyboardNumber={onInputKeyboardNumber}
                onHandleTileFocus={onHandleTileFocus}
                onHandleFocusOut={onHandleFocusOut}
            />
            <Action
                onCreateNewSudoku={onCreateNewSudoku}
                onSolveSudoku={onSolveSudoku}
                onClearTile={onClearTile}
            />
            <NumberPad onInputNumpadNumber={onInputNumpadNumber} />
        </div>
    );
};

export default Board;
