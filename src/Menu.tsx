import React, { useState } from 'react';

export default function Menu()
{
    const [popUpVis, setPopUpVis] = useState<boolean>(false);
    return(
        <div style={{width: 0, height: 0}}>
            
            <button 
                id="Tutorial-Button"
                onClick={ () => setPopUpVis(true) }
            >
                ?
            </button>

            <div 
                id="Opaque-Screen" 
                style={ {display: popUpVis ? "inherit" : "none", zIndex: 1} }
            >
                <div 
                    id="Tutorial-Pop-Up"
                    style={ {display: popUpVis ? "inherit" : "none" } }
                >
                    <button 
                        id="X-Button"
                        onClick={ () => setPopUpVis(false) }
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
                        onClick={ ()=> setPopUpVis(false) }
                    >
                        PLAY
                    </button>
                </div>
            </div>

        </div>
    );
}