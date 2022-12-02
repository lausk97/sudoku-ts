import { useState } from 'react';
import { DifficultyType } from '../helper/types';
import { preventBtnFocus } from '../helper/util';

const Action = ({
    onCreateNewSudoku,
    onSolveSudoku,
    onClearTile
}: {
    onCreateNewSudoku: Function;
    onSolveSudoku: Function;
    onClearTile: Function;
}) => {
    const [showDifficulty, setShowDifficulty] = useState<boolean>(false);
    const createNewSudoku = (difficulty: DifficultyType) => {
        onCreateNewSudoku(difficulty);
        setShowDifficulty(false);
    };

    return (
        <div className="actions">
            <div className="dropup">
                <button
                    className="btn create-btn"
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
                className="btn solve-btn"
                onClick={() => onSolveSudoku()}
                onMouseDown={(e) => preventBtnFocus(e)}
            >
                Solve
            </button>
            <button
                className="btn clear-btn"
                onClick={(e) => onClearTile(e)}
                onMouseDown={(e) => preventBtnFocus(e)}
            >
                Clear
            </button>
        </div>
    );
};

export default Action;
