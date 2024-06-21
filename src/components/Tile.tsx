import type { SudokuBoard, unsolvableBoard } from '../helper/types';
import { UNASSIGNED } from '../helper/constants';

const Tile = ({
    initialBoard,
    board,
    solvedBoard,
    focusRow,
    focusCol,
    onInputKeyboardNumber,
    onHandleTileFocus,
    onHandleFocusOut
}: {
    initialBoard: SudokuBoard | null;
    board: SudokuBoard | unsolvableBoard | null;
    solvedBoard: SudokuBoard | unsolvableBoard | null;
    focusRow: number | undefined;
    focusCol: number | undefined;
    onInputKeyboardNumber: Function;
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
                        id={`board-${row}-${rowIndex}`}
                        className="block-border-tile"
                    >
                        {row.map((col, colIndex) => (
                            <input
                                inputMode="none"
                                className={`tile ${
                                    initialBoard?.[rowIndex][colIndex] !==
                                    UNASSIGNED
                                        ? 'init'
                                        : col === UNASSIGNED
                                        ? 'empty'
                                        : board[rowIndex][colIndex] !==
                                          solvedBoard[rowIndex][colIndex]
                                        ? 'invalid'
                                        : 'valid'
                                } ${
                                    focusRow !== undefined &&
                                    focusCol !== undefined &&
                                    !(
                                        document.getElementById(
                                            `input-${rowIndex}-${colIndex}`
                                        ) as HTMLInputElement
                                    )?.value.localeCompare(
                                        board[focusRow][focusCol].toString()
                                    )
                                        ? 'focus'
                                        : ''
                                }`}
                                readOnly={
                                    initialBoard?.[rowIndex][colIndex] !==
                                    UNASSIGNED
                                }
                                type="text"
                                defaultValue={
                                    board[rowIndex][colIndex] === UNASSIGNED
                                        ? ''
                                        : board[rowIndex][colIndex]
                                }
                                onKeyDown={(e) => onInputKeyboardNumber(e)}
                                onFocus={(e) => {
                                    e.preventDefault();
                                    onHandleTileFocus(rowIndex, colIndex);
                                }}
                                onBlur={() => onHandleFocusOut()}
                                pattern="^$|[1-9]{1}"
                                key={`input-${rowIndex}-${colIndex}`}
                                id={`input-${rowIndex}-${colIndex}`}
                                aria-label={`input-${rowIndex}-${colIndex}`}
                            />
                        ))}
                    </div>
                ))}
        </>
    );
};

export default Tile;
