import React, {ReactNode} from 'react';

type Props = {
    value: ReactNode;
};

export default function InputPad(handleClick : Props) {
    return (
        <div className='Input-Pad'>
            <div>
                <button onClick={() => handleClick}>1</button>
                <button onClick={() => handleClick}>2</button>
                <button onClick={() => handleClick}>3</button>
                <br/>
                <button onClick={() => handleClick}>4</button>
                <button onClick={() => handleClick}>5</button>
                <button onClick={() => handleClick}>6</button>
                <br/>
                <button onClick={() => handleClick}>7</button>
                <button onClick={() => handleClick}>8</button>
                <button onClick={() => handleClick}>9</button>
            </div>
                <button className='Clear' onClick={() => handleClick}>clear</button>
                <div className='Arrows'>
                    <button onClick={() => handleClick}>🡸</button>
                    <button onClick={() => handleClick}>🡺</button>
                </div>
        </div>
    )
}