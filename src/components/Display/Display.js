import React from 'react';
import classes from './Display.css';


const display = ({ formula, memory, currentEl }) => (
    <div className={ classes.CalcDisplay }>
        <div className={ classes.SecondaryDisplay }>
            <div className={ classes.MemoryDisplay }>
                { memory !== '' ? `M: ${ memory }` : null }
            </div>
            <div className={ classes.ProcessDisplay }>
                { formula.length > 0 ? formula.join(' ') : null }
            </div>
        </div>
        <div id="display" className={ classes.MainDisplay }>
            { currentEl === '' ? '0' : currentEl }
        </div>
    </div>
)

export default display;