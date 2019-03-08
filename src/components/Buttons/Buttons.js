import React from 'react';
import classes from './Buttons.css';
//import './Buttons.css'

const btnValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                   '=', '+', '-', '/', '*', '.', '+/-', '%', '√', '1/x',
                   'C', 'CE', 'MR', 'MS', 'MC', 'M+', 'M-'];
const btnIDs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
                'seven', 'eight', 'nine', 'equals', 'add', 'subtract', 'divide', 'multiply', 'decimal', 'opp',
                'percent', 'sqrt', 'fraction' ,'clear', 'clearAll', 'memory-recall', 'memory-save', 'memory-clear', 'memory-add', 'memory-substract']

const buttons = ({ handleCalculator }) => {
    const btnClasses = Object.values(classes).slice(2, -1);
    const allBtn = btnValues.map((btn, i) => {
    return (
        <div 
            key={ `Btn-${ btnIDs[i] }` } 
            id={ btnIDs[i] }
            className={ `${ classes.Button } ${ btnClasses[i] }` }
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