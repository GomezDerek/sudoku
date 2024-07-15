import React, { useState } from 'react';
import XButton from './XButton';
import finishLine from './svgs/finish-flag.svg';
import restartIcon from './svgs/restart.svg';

type Props =
{
    fx0? : ()=>boolean /* SolutionChecker(houses), checks if the puzzle is solved */
    fx1? : ()=>boolean /* isBoardFull(), checks if the user has filled every user-available square */
    fx2? : ()=>void    /* setHouses(parsePuzzle(...)), resets the puzzle */
}

export default function Menu(props: Props)
{
    const [resetVis, setResetVis] = useState<boolean>(false);
    const [finishVis, setFinishVis] = useState<boolean>(false);
    const [tutorialVis, setTutorialVis] = useState<boolean>(false);
    const [solutionVis, setSolutionVis] = useState<boolean>(false);
    const [solved, setSolved] = useState<boolean>(false);

    let unsolvedMessages = 
    [
        "the puzzle is still incomplete. Fill each square with a number 1-9",
        "a duplicate number exists somewhere. Double check your solution"
    ];

    /**
     * this function provides the display style for the pop-ups, conditional upon the useStates
     * @param    {boolean}  conditional  a bool expression that will determine pop-up visibility
     * @returns  {object}                display style set to either "inherit" or "none"
     */
    function visibleIf(conditional: boolean): {display: string}
    {
        return {display: conditional ? "inherit" : "none"};
    }
    
    return(
        <div style={{width: 0, height: 0}}>

            {/* menu buttons */}
            <button id="Restart-Button"
                className="menu-button svg-button"
                onClick={ () => setResetVis(true) }
            >
                <img
                    src={restartIcon}
                    alt="restart icon"
                />
                <span id="Restart-Tool-Tip" className="tool-tip">Restart puzzle</span>
            </button>

            <button id="Finish-Button"
                className="menu-button svg-button"
                onClick={ () => setFinishVis(true) }
            >
                <img 
                    src={finishLine} 
                    alt="finish line icon"
                />
                <span id="Finish-Tool-Tip" className="tool-tip">Check solution</span>
            </button>

            <button id="Tutorial-Button"
                className="menu-button svg-button"
                onClick={ () => setTutorialVis(true) }
            >
                ?
                <span id="Tutorial-Tool-Tip" className="tool-tip">Learn how to play</span>
            </button>

            {/*Pop-Ups*/}
            <div id="Opaque-Screen"
                style={ visibleIf(tutorialVis || finishVis || solutionVis || resetVis) }
            >

                <div id="Tutorial-Pop-Up"
                    className="popup"
                    style={ visibleIf(tutorialVis) }
                >
                    <XButton onClick={ () => setTutorialVis(false) } />
                    <h1>HOW TO PLAY</h1>
                    <p>To win, every square must have a number (1-9) BUT</p>
                    <ul>
                        <li>no duplicate number exists within a single row</li>
                        <li>no duplicate number exists within a single column</li>
                        <li>no duplicate number exists within a single 3x3 section, a.k.a. a House</li>
                    </ul>
                    <button 
                        id="Play-Button"
                        className="popup-primary-button"
                        onClick={ ()=> setTutorialVis(false) }
                    >
                        PLAY
                    </button>
                </div>

                <div id="Finish-Pop-Up"
                    className="popup"
                    style={ visibleIf(finishVis) }
                >
                    <XButton  onClick={ () => setFinishVis(false)} />
                    <h2>Check if your puzzle is correctly solved?</h2>
                    <button
                        className="popup-primary-button"
                        onClick={ () => {
                            setFinishVis(false); 
                            setSolutionVis(true);
                            setSolved(props.fx0!());
                        }}
                    >
                        check
                    </button>
                    <button
                        className="popup-secondary-button"
                        onClick={ () => setFinishVis(false) }
                    >
                        cancel
                    </button>
                </div>

                <div id="Solved-Pop-Up" 
                    className="popup"
                    style={ visibleIf(solutionVis && solved) }
                >
                    <XButton onClick={ () => setSolutionVis(false) } />
                    <h2>Your puzzle is solved! 🎉</h2>
                    <h3>Good job!</h3>
                    <button
                        className="popup-primary-button"
                        onClick={ ()=>setSolutionVis(false) }
                    >
                        admire your finished puzzle
                    </button>
                </div>

                <div id="Unsolved" 
                    className="popup"
                    style={ visibleIf(solutionVis && !solved) }
                >
                    <XButton onClick={ () => setSolutionVis(false) } />
                    <h2>Your puzzle isn't solved yet! 😱</h2>
                    <p>{ props.fx1!() ? unsolvedMessages[1] : unsolvedMessages[0] }</p>
                    <button 
                        className="popup-primary-button"
                        onClick={ () => setSolutionVis(false) }
                    >
                        OK
                    </button>
                </div>

                <div id="Reset-Pop-up"
                className="popup"
                style={ visibleIf(resetVis) }
            >
                <XButton onClick={ () =>setResetVis(false) } />
                <h2>Reset the puzzle?</h2>
                <p>⚠️ Progress will not be saved ⚠️</p>
                <button
                    className="popup-primary-button"
                    onClick={ () => { props.fx2!(); setResetVis(false); } }
                >
                    reset
                </button>
                <button
                    className="popup-secondary-button"
                    onClick={ () => setResetVis(false) }
                >
                    cancel
                </button>
            </div>
            </div>
        </div>
    );
}