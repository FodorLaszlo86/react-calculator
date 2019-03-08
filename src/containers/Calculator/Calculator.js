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
        formula: ['33', '*', '12', '+'],
        memory: '2.085',
        currentEl: '13.56',
        result: null,
        equalityPressed: false
    }
  }


  handleCalculator = (e) => {
    const btnVal = e.target.textContent;

    switch (btnVal !== undefined) {
      case btnVal === 'CE':
        this.resetCalculator();
        break;
      default:
        console.log('End of Switch statement')
    }
  }

  resetCalculator = (e) => {
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
              formula={ formula } 
              memory={ memory } 
              currentEl={ currentEl } 
          />
          <Buttons handleCalculator={ this.handleCalculator } />
      </div>
    );
  }
}

export default Calculator;
