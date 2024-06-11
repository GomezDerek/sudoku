//Hover effect ripped from https://usehooks-ts.com/react-hook/use-hover
//downloaded usehooks-ts from https://www.npmjs.com/package/usehooks-ts

import { useState } from 'react';
import { SquareIndices } from './Sudoku';
import { Style, StyleSet } from './Css'; // I WROTE THIS HEHEHEHE

import './App.css';

type Props = {
    value: string,
    handleClick: ()=>void,
    selected: boolean,
    locked: boolean,
    handleChange: (s: string, ss: SquareIndices) => void,
    index: SquareIndices
};

export default function Square(props: Props) { 
    
    const [style, setStyle] = useState<Style>(StyleSet.defaultStyle);
    const [clicked, setClicked] = useState<boolean>(props.selected);

    const handleMouseEnter = () => {
        setStyle(clicked? style: StyleSet.highlightStyle);
    }
    const handleMouseLeave = () => {
        setStyle(clicked? style: StyleSet.defaultStyle);
    }

    const handleClick = ()=> {
        if(!clicked) {
            setStyle(StyleSet.highlightStyle);//toggle the highlight when being clicked WHILE the mouse hovers
            setClicked(true);
        }
        else { //clicked
            setStyle(StyleSet.unclickedStyle);
            setClicked(false);
        }
        //this function calls Sudoku.setSelected()
        props.handleClick();
        
        let x = document.getElementsByClassName('Square')[0];
        console.log(window.getComputedStyle(x!).borderWidth);
    }
 
    return (
        <div className="Square"
            style={style}
            onMouseEnter={ props.locked ? undefined : handleMouseEnter }
            onMouseLeave={ props.locked ? undefined: handleMouseLeave }
            onClick={ props.locked ? undefined : handleClick }
        >
        {/* when Square is locked, use <ul>; when unlocked, use <input> */}
            <ul 
                style={ props.locked ? StyleSet.lockedColor : {display: 'none'} }
            >
                {props.value}
            </ul>

            <input
                style={ props.locked ? {display: 'none'} : {} }
                value={ props.value }
                disabled={false}

                // will update Sudoku.setSelected which updates props.value
                onKeyDown={ e => 
                {
                    props.handleChange(e.key, props.index);
                }} 
                onChange={ ()=>console.log(`this onChange only works for backspace, but not char input for some reason`) }
                
                type="text"
                maxLength={1}
            > 
            </input>
        </div>
    );
}