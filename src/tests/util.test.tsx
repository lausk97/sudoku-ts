import { generateRandomSudoku } from '../helper/map';
import { copy2DArray, isEqual2DArrays, withinBoard } from '../helper/util';
import { BOARD_SIZE } from '../helper/constants';
import type { SudokuBoard } from '../helper/types';

test('if two arrays equal after copying', () => {
    const board = generateRandomSudoku();
    const cloned = copy2DArray(board);
    expect(cloned).not.toBeNull();
    expect(isEqual2DArrays(board, cloned as SudokuBoard)).toBeTruthy();
});

test('if withinBoard util function works as expected', () => {
    const minusOneIndex = -1;
    const outOfBoundIndex = BOARD_SIZE;
    const zeroIndex = 0;
    const middleIndex = Math.floor(BOARD_SIZE / 2);
    const maxIndex = BOARD_SIZE - 1;

    // out of bound scenarios
    expect(withinBoard(minusOneIndex, outOfBoundIndex)).toBeFalsy();
    expect(withinBoard(minusOneIndex, maxIndex)).toBeFalsy();
    expect(withinBoard(zeroIndex, outOfBoundIndex)).toBeFalsy();

    // in bound scenarios
    expect(withinBoard(zeroIndex, maxIndex)).toBeTruthy();
    expect(withinBoard(zeroIndex, middleIndex)).toBeTruthy();
    expect(withinBoard(middleIndex, maxIndex)).toBeTruthy();
});
