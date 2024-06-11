//this file was created to facilitate the use of CSS within Typescript

//these are called type aliases. They leverage string literals
export type ColorHex = `#${string}`;
export type CssUnit = `${string}px` | `${string}em`;

export type Style = {
    color?: string | ColorHex;
    borderColor?: string | ColorHex;
    borderWidth?: CssUnit;
    margin?: CssUnit;
    zIndex?: number | 'auto';
}

const defaultStyle: Style = {
    color: 'white',
    // borderColor: '#555',
    // borderWidth: '1px',
    // margin: '0px',
    zIndex: 'auto'
};

const highlightStyle: Style = {
    color: 'cyan',
    // borderColor: 'cyan',
    // borderWidth:'2px',
    // margin: '-1px',
    zIndex: 1
};

const unclickedStyle: Style = {
    color: 'electric blue',
    borderColor: 'electric blue'
};

const lockedColor: Style = {
    color: `#AAA`
}

export const StyleSet = { defaultStyle, highlightStyle, unclickedStyle, lockedColor };