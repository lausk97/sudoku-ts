import { validateBoard, solve, returnSolvedBoard } from '../helper/solver';
import { BOARD_SIZE } from '../helper/constants';

const unsolvableBoard = [
    [3, 3, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];
const solvableBoard = [
    [0, 1, 6, 5, 7, 8, 4, 9, 2],
    [5, 2, 9, 1, 3, 4, 7, 6, 8],
    [4, 8, 7, 6, 2, 9, 5, 3, 1],
    [2, 6, 3, 4, 1, 5, 9, 8, 7],
    [9, 7, 4, 8, 6, 3, 1, 0, 5],
    [8, 5, 1, 7, 9, 2, 6, 4, 3],
    [1, 3, 8, 9, 4, 7, 2, 5, 6],
    [6, 9, 0, 3, 5, 1, 8, 7, 4],
    [7, 4, 5, 2, 8, 6, 3, 1, 0]
];

test('if board validation is as expected', () => {
    expect(validateBoard(unsolvableBoard)).toBeFalsy();
    expect(validateBoard(undefined)).toBeFalsy();
    expect(validateBoard(solvableBoard)).toBeTruthy();
});

test('if board solve function is as expected', () => {
    expect(solve(unsolvableBoard)).toBeFalsy();
    expect(solve(solvableBoard)).toBeTruthy();
});

test('if solved board function returns a valid solved board (same as board size) and undefined for unsolvable board', () => {
    const unsolvedBoard = returnSolvedBoard(unsolvableBoard);
    const solvedBoard = returnSolvedBoard(solvableBoard);
    expect(unsolvedBoard).toBeUndefined();
    expect(solvedBoard).not.toBeNull();
    if (solvedBoard) {
        expect(solvedBoard.length).toBe(BOARD_SIZE);
        for (const row of solvedBoard) {
            expect(row.length).toBe(BOARD_SIZE);
        }
    }
});
