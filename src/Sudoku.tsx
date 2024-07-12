import React, { useState } from 'react';
import House from './House';
import Square from './Square';
import SolutionChecker, { isDefault, isHouseValid, isRowValid, isColValid } from './Checker';
import Menu from './Menu';
import parsePuzzle from './Parser';

import './App.css';
import puzzles from './puzzles.json';

export type SquareIndices = {
    House: number,
    Row: number,
    Col: number
}

export type HouseType = {
    squares: any[][]
}

// an array of 9 3x3 arrays
// eslint-disable-next-line
let initialHouses: HouseType[] = Array(9).fill( 
    {squares: Array(3).fill( 
        Array(3).fill(null) 
    )}
);

const devMode = true;
export const defaultValue: string = " ";

export default function Sudoku() {
    
    const [ selectedSquare, setSelectedSquare ] = useState<SquareIndices>({House: -1, Row: -1, Col: -1});
    const [ houses, setHouses] = useState<HouseType[]>(()=>parsePuzzle("easy-1", "puzzle", setSelectedSquare, changeSquareVal));
    //const [ houses, setHouses ] = useState<HouseType[]>(initialHouses.map(
    //     (house: HouseType, h: number) => {
    //         let newSquares: any[][]= house.squares.map( (a: any[], i: number) => {
    //             return a.map((_b: any, j: number)=> {
    //                 return <Square
    //                     key={h+' '+i+' '+j}
    //                     value={defaultValue}
    //                     handleClick={ () => setSelectedSquare({House: h, Row: i, Col: j}) }
    //                     selected = {false}
    //                     locked={false}
    //                 />
    //             });
    //         });
    //         return {squares: newSquares};
    //     }
    // ));

    function changeSquareVal(input: string, selected: SquareIndices): void {
        let h = selected.House;
        let r = selected.Row;
        let c = selected.Col;

        //create new <Square> with newValue
        let newSquare = <Square 
            key={`${h} ${r} ${c}`} 
            value={input} 
            handleClick={ ()=>{ 
                console.log(`setSelectedSquare {${h} ${r} ${c}}`);
                setSelectedSquare({House: h, Row: r, Col: c});
            }}
            selected={false}
            locked={false}
            handleChange={changeSquareVal}
            index={ {House: h, Row: r, Col: c} }
        />

        //new array copy per array immutability
        //https://www.w3schools.com/jsref/jsref_array_with.asp
        let housesCopy = [...houses];
        
        housesCopy[h].squares[r][c] = newSquare;
        setHouses(housesCopy);
    }

    // this state is only used for the test-input
    const [ selectedValue, setSelectedValue ] = useState<string>(' ');

    // this function will be passed to <InputPad> as a prop
    function inputHandleClick(num: string): void {
        
        // no square selected OR test-strip's input square selected
        if( selectedSquare.House === -1 ) 
        {
            setSelectedValue(num);
            let testInput = document.getElementById('test-input');
            testInput?.setAttribute('value', 'num');
        }

        // change the value of the selectedSquare
        else
        {
            changeSquareVal(num, selectedSquare);
        }
    }

    // test strip functions
    function checkSelected(): void
    {
        let h = selectedSquare.House;
        let r = selectedSquare.Row;
        let c = selectedSquare.Col;

        let p: HTMLElement | null = document.getElementById('squareCheck');

        if(typeof p === 'object')
        {
            // ! is a non-null assertion 
            p!.innerHTML = isDefault(houses[h].squares[r][c]).toString();
        }
        else
        {
            console.log('uh oh');
        }
    }

    function checkHouse(): void
    {
        let houseIndex = selectedSquare.House;
        let valid = isHouseValid(houses[houseIndex]);

        let text: HTMLElement | null = document.getElementById("houseValidity");

        if(typeof text === "object")
        {
            // ! is a non-null assertion
            text!.innerHTML = valid.toString();
        }
        else 
        {
            console.log("uh oh");
        }
    }

    function checkRow(): void 
    {
        let rowIndex = selectedSquare.Row;
        let valid = isRowValid(houses, rowIndex);

        let text: HTMLElement | null = document.getElementById("rowValidity");

        if(typeof text === "object")
        {
            // ! is a non-null assertion
            text!.innerHTML = valid.toString();
        }
        else
        {
            console.log("uh oh");
        }
    }

    function checkColumn(): void 
    {
        // board column # = House# % 3 * 3 + Column in House (0-2)
        let colIndex = (selectedSquare.House % 3) * 3 + selectedSquare.Col;
        let valid = isColValid(houses, colIndex);

        let text: HTMLElement | null = document.getElementById("colValidity");

        if(typeof text === "object")
        {
            // ! is a non-null assertion
            text!.innerHTML = valid.toString();
        }
        else 
        {
            console.log("uh oh");
        }
    }

    function checkSolution(): void 
    {
        let valid = SolutionChecker(houses);

        let text: HTMLElement | null = document.getElementById("solutionValidity");

        if(typeof text === "object")
        {
            // ! is a non-null assertion
            text!.innerHTML = valid.toString();
        }
        else
        {
            console.log("uh oh");
        }
    }

    function isBoardFull(): boolean
    {
        let flatHouses = houses.map( house => house.squares.flat() );
        let completelyFlat = flatHouses.flat();
        
        return completelyFlat.every( square => {return !isDefault(square, defaultValue)} );
    }

    return(
        <div id="Sudoku">
            <Menu fx0={ ()=>SolutionChecker(houses) } fx1={ ()=>isBoardFull() } />
            <h1 
                id='Title'
                onClick={()=>console.log(window.getComputedStyle(document.getElementById('Title')!).fontSize)}
            >
                SUDOKU!
            </h1>   
            <div id="Test-Strip" 
                // devmode variable determines test strip visibility
                style={devMode ? {display: 'flex'} : {display: 'none'}}
            >
                <form>
                    <label htmlFor='test-input'>Input Test</label>
                    <br></br>
                    <input
                        id='test-input'
                        name='test-input'
                        type="text"
                        maxLength={1}
                        disabled={false}
                        onClick={ ()=>
                        {
                            setSelectedSquare({House: -1, Col: -1, Row: -1});
                        }}
                        value={selectedValue}
                        onChange={()=>{console.log(`test-strip onChange()`)}}
                        onKeyDown={ e => setSelectedValue(e.key) }
                    >   
                    </input>
                </form>

                <h5>Selected Square: {`(${selectedSquare.House}, ${selectedSquare.Row}, ${selectedSquare.Col})`}</h5>
                
                <button onClick={checkSelected}>is Default?</button>
                <p id={'squareCheck'}>_</p>

                <button onClick={checkHouse}>is House Valid?</button>
                <p id="houseValidity">_</p>
                
                <button onClick={checkRow}>is Row Valid?</button>
                <p id="rowValidity">_</p>
                
                <button onClick={checkColumn}>is Column Valid?</button>
                <p id="colValidity">_</p>
                
                <button onClick={ ()=>{ console.log(puzzles) } }>console log puzzles.json</button>
                <button onClick={ ()=>{ setHouses(parsePuzzle("easy-1", "puzzle", setSelectedSquare, changeSquareVal)) }}>reset puzzle</button>
                <button onClick={ ()=>{ setHouses(parsePuzzle("easy-1", "solution", setSelectedSquare, changeSquareVal)) }}>solve puzzle</button>
                
                <button onClick={ ()=>{ checkSolution() } }>check solution</button>
                <p id="solutionValidity">_</p>
            </div>
            <div id="Game-Board">
                <div className="House-Row">
                    <House key={1} house={houses[0]} />
                    <House key={2} house={houses[1]} />
                    <House key={3} house={houses[2]} />
                </div>
                <div className="House-Row">
                    <House key={4} house={houses[3]} />
                    <House key={5} house={houses[4]} />
                    <House key={6} house={houses[5]} />
                </div>
                <div className="House-Row">
                    <House key={7} house={houses[6]} />
                    <House key={8} house={houses[7]} />
                    <House key={9} house={houses[8]} />
                </div>
            </div>
            <div id='Input-Pad'>
                <button className="Num-Button" style={{gridArea: 'one'}} onClick={()=>inputHandleClick('1')}>1</button>
                <button className="Num-Button" style={{gridArea: 'two'}} onClick={()=>inputHandleClick('2')}>2</button>
                <button className="Num-Button" style={{gridArea: 'three'}} onClick={()=>inputHandleClick('3')}>3</button>
                <button className="Num-Button" style={{gridArea: 'four'}} onClick={()=>inputHandleClick('4')}>4</button>
                <button className="Num-Button" style={{gridArea: 'five'}} onClick={()=>inputHandleClick('5')}>5</button>
                <button className="Num-Button" style={{gridArea: 'six'}} onClick={()=>inputHandleClick('6')}>6</button>
                <button className="Num-Button" style={{gridArea: 'seven'}} onClick={()=>inputHandleClick('7')}>7</button>
                <button className="Num-Button" style={{gridArea: 'eight'}} onClick={()=>inputHandleClick('8')}>8</button>
                <button className="Num-Button" style={{gridArea: 'nine'}} onClick={()=>inputHandleClick('9')}>9</button>
                <button id='Clear' style={{gridArea: 'clear'}}onClick={()=>inputHandleClick(' ')}>clear</button>
                {/* <div className='Arrows'>
                    <button onClick={()=>alert("Undo button still needs to be coded!")}>🡸</button>
                    <button onClick={()=>alert("Redo button still needs to be coded!")}>🡺</button>
                </div> */}
            </div>
        </div>
    );
}