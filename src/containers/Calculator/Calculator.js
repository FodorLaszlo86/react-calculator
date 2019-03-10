import React, { Component } from 'react';
import * as math from 'mathjs';
import classes from './Calculator.css';
import Buttons from '../../components/Buttons/Buttons';
import Display from '../../components/Display/Display';
import Header from '../../components/Header/Header';




class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
        formula: ['33.56', '/', '12'],
        memory: '12.555',
        currentEl: '-33.063',
        operator: '',
        equalityPressed: false
    }
  }

  handleCalculator = (e) => {
    const btnVal = e.target.textContent;

    switch(btnVal !== undefined) {


      case (/=/.test(btnVal)):
       console.log(this.getResult(this.state.formula));
       break;
       
      case (/^C$/.test(btnVal)):
        this.clearMainDisplay();
        break;
      case (/^CE$/.test(btnVal)):
        this.resetCalculator();
        break;

      case (/^MC$/.test(btnVal)):
        this.clearMemory();
        break;

      default: 
        console.log('U hit the End of Switch Statement!');


    }
  }

  getResult = (exp) => math.eval(exp.join(' '));

  clearMainDisplay = () => {
    this.setState({
      currentEl: '0'
    })
  }


  resetCalculator = () => {
      this.setState({
        formula: [],
        memory: '',
        currentEl: '0',
        equalityPressed: false,
        operator: ''
      })
  }

  clearMemory = () => {
    this.setState({
      memory: ''
    })
  }

  render() {
    const { formula, memory, currentEl, result } = this.state;
    return (
      <div className={ classes.Calculator }>
          <Header />
          <Display 
              displayFormula={ formula.length > 0 ? formula.join(' ') : '' } 
              displayMemory={ memory !== '' ? `M: ${ memory }` : '' } 
              displayCurrent={ currentEl } 
              result={ result }
          />
          <Buttons handleCalculator={ this.handleCalculator } />
      </div>
    );
  }
}

export default Calculator;
