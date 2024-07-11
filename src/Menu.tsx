import React, { useState } from 'react';
import finishLine from './finish-flag.svg';
export default function Menu()
{
    const [tutorialVis, setTutorialVis] = useState<boolean>(false);
    const [finishVis, setFinishVis] = useState<boolean>(false);
    
    return(
        <div style={{width: 0, height: 0}}>

            {/* menu buttons */}
            <button
                id="Finish-Button"
                className="menu-button"
                onClick={ () => setFinishVis(true) }
            >
                <img 
                    src={finishLine} 
                    alt="finish line icon"
                />
                <span id="Finish-Tool-Tip" className="tool-tip">Check solution</span>
            </button>

            <button 
                id="Tutorial-Button"
                className="menu-button"
                onClick={ () => setTutorialVis(true) }
            >
                ?
                <span id="Tutorial-Tool-Tip" className="tool-tip">Learn how to play</span>
            </button>

            {/*Pop-Ups*/}
            <div 
                id="Opaque-Screen"
                style={ {display: tutorialVis || finishVis ? "inherit" : "none", zIndex: 1} }
            >

                <div 
                    id="Tutorial-Pop-Up"
                    style={ {display: tutorialVis ? "inherit" : "none" } }
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

                <div
                    id="Finish-Pop-Up"
                    style={ {display: finishVis ? "inherit" : "none"} }
                >
                    <button
                        id="X-Finish"
                        className="x-button"
                        onClick={ () => setFinishVis(false) }
                    >
                        x
                    </button>
                    <h1>Are you ready to check if your puzzle is correctly solved?</h1>
                    <button
                        className="popup-primary-button"
                        onClick={ () => setFinishVis(false)}
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
            </div>

        </div>
    );
}