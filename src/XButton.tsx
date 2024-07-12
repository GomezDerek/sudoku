import React from 'react';

type Props =
{
    onClick : ()=>void
}

export default function XButton(props: Props)
{
    return(
        <button 
            className="x-button"
            onClick={ () => props.onClick() }
        >
            x
        </button>
    );
}