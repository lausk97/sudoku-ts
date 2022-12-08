import { preventBtnFocus } from '../helper/util';

const NumberPad = ({
    isGameOver,
    onInputNumpadNumber
}: {
    isGameOver: boolean;
    onInputNumpadNumber: Function;
}) => {
    return (
        <div className="numpad-container">
            <button
                onClick={(e) => onInputNumpadNumber(e, 1)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                1
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 2)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                2
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 3)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                3
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 4)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                4
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 5)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                5
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 6)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                6
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 7)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                7
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 8)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                8
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 9)}
                onMouseDown={(e) => preventBtnFocus(e)}
                disabled={isGameOver}
            >
                9
            </button>
        </div>
    );
};

export default NumberPad;
