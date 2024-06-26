import { useState, useEffect, useRef, KeyboardEvent, FormEvent } from 'react';
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
    const [initialBoard, setInitialBoard] = useState<SudokuBoard | null>(null);
    const [board, setBoard] = useState<SudokuBoard | unsolvableBoard | null>(
        null
    );
    const [solvedBoard, setSolvedBoard] = useState<
        SudokuBoard | unsolvableBoard | null
    >(null);
    const [focusRow, setFocusRow] = useState<number | undefined>();
    const [focusCol, setFocusCol] = useState<number | undefined>();
    const [gameOver, setGameOver] = useState<boolean>(false);

    const currBoardRef = useRef(board);
    const initialized = useRef(false);

    // create a timer interval
    useInterval(
        () => setInterval(() => setCount((c) => c + 1), 1000),
        isRunning
    );

    const persistUserInputHistory = (board: SudokuBoard | unsolvableBoard) => {
        const userInput = localStorage.getItem('userInput');
        if (board && userInput) {
            for (const [position, value] of Object.entries(
                JSON.parse(userInput)
            )) {
                const [rowIndex, colIndex] = position.split(':').map(Number);
                board[rowIndex][colIndex] = Number(value);
            }
        }
    };

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            const localStoredBoard = localStorage.getItem('board');
            const initialBoard = localStoredBoard
                ? JSON.parse(localStoredBoard)
                : generateRandomSudoku(difficulty);

            setInitialBoard(initialBoard);
            let copiedBoard = copy2DArray(initialBoard);
            if (localStoredBoard) {
                persistUserInputHistory(copiedBoard);
                const timerStr = localStorage.getItem('timer');
                if (timerStr) setCount(JSON.parse(timerStr));
                setIsRunning(false);
            }
            setBoard(copiedBoard);
            setSolvedBoard(returnSolvedBoard(copy2DArray(initialBoard)));
            localStorage.setItem('board', JSON.stringify(initialBoard));
        }
    }, []);

    useEffect(() => {
        // handle unsolvable sudoku
        if (initialBoard !== null && !solvedBoard) {
            console.log('rendered unsolvable sudoku');
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
            let currentUserInput = {};
            const storedUserInput = localStorage.getItem('userInput');
            if (storedUserInput) {
                currentUserInput = JSON.parse(storedUserInput);
            }

            localStorage.setItem(
                'userInput',
                JSON.stringify({
                    ...currentUserInput,
                    [`${rowIndex}:${colIndex}`]: value
                })
            );
        }
    };

    const formatTimer = () => {
        let minutes = Math.floor(count / 60);
        let seconds = count - minutes * 60;
        if (Boolean(initialBoard)) {
            localStorage.setItem('timer', JSON.stringify(count));
        }

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
        localStorage.setItem('board', JSON.stringify(newBoard));
        setSolvedBoard(returnSolvedBoard(copy2DArray(newBoard)));
        setDifficulty(difficulty);

        resetHandler();
    };

    const solveSudoku: Function = () => {
        const solvedSudoku =
            initialBoard && returnSolvedBoard(copy2DArray(initialBoard));
        setBoard(solvedSudoku);
        localStorage.setItem('board', JSON.stringify(solvedBoard));
        setTimeout(() => {
            const isGameOver = !!(
                currBoardRef.current &&
                solvedBoard &&
                isEqual2DArrays(currBoardRef.current, solvedBoard)
            );

            if (isGameOver) {
                // stop timer as the game ends
                setIsRunning(!isGameOver);
                setGameOver(isGameOver);
                setFocusRow(undefined);
                setFocusCol(undefined);
            }
        }, 0);
    };

    const clearTile: Function = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !gameOver &&
            focusRow !== undefined &&
            focusCol !== undefined &&
            withinBoard(focusRow, focusCol) &&
            board
        ) {
            if (initialBoard?.[focusRow][focusCol]) return;
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

    const inputKeyboardNumber: Function = (e: KeyboardEvent<HTMLElement>) => {
        if (gameOver || !(parseInt(e.key) >= 1 && parseInt(e.key) <= 9)) {
            e.preventDefault();
            return;
        }

        if (
            focusRow === undefined ||
            focusCol === undefined ||
            (focusRow !== undefined &&
                focusCol !== undefined &&
                initialBoard?.[focusRow][focusCol] !== UNASSIGNED)
        ) {
            return;
        }

        const isNumber = /^[0-9]$/i.test(e.key);
        if (isNumber && board) {
            // to prevent extension of duplicate numbers
            if (board[focusRow][focusCol] === parseInt(e.key)) {
                e.preventDefault();
                return;
            }

            const currentBoard = copy2DArray(board);
            setCurrentBoard(currentBoard, focusRow, focusCol, parseInt(e.key));

            keepInputFocus(focusRow, focusCol);
        }
    };

    const inputNumpadNumber: Function = (
        e: FormEvent<HTMLFormElement>,
        num: number
    ) => {
        e.preventDefault();

        if (
            focusRow === undefined ||
            focusCol === undefined ||
            (focusRow !== undefined &&
                focusCol !== undefined &&
                initialBoard?.[focusRow][focusCol] !== UNASSIGNED)
        )
            return;

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
        <>
            <div
                className={`sudoku-container ${
                    !isRunning && !gameOver ? 'stopped-timer-bg' : ''
                }`}
            >
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
                    focusRow={focusRow}
                    focusCol={focusCol}
                    isGameOver={gameOver}
                    onCreateNewSudoku={createNewSudoku}
                    onSolveSudoku={solveSudoku}
                    onClearTile={clearTile}
                    onInputKeyboardNumber={inputKeyboardNumber}
                    onInputNumpadNumber={inputNumpadNumber}
                    onHandleTileFocus={handleTileFocus}
                    onHandleFocusOut={handleFocusOut}
                />
            </div>

            {!isRunning && !gameOver ? (
                <div className="pause-container">
                    <h2 className="pause-title">Pause</h2>
                    <div className="pause-timer-container">
                        <p className="pause-time-text">Time</p>
                        <p className="pause-timer">{formatTimer()}</p>
                    </div>
                    <div className="pause-difficulty-container">
                        <p className="pause-difficulty-text">Difficulty</p>
                        <p className="pause-difficulty">{difficulty}</p>
                    </div>
                    <button className="resume-btn" onClick={handleTimerClick}>
                        <RxResume
                            size={18}
                            className={`rx-pointer ${
                                gameOver ? 'disabled' : ''
                            }`}
                        />
                        Resume
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default Sudoku;
