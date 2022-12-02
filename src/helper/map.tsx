import type { SudokuBoard, DifficultyType } from './types';
import { isValidPos, solve } from './solver';
import {
    UNASSIGNED,
    BOARD_SIZE,
    EASY_DIFFICULTY,
    MEDIUM_DIFFICULTY,
    HARD_DIFFICULTY,
    EXPERT_DIFFICULTY
} from './constants';

type SudokuMap = {
    [key: string]: SudokuBoard;
};

export const SUDOKUS: SudokuMap = {
    Difficult: [
        [3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ],
    Easy: [
        [0, 1, 6, 5, 7, 8, 4, 9, 2],
        [5, 2, 9, 1, 3, 4, 7, 6, 8],
        [4, 8, 7, 6, 2, 9, 5, 3, 1],
        [2, 6, 3, 4, 1, 5, 9, 8, 7],
        [9, 7, 4, 8, 6, 3, 1, 0, 5],
        [8, 5, 1, 7, 9, 2, 6, 4, 3],
        [1, 3, 8, 9, 4, 7, 2, 5, 6],
        [6, 9, 0, 3, 5, 1, 8, 7, 4],
        [7, 4, 5, 2, 8, 6, 3, 1, 0]
    ],
    Wrong: [
        [3, 3, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ]
};

const DifficultyOptions = {
    Easy: EASY_DIFFICULTY,
    Medium: MEDIUM_DIFFICULTY,
    Hard: HARD_DIFFICULTY,
    Expert: EXPERT_DIFFICULTY
};

export const generateRandomSudoku = (
    difficulty: DifficultyType = 'Easy' // default difficulty level set to `Easy`
): SudokuBoard => {
    let sudoku = Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(UNASSIGNED));

    // populate 1 to 9 in random index in first row of sudoku to get random sudoku
    for (let i = 0; i < BOARD_SIZE; i++) {
        let randomValue = Math.floor(Math.random() * BOARD_SIZE) + 1;
        while (!isValidPos(sudoku, 0, i, randomValue)) {
            randomValue = Math.floor(Math.random() * BOARD_SIZE) + 1;
        }

        sudoku[0][i] = randomValue;
    }

    if (solve(sudoku)) {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (Math.random() >= DifficultyOptions[difficulty]) {
                    sudoku[row][col] = UNASSIGNED;
                }
            }
        }
    }

    return sudoku;
};
