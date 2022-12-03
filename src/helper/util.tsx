import { FormEvent } from 'react';
import type { SudokuBoard, unsolvableBoard } from './types';
import { BOARD_SIZE } from './constants';

export const print2DArray = (board: SudokuBoard) => {
    for (let row of board) {
        console.log(row);
    }
};

export const copy2DArray = (
    from: SudokuBoard
): SudokuBoard | unsolvableBoard => {
    let to = [];
    for (let i = 0; i < from.length; i++) {
        to[i] = [...from[i]];
    }

    return to;
};

export const isEqual = (a: Array<number>, b: Array<number>): boolean =>
    a.join() === b.join();

export const isEqual2DArrays = (
    fstArray: SudokuBoard,
    sndArray: SudokuBoard
): boolean => {
    if (fstArray.length === sndArray.length) {
        const arraysLength = fstArray.length;
        for (let i = 0; i < arraysLength; i++) {
            if (!isEqual(fstArray[i], sndArray[i])) {
                return false;
            }
        }

        return true;
    }

    return false;
};

export const withinBoard = (rowIndex: number, colIndex: number) => {
    return (
        rowIndex >= 0 &&
        rowIndex < BOARD_SIZE &&
        colIndex >= 0 &&
        colIndex < BOARD_SIZE
    );
};

export const preventBtnFocus: Function = (e: FormEvent<HTMLFormElement>) =>
    e.preventDefault();
