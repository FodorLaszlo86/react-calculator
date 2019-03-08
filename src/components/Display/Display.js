import React from 'react';
import classes from './Display.css';


const display = (props) => (
    <div className={ classes.CalcDisplay }>
        <div className={ classes.SecondaryDisplay }>
            <div className={ classes.MemoryDisplay }></div>
            <div className={ classes.ProcessDisplay }>3 + 2 - 11</div>
        </div>
        <div id="display" className={ classes.MainDisplay }>0</div>
    </div>
)

export default display;