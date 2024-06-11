import React from 'react';
import './App.css';
import { HouseType } from './Sudoku';

type Props = {
    house: HouseType
}

export default function House( props: Props ) {
    return (
        <div className="House" key={0}>
            <div className="Square-Row">  
                {props.house.squares[0]}
            </div>
            <div className="Square-Row" key={1}>
                {props.house.squares[1]}
            </div>
            <div className="Square-Row" key={2}>
                {props.house.squares[2]}
            </div>
        </div>
    );
}