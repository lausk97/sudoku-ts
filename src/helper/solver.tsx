import { UNASSIGNED, BOARD_SIZE, NUM_GUESSES, BLOCK_SIZE } from './constants';
import type { SudokuBoard, unsolvableBoard } from './types';
import { copy2DArray } from './util';

const isValidRow = (
    board: SudokuBoard,
    rowIndex: number,
    columnIndex: number,
    num: number,
    isGuess: boolean
): boolean => {
    // validate row position
    // condition: board row cannot have two same `num`
    for (let column = 0; column < BOARD_SIZE; column++) {
        if (
            (isGuess || (!isGuess && column !== columnIndex)) &&
            board[rowIndex][column] === num
        ) {
            return false;
        }
    }
    return true;
};

const isValidColumn = (
    board: SudokuBoard,
    rowIndex: number,
    colIndex: number,
    num: number,
    isGuess: boolean
): boolean => {
    // validate column position
    // condition: board column cannot have two same `num`
    for (let row = 0; row < BOARD_SIZE; row++) {
        if (
            (isGuess || (!isGuess && row !== rowIndex)) &&
            board[row][colIndex] === num
        ) {
            return false;
        }
    }
    return true;
};

const isValidBlock = (
    board: SudokuBoard,
    rowIndex: number,
    colIndex: number,
    num: number,
    isGuess: boolean
): boolean => {
    // validate current block
    const rowBlockStartPos = rowIndex - (rowIndex % BLOCK_SIZE);
    const columnBlockStartPos = colIndex - (colIndex % BLOCK_SIZE);
    for (
        let rowBlockPos = rowBlockStartPos;
        rowBlockPos < rowBlockStartPos + BLOCK_SIZE;
        rowBlockPos++
    ) {
        for (
            let columnBlockPos = columnBlockStartPos;
            columnBlockPos < columnBlockStartPos + BLOCK_SIZE;
            columnBlockPos++
        ) {
            if (
                (isGuess ||
                    (!isGuess &&
                        rowBlockPos !== rowIndex &&
                        columnBlockPos !== colIndex)) &&
                board[rowBlockPos][columnBlockPos] === num
            ) {
                return false;
            }
        }
    }

    return true;
};

export const isValidPos = (
    board: SudokuBoard,
    rowIndex: number,
    colIndex: number,
    num: number,
    guess: boolean = true
) => {
    return (
        isValidRow(board, rowIndex, colIndex, num, guess) &&
        isValidColumn(board, rowIndex, colIndex, num, guess) &&
        isValidBlock(board, rowIndex, colIndex, num, guess)
    );
};

export const validateBoard = (
    board: SudokuBoard | unsolvableBoard
): boolean => {
    if (board) {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (
                    board[row][col] !== UNASSIGNED &&
                    !isValidPos(board, row, col, board[row][col], false)
                ) {
                    return false;
                }
            }
        }
    }

    return !!board;
};

export const returnSolvedBoard = (
    board: SudokuBoard | unsolvableBoard
): SudokuBoard | unsolvableBoard => {
    if (board) {
        let solvedBoard = copy2DArray(board);
        if (solvedBoard && solve(solvedBoard) && validateBoard(solvedBoard)) {
            return solvedBoard;
        }
    }

    return;
};

export const solve = (board: SudokuBoard): boolean => {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === UNASSIGNED) {
                for (let guess = 1; guess < NUM_GUESSES + 1; guess++) {
                    if (isValidPos(board, row, col, guess)) {
                        // initialise guess in the (row, col) position
                        board[row][col] = guess;
                        if (solve(board)) {
                            return true;
                        }

                        // cannot be solved, revert back the current guess
                        board[row][col] = UNASSIGNED;
                    }
                }

                return false;
            }
        }
    }

    return validateBoard(board);
};
