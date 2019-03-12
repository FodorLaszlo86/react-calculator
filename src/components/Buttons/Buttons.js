import React from 'react';
import classes from './Buttons.css';
//import './Buttons.css'

const btnValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                   '=', '+', '-', '/', '*', '.', '+/-', '%', '√', 'FR',
                   'C', 'CE', 'MC'];

const btnIDs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
                'seven', 'eight', 'nine', 'equals', 'add', 'subtract', 'divide', 'multiply', 'decimal', 'opp',
                'percent', 'sqrt', 'fraction' ,'clear', 'clearAll', 'memory-clear'];

const buttons = ({ handleCalculator }) => {
    const btnClasses = Object.values(classes);
    const btnClassesSliced = btnClasses.slice(2, btnClasses.length);
    const allBtn = btnValues.map((btn, i) => {
    return (
        <div 
            key={ `Btn-${ btnIDs[i] }` } 
            id={ btnIDs[i] }
            className={ `${ classes.Button } ${ btnClassesSliced[i] }` }
            onClick={ handleCalculator }
            >
            { btn }
        </div>
    )
    }
                   
                    )
    return (
       <div className={ classes.CalcKeyBoard }>
           { allBtn }
       </div>
    )
}

export default buttons;