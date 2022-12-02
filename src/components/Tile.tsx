import type { SudokuBoard, unsolvableBoard } from '../helper/types';
import { UNASSIGNED } from '../helper/constants';

const Tile = ({
    initialBoard,
    board,
    solvedBoard,
    onInputNumber,
    onHandleTileFocus,
    onHandleFocusOut
}: {
    initialBoard: SudokuBoard;
    board: SudokuBoard | unsolvableBoard;
    solvedBoard: SudokuBoard | unsolvableBoard;
    onInputNumber: Function;
    onHandleTileFocus: Function;
    onHandleFocusOut: Function;
}) => {
    return (
        <>
            {board &&
                solvedBoard &&
                board.map((row, rowIndex) => (
                    <div
                        key={`board-${row}-${rowIndex}`}
                        className="block-border-tile"
                    >
                        {row.map((col, colIndex) => (
                            <input
                                className={`tile ${
                                    initialBoard[rowIndex][colIndex] !==
                                    UNASSIGNED
                                        ? 'init'
                                        : col === UNASSIGNED
                                        ? 'empty'
                                        : board[rowIndex][colIndex] !==
                                          solvedBoard[rowIndex][colIndex]
                                        ? 'invalid'
                                        : 'valid'
                                }`}
                                readOnly={
                                    initialBoard[rowIndex][colIndex] !==
                                    UNASSIGNED
                                }
                                type="text"
                                defaultValue={
                                    board[rowIndex][colIndex] === UNASSIGNED
                                        ? ''
                                        : board[rowIndex][colIndex]
                                }
                                onKeyDown={(e) =>
                                    onInputNumber(e, rowIndex, colIndex)
                                }
                                onFocus={() =>
                                    onHandleTileFocus(rowIndex, colIndex)
                                }
                                onBlur={() => onHandleFocusOut()}
                                pattern="^$|[1-9]{1}"
                                key={`input-${rowIndex}-${colIndex}`}
                                id={`input-${rowIndex}-${colIndex}`}
                            />
                        ))}
                    </div>
                ))}
        </>
    );
};

export default Tile;
