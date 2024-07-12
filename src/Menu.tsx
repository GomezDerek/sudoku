import React, { useState } from 'react';
import finishLine from './finish-flag.svg';

type Props =
{
    fx0? : ()=>boolean /* this will be the check solution function */
    fx1? : ()=>boolean /* this will be the reset board button */
}

export default function Menu(props: Props)
{
    const [tutorialVis, setTutorialVis] = useState<boolean>(false);
    const [finishVis, setFinishVis] = useState<boolean>(false);
    const [solutionVis, setSolutionVis] = useState<boolean>(false);
    const [solved, setSolved] = useState<boolean>(false);

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
            <button id="Finish-Button"
                className="menu-button"
                onClick={ () => setFinishVis(true) }
            >
                <img 
                    src={finishLine} 
                    alt="finish line icon"
                />
                <span id="Finish-Tool-Tip" className="tool-tip">Check solution</span>
            </button>

            <button id="Tutorial-Button"
                className="menu-button"
                onClick={ () => setTutorialVis(true) }
            >
                ?
                <span id="Tutorial-Tool-Tip" className="tool-tip">Learn how to play</span>
            </button>

            {/*Pop-Ups*/}
            <div id="Opaque-Screen"
                style={ visibleIf(tutorialVis || finishVis || solutionVis) }
            >

                <div id="Tutorial-Pop-Up"
                    className="popup"
                    style={ visibleIf(tutorialVis) }
                >
                    <button 
                        id="X-Button"
                        className="x-button"
                        onClick={ () => setTutorialVis(false) }
                    >
                        x
                    </button>
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
                    <button
                        id="X-Finish"
                        className="x-button"
                        onClick={ () => setFinishVis(false) }
                    >
                        x
                    </button>
                    <h2>Are you ready to check if your puzzle is correctly solved?</h2>
                    <button
                        className="popup-primary-button"
                        onClick={ () => {
                            setFinishVis(false); 
                            setSolutionVis(true);
                            setSolved(props.fx0!());
                        }}
                    >
                        yes
                    </button>
                    <button
                        className="popup-secondary-button"
                        onClick={ () => setFinishVis(false)}
                    >
                        no
                    </button>
                </div>

                <div id="Solved-Pop-Up" 
                    className="popup"
                    style={ visibleIf(solutionVis && solved) }
                >
                    <button
                        className="x-button"
                        onClick={ ()=>setSolutionVis(false) }
                    >
                        x
                    </button>
                    <h2>Your puzzle is solved!</h2>
                </div>

                <div id="Unsolved" 
                    className="popup"
                    style={ visibleIf(solutionVis && !solved) }>
                    <button
                        className="x-button"
                        onClick={ ()=>setSolutionVis(false) }
                    >
                        x
                    </button>
                    <h2>Your puzzle is NOT solved!</h2>
                    <button 
                        className="popup-primary-button"
                        onClick={ () => setSolutionVis(false) }
                    >
                        ok
                    </button>
                </div>
            </div>

        </div>
    );
}