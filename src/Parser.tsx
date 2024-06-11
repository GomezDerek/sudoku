import React from 'react';
import { HouseType, defaultValue, SquareIndices } from './Sudoku';
import Square from './Square';

import puzzles from './puzzles.json';

/** 
 * this function creates a <Square> component and aassigns every arg to a prop
 * @param    {string}                                               val                assigned to props.value
 * @param    {number}                                               h                  assigned to props.key & props.index
 * @param    {number}                                               r                  assigned to props.key & props.index
 * @param    {number}                                               c                  assigned to props.key & props.index
 * @param    {boolean}                                              locked             assigned to props.locked
 * @param    {React.Dispatch<React.SetStateAction<SquareIndices>>}  setSelectedSquare  assigned to props.handleClick
 * @param    { (s: string, ss: SquareIndices) => void }             changeSquareVal    assigned to props.handleChange
 * @returns  {SquareType}                                                              <Square> component
*/
export function createSquareComponent(val: string, h: number, r: number, c: number, locked: boolean, setSelectedSquare: React.Dispatch<React.SetStateAction<SquareIndices>>, changeSquareVal: (s: string, ss: SquareIndices)=>void)
{
    return <Square
        key={`${h} ${r} ${c}`}
        value={val}
        handleClick={() => 
        {
            console.log(`setSelectedSquare {${h} ${r} ${c}}`);
            setSelectedSquare( {House: h, Row: r, Col: c} )
        }}
        selected={false}
        locked={locked}
        handleChange={ changeSquareVal }
        index={ {House: h, Row: r, Col: c} }
    />
}

/**
 *  this function will take a puzzle from the puzzles.json file and return a House array for Sudoku.tsx
 * @param   {string}                          id            id for the puzzle in puzzles.json
 * @param   {string}                          type          is it a puzzle or solution
 * @param   {SetStateAction<SquareIndices>}   setSelected   the setSelectedSquare() function from Sudoku
 * @returns {HouseType[]}                                   array of Houses of HouseType'(prevState: SquareIndices) => SquareIndices'
 */
export default function parsePuzzle(id: string, type: string, setSelectedSquare: React.Dispatch<React.SetStateAction<SquareIndices>>, changeSquareVal: (s: string, ss: SquareIndices)=>void): HouseType[]
{   
    // get puzzle by id
    let puzzle = puzzles.find( (puzzleObj, _i) =>
    {
        return puzzleObj.id === id
            && puzzleObj.type === type
            && puzzleObj.format === '2d-array'
            // if type is solution, then blankChar doesn't matter 
            && (type === "puzzle" ? (puzzleObj.blankChar === 0) : true) ;
    });

   let houseArray: HouseType[] = [];

    // reformat 2d array to 3d House array
    // iterate through the houses (0-8)
    for(let i=0; i<9; i++) 
    {
        houseArray[i] = {squares: []}

        // preJ can be 0||3||6
        let preJ: number = Math.floor(i/3)*3;
        
        // iterate through rows of 3
        // houses 0-2 access rows 0-2, houses 3-5 access rows 3-5, houses 6-8 access rows 6-8
        for(let j=preJ; j < preJ+3; j++)
        {
            houseArray[i].squares[j%3] = [];

            // houses 0,3,6 access col 0-2, houses 1,4,7 access col 3-5, houses 2,5,8 access col 6-8
            let preK: number = (i%3)*3;
            for(let k=preK; k < preK+3; k++)
            {
                // we use k%3 because 0<=k<9 but squares[][].length = 3
                let strVal: string = puzzle!.board![j][k]!.toString();

                // convert the json's blankChar into Sudoku's default value
                if(puzzle!.blankChar != null)
                {
                    strVal = strVal === puzzle!.blankChar!.toString() ? defaultValue : strVal;
                }
                
                //let isLocked: boolean = (type === 'puzzle' && strVal.localeCompare(defaultValue)) ? true : false;
                // revising so that squarees are locked whether type is puzzle or solution
                let isLocked : boolean = strVal.localeCompare(defaultValue) !== 0;

                // we use k%3 because 0<=k<9 but squares[][].length = 3
                let square = createSquareComponent(strVal, i, j%3, k%3, isLocked, setSelectedSquare, changeSquareVal);
                houseArray[i].squares[j%3][k%3] = square;
            }
        }
    }
    return houseArray;
}