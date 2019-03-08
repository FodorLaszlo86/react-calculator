import React, { Component } from 'react';
import classes from './Calculator.css';
import Buttons from '../../components/Buttons/Buttons';
import Display from '../../components/Display/Display';
import Header from '../../components/Header/Header';

/*


*/


class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
        formula: [],
        memory: '',
        currentEl: '',
        result: null,
        equalityPressed: false
    }
  }


  handleCalculator = (e) => {
    const btnVal = e.target.textContent;

    switch (btnVal !== undefined) {

      case /\.|[0-9]/.test(btnVal):
        this.buildNumber(btnVal);
        break;

      case /^C$/.test(btnVal):
        this.clearMainDisplay();
        break;

      case /^CE$/.test(btnVal):
        this.resetCalculator();
        console.log('State after reset', this.state);
        break;

      default:
        console.log('End of Switch statement')
    }
  }

  buildNumber = async (char) => {
    let oldNumber = this.state.currentEl;
    let updatedNumber;
    if(oldNumber.includes('.') && char === '.') {
      updatedNumber = oldNumber;
    } 
    else if(oldNumber.startsWith('0') && char === '0') {
      updatedNumber = oldNumber.slice(1, -1);
    }
    else {
      updatedNumber = oldNumber + char;
    }
    await this.setState({
      currentEl: updatedNumber
    })
    console.log('State after buildnumber', this.state);
  }

  clearMainDisplay = () => {
    this.setState({
      currentEl: ''
    })
  }

  resetCalculator = () => {
      this.setState({
        formula: [],
        memory: '',
        currentEl: '',
        result: null,
        equalityPressed: false
      })
  }

  render() {
    const { formula, memory, currentEl } = this.state;
    return (
      <div className={ classes.Calculator }>
          <Header />
          <Display 
              displayFormula={ formula.length > 0 ? formula.join(' ') : '' } 
              displayMemory={ memory !== '' ? `M: ${ memory }` : '' } 
              displayCurrent={ currentEl === '' ? '0' : currentEl } 
          />
          <Buttons handleCalculator={ this.handleCalculator } />
      </div>
    );
  }
}

export default Calculator;
