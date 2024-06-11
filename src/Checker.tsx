import { HouseType } from './Sudoku';

// typing for the <Square> component. value is the only prop we'll need to access
export interface SquareType  
{
    props: {value: string}
}

/**
 * checks if the user's solution to the Sudoku puzzle is correct 
 * @param   {Array[Array[<Square>]]}    board   the House array state from Sudoku.tsx 
 * @returns {boolean}                           is the user's solution correct
*/
export default function SolutionChecker(board: HouseType[]): boolean 
{
    // check houses
    let housesValid: boolean = true;
    housesValid = board.every( (house: HouseType) => 
    {
        return isHouseValid(house);
    });
    
    if(!housesValid) return false;

    // check rows
    let rowsValid: boolean = true;
    for(let i=0; i < 9; i++)
    {
        if( !isRowValid(board, i) ) rowsValid = false; 
    }

    if(!rowsValid) return false;

    // check columns
    let columnsValid: boolean = true;
    for(let i=0; i < 9; i++)
    {
        if( !isColValid(board, i) ) columnsValid = false;
    }

    if(!columnsValid) return false;

    // if any of these were false, the function should have already returned FALSE and ended true
    // therefore, this AND statement should only return TRUE
    return housesValid && rowsValid && columnsValid;
}

/**
 * checks if a <Square> component has a user-assigned value or the default value
 * @param    {FC}       square   a <Square> component 
 * @returns  {boolean}           does the square component have a user-assigned value
 */
export function isFilled(square: SquareType): boolean
{
    let defaultValue = "X";
    return !(square.props.value === defaultValue);
}

/**
 * checks if a <Square> component has a default value or a user-assigned value
 * @param    {FC}       square   a <Square> component 
 * @returns  {boolean}           does the square component have a default value
 */
export function isDefault(square: SquareType): boolean
{
    let defaultValue= "X";
    return square.props.value === defaultValue;
}

/**
 * checks if a House has a valid solution. 
 * All values must be non-default and unique 1-9
 * @param   {<Square>[][]}   house   a 2D array of <Square> components
 * @returns {boolean}                does the house have a valid solution
 */
export function isHouseValid(house: HouseType): boolean
{
    // first flatten the 2D array into 1D
    let flatHouse: SquareType[] = house.squares.flat();

    if( flatHouse.every( (square) => { return isDefault(square) } ) )
    {
        return false;
    }
    // else { continue with the rest of the function }

    // lastly check if all squares are unique
    // first sort the array
    flatHouse.sort( (a, b) => {return parseInt(a.props.value) - parseInt(b.props.value)} );
    
    // then ensure only one of each digit 1-9 is included
    return flatHouse.every( (sq, i) => { return parseInt(sq.props.value) === (i+1) });
}

/**
 * checks if the selected row has a valid solution. 
 * All values must be non-default and unique 1-9
 * @param     {HouseType[]}   board      the house state from Sudoku.tsx
 * @param     {number}        rowIndex   index of the row to be checked 0-8
 * @returns   {boolean}                  is the row valid? All values unique? All non-default?
 */
export function isRowValid(board: HouseType[], rowIndex: number): boolean
{
    let h1Row: SquareType[];
    let h2Row: SquareType[];
    let h3Row: SquareType[];

    // row spans houses 1-3
    if(rowIndex < 3)
    {
        h1Row = board[0].squares[rowIndex];
        h2Row = board[1].squares[rowIndex];
        h3Row = board[2].squares[rowIndex];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    }

    // row spans houses 4-6
    else if(rowIndex < 6)
    {
        h1Row = board[3].squares[rowIndex%3];
        h2Row = board[4].squares[rowIndex%3];
        h3Row = board[5].squares[rowIndex%3];  
    }

    // row spans houses 7-9
    else //rowIndex >= 6
    {
        h1Row = board[6].squares[rowIndex%3];
        h2Row = board[7].squares[rowIndex%3];
        h3Row = board[8].squares[rowIndex%3];
    }

    let fullRow: SquareType[] = h1Row.concat(h2Row, h3Row);

    // check if all squares are unique
    // first sort the array
    fullRow.sort( (a, b) => {return parseInt(a.props.value) - parseInt(b.props.value)} );
    
    // then ensure only one of each digit 1-9 is included
    return fullRow.every( (sq, i) => { return parseInt(sq.props.value) === (i+1) });
}

/** 
 * checks if the selected column has a valid solution. 
 * All values must be non-default and unique 1-9
 * @param    {HouseType[]}   board      the house state from Sudoku.tsx
 * @param    {number}        colIndex   index of the col to be checked 0-8
 * @returns  {boolean}                  is the column valid? All values unique? All non-default?
 */
export function isColValid(board: HouseType[], colIndex: number) : boolean
{
    let flatHouse1: SquareType[];
    let flatHouse2: SquareType[];
    let flatHouse3: SquareType[];
    let flatHouseConcat: SquareType[];
    let targetCol: SquareType[];

    // column spans left-side houses 0, 3, & 6
    if(colIndex < 3)
    {        
        flatHouse1 = board[0].squares.flat();
        flatHouse2 = board[3].squares.flat();
        flatHouse3 = board[6].squares.flat();
    }

    // column spans center houses 1, 4, & 7
    else if(colIndex < 6)
    {
        flatHouse1 = board[1].squares.flat();
        flatHouse2 = board[4].squares.flat();
        flatHouse3 = board[7].squares.flat();
    }

    // column spans right-side houses 2, 5, & 8
    else // colIndex < 9  
    {
        flatHouse1 = board[2].squares.flat();
        flatHouse2 = board[5].squares.flat();
        flatHouse3 = board[8].squares.flat();
    }

    // ! non-null assertion because I was getting the error: 
    // "Variable '...' is used before being assigned"
    flatHouseConcat = flatHouse1!.concat(flatHouse2!, flatHouse3!);
    
    targetCol = flatHouseConcat.filter( (sq, i) => 
    {
        // mod operator used to get column regardless of whether it's in 
        // in left-side, center, or right-side houses
        if( i % 3 === colIndex % 3 ) return sq;
    });

    // check if all squares are unique
    // first sort the array 
    targetCol.sort( (a, b) => { return parseInt(a.props.value) - parseInt(b.props.value) } );
    
    // then ensure only one of each digit is included
    return targetCol.every( (sq, i) => { return parseInt(sq.props.value) === (i+1) } );
}