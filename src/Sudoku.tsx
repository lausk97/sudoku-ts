import React, { useState, useEffect, useRef } from 'react';
import { generateRandomSudoku, SUDOKUS } from './helper/map';
import { returnSolvedBoard } from './helper/solver';
import { copy2DArray, isEqual2DArrays, withinBoard } from './helper/util';
import { UNASSIGNED } from './helper/constants';
import Board from './components/Board';
import type {
    DifficultyType,
    SudokuBoard,
    unsolvableBoard
} from './helper/types';
import { useInterval } from './helper/timer';

import { RxPause, RxResume } from 'react-icons/rx';

const Sudoku = () => {
    const [count, setCount] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [difficulty, setDifficulty] = useState<DifficultyType>('Easy');
    const [initialBoard, setInitialBoard] = useState<SudokuBoard>(
        generateRandomSudoku(difficulty)
    );
    const [board, setBoard] = useState<SudokuBoard | unsolvableBoard>(
        copy2DArray(initialBoard)
    );
    const [solvedBoard, setSolvedBoard] = useState<
        SudokuBoard | unsolvableBoard
    >(returnSolvedBoard(copy2DArray(initialBoard)));
    const [focusRow, setFocusRow] = useState<number | undefined>();
    const [focusCol, setFocusCol] = useState<number | undefined>();
    const [gameOver, setGameOver] = useState<boolean>(false);

    const currBoardRef = useRef(board);

    // create a timer interval
    useInterval(
        () => setInterval(() => setCount((c) => c + 1), 1000),
        isRunning
    );

    useEffect(() => {
        // handle unsolvable sudoku
        if (!board || !solvedBoard) {
            console.log('rendered wrong sudoku');
            const pregeneratedSudokus = [SUDOKUS.Difficult, SUDOKUS.Easy];

            createNewSudoku(
                pregeneratedSudokus[
                    Math.floor(Math.random() * pregeneratedSudokus.length)
                ]
            );
        }
        currBoardRef.current = board;
    }, [board, solvedBoard]);

    const resetHandler = () => {
        setCount(0);
        setIsRunning(true);
        setGameOver(false);
    };

    const setCurrentBoard = (
        board: SudokuBoard | unsolvableBoard,
        rowIndex: number,
        colIndex: number,
        value: number
    ) => {
        if (board) {
            board[rowIndex][colIndex] = value;

            setBoard(board);
        }
    };

    const formatTimer = () => {
        let minutes = Math.floor(count / 60);
        let seconds = count - minutes * 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
            2,
            '0'
        )}`;
    };

    const handleTimerClick = () => {
        setIsRunning((prevRunningState) => !prevRunningState);
    };

    const createNewSudoku: Function = (difficulty: DifficultyType = 'Easy') => {
        const newBoard = generateRandomSudoku(difficulty);
        setInitialBoard(newBoard);
        setBoard(copy2DArray(newBoard));
        setSolvedBoard(returnSolvedBoard(copy2DArray(newBoard)));
        setDifficulty(difficulty);

        resetHandler();
    };

    const solveSudoku: Function = () => {
        const solvedSudoku =
            initialBoard && returnSolvedBoard(copy2DArray(initialBoard));
        setBoard(solvedSudoku);
        setTimeout(() => {
            const isGameOver = !!(
                currBoardRef.current &&
                solvedBoard &&
                isEqual2DArrays(currBoardRef.current, solvedBoard)
            );

            // stop timer as the game ends
            setIsRunning(!isGameOver);
            setGameOver(isGameOver);
        }, 0);
    };

    const clearTile: Function = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !gameOver &&
            focusRow &&
            focusCol &&
            withinBoard(focusRow, focusCol) &&
            board
        ) {
            if (initialBoard[focusRow][focusCol]) return;
            const currentBoard = copy2DArray(board);
            setCurrentBoard(currentBoard, focusRow, focusCol, UNASSIGNED);
        }
    };

    const keepInputFocus = (rowIndex: number, colIndex: number) => {
        // continue focus of the current input
        setTimeout(() => {
            // check if the board is solved after inputting the new number
            const isGameOver = !!(
                currBoardRef.current &&
                solvedBoard &&
                isEqual2DArrays(currBoardRef.current, solvedBoard)
            );
            if (isGameOver) {
                setIsRunning(!isGameOver);
                setGameOver(isGameOver);
            } else {
                const currentInput = document.getElementById(
                    `input-${rowIndex}-${colIndex}`
                );
                currentInput?.focus();
            }
        }, 0);
    };

    const inputKeyboardNumber: Function = (
        e: React.KeyboardEvent<HTMLElement>
    ) => {
        if (
            !focusRow ||
            !focusCol ||
            (focusRow &&
                focusCol &&
                initialBoard[focusRow][focusCol] !== UNASSIGNED)
        )
            return;

        const isNumber = /^[0-9]$/i.test(e.key);
        if (isNumber && board) {
            const currentBoard = copy2DArray(board);
            setCurrentBoard(currentBoard, focusRow, focusCol, parseInt(e.key));

            keepInputFocus(focusRow, focusCol);
        }
    };

    const inputNumpadNumber: Function = (
        e: React.FormEvent<HTMLFormElement>,
        num: number
    ) => {
        e.preventDefault();

        if (!focusRow || !focusCol) return;

        if (withinBoard(focusRow, focusCol)) {
            if (board) {
                const currentBoard = copy2DArray(board);
                setCurrentBoard(currentBoard, focusRow, focusCol, num);

                keepInputFocus(focusRow, focusCol);
            }
        }
    };

    const handleTileFocus: Function = (rowIndex: number, colIndex: number) => {
        if (withinBoard(rowIndex, colIndex)) {
            setFocusRow(rowIndex);
            setFocusCol(colIndex);
        }
    };

    const handleFocusOut: Function = () => {
        setFocusRow(undefined);
        setFocusCol(undefined);
    };

    return (
        <div className="sudoku-container">
            <div className="title-timer-container">
                <h1 className="title-text">Sudoku</h1>
                <p className="difficulty">{`Difficulty: ${difficulty}`}</p>

                <div className="timer-resume-pause-container">
                    <p className="timer">{formatTimer()}</p>
                    {isRunning ? (
                        <RxResume
                            size={18}
                            className={`rx-pointer ${
                                gameOver ? 'disabled' : ''
                            }`}
                            onClick={handleTimerClick}
                        />
                    ) : (
                        <RxPause
                            size={18}
                            className={`rx-pointer ${
                                gameOver ? 'disabled' : ''
                            }`}
                            onClick={handleTimerClick}
                        />
                    )}
                </div>
            </div>

            <Board
                initialBoard={initialBoard}
                board={board}
                solvedBoard={solvedBoard}
                onCreateNewSudoku={createNewSudoku}
                onSolveSudoku={solveSudoku}
                onClearTile={clearTile}
                onInputKeyboardNumber={inputKeyboardNumber}
                onInputNumpadNumber={inputNumpadNumber}
                onHandleTileFocus={handleTileFocus}
                onHandleFocusOut={handleFocusOut}
            />
        </div>
    );
};

export default Sudoku;
