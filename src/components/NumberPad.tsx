import { preventBtnFocus, cancelablePreventDef } from '../helper/util';

const NumberPad = ({
    onInputNumpadNumber
}: {
    onInputNumpadNumber: Function;
}) => {
    return (
        <div className="numpad-container">
            <button
                onClick={(e) => onInputNumpadNumber(e, 1)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                1
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 2)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                2
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 3)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                3
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 4)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                4
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 5)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                5
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 6)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                6
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 7)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                7
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 8)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                8
            </button>
            <button
                onClick={(e) => onInputNumpadNumber(e, 9)}
                onMouseDown={(e) => preventBtnFocus(e)}
                onTouchStart={(e) => cancelablePreventDef(e)}
            >
                9
            </button>
        </div>
    );
};

export default NumberPad;
