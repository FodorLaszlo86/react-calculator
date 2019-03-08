import React from 'react';
import classes from './Display.css';


const display = ({ displayFormula, displayMemory, displayCurrent }) => {
    return (
        <div className={ classes.CalcDisplay }>
            <div className={ classes.SecondaryDisplay }>
                <div className={ classes.MemoryDisplay }>
                    { displayMemory }
                </div>
                <div className={ classes.ProcessDisplay }>
                    { displayFormula }
                </div>
            </div>
            <div id="display" className={ classes.MainDisplay }>
                { displayCurrent }
            </div>
        </div>
    )
    
}

export default display;