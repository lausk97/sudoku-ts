import { useState } from 'react';
import { DifficultyType } from '../helper/types';
import { preventBtnFocus } from '../helper/util';

const Action = ({
    isGameOver,
    onCreateNewSudoku,
    onSolveSudoku,
    onClearTile
}: {
    isGameOver: boolean;
    onCreateNewSudoku: Function;
    onSolveSudoku: Function;
    onClearTile: Function;
}) => {
    const [showDifficulty, setShowDifficulty] = useState<boolean>(false);
    const createNewSudoku = (difficulty: DifficultyType) => {
        localStorage.removeItem('timer');
        localStorage.removeItem('userInput');
        localStorage.removeItem('board');
        onCreateNewSudoku(difficulty);
        setShowDifficulty(false);
    };

    return (
        <div className="actions">
            <div className="dropup">
                <button
                    className="btn"
                    onClick={() =>
                        setShowDifficulty((showStatus) => !showStatus)
                    }
                >
                    {`${!showDifficulty ? 'New Game' : 'Select One'}`}
                </button>
                <div
                    className={`dropup-content ${
                        showDifficulty ? 'show-difficulty' : ''
                    }`}
                >
                    <button onClick={() => createNewSudoku('Easy')}>
                        Easy
                    </button>
                    <button onClick={() => createNewSudoku('Medium')}>
                        Medium
                    </button>
                    <button onClick={() => createNewSudoku('Hard')}>
                        Hard
                    </button>
                    <button onClick={() => createNewSudoku('Expert')}>
                        Expert
                    </button>
                    <button
                        className="cancel"
                        onClick={() => setShowDifficulty(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <button
                className="btn"
                onClick={() => onSolveSudoku()}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                Solve
            </button>
            <button
                className="btn"
                onClick={(e) => onClearTile(e)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                Erase
            </button>
        </div>
    );
};

export default Action;
