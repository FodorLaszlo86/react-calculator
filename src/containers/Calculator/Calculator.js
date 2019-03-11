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
        currentEl: '0',
        operator: '',
        equalityPressed: false
    }
  }

  handleCalculator = (e) => {
    const btnVal = e.target.textContent;

    switch(btnVal !== undefined) {


      case (/\.|[0-9]/.test(btnVal)):
        this.buildNumber(btnVal);
        break;

      case (/=/.test(btnVal)):
        this.handleEqualityPress();
        break;

      case (/^\/$/).test(btnVal): 
        console.log('divide et impera');
        break;
      
      case ((/%/.test(btnVal) || /√/.test(btnVal) || /1\/x/.test(btnVal) || /^[+/-]/.test(btnVal)) 
            && this.isValidNumber(this.state.currentEl)):
        this.handleNumTransformOp(btnVal);
        break;
       
      case (/^C$/.test(btnVal) || /^CE$/.test(btnVal) || /^MC$/.test(btnVal)):
        this.handleClearDisplays(btnVal);
        break;

      default: 
        console.log('U hit the End of Switch Statement!');
    }
  }

  buildExpression = () => {


  }


  buildNumber = digit => {
    
    if(this.state.currentEl === '0' && digit === '.') {
      this.setState({
        currentEl: this.state.currentEl + digit
      })
    }

    else if (this.state.currentEl === '0' && /[0-9]/.test(digit)) {
      this.setState({
        currentEl: digit
      })
    }

    else if(this.state.currentEl !== '0' && this.state.currentEl !== undefined) {
      this.buildNumberHelper(digit);
    }
  }

  buildNumberHelper = digit => {

    const isDotIncluded = this.state.currentEl.includes('.');

    if(!isDotIncluded && digit === '.') {
      this.setState({
        currentEl: this.state.currentEl + digit
      })
    } 

    else if(!isDotIncluded && /[0-9]/.test(digit)) {
      this.setState({
        currentEl: this.state.currentEl + digit
      })
    }

    else if(isDotIncluded && digit === '.') {
      this.setState({
        currentEl: this.state.currentEl
      })
    }

    else if(isDotIncluded && /[0-9]/.test(digit)) {
      this.setState({
        currentEl: this.state.currentEl + digit
      })
    }
  }



  onlyOneDotCheck = (number, nextChar) => !number.includes('.') && nextChar === '.' ? number + nextChar : number;


  handleNumTransformOp = operand => {
    if(/%/.test(operand)) {
      this.setState({
        currentEl: this.getPercent(this.state.currentEl)
      })
    } 
    else if (/√/.test(operand)) {
      if(+this.state.currentEl >= 0) {
        this.setState({
          currentEl: this.getSqrt(this.state.currentEl)
        })
      } else {
        this.setState({
          currentEl: 'ERROR'
        })
      }
    }
    else if(/1\/x/.test(operand)) {
      this.setState({
        currentEl: this.getFraction(this.state.currentEl)
      })
    }
    else if(operand === '+/-') {
      this.setState({
        currentEl: (this.state.currentEl * -1).toString()
      });
    }
  }

  handleClearDisplays = btn => {
    if(/^C$/.test(btn)) {
      this.clearMainDisplay();
    }
    else if(/^CE$/.test(btn)) {
      this.resetCalculator();
    }
    else if(/^MC$/.test(btn)) {
      this.clearMemory();
    }
  }

  handleEqualityPress = () => {
    this.setState({
      currentEl: this.getResult(this.state.formula),
      equalityPressed: true,
      memory: this.getResult(this.state.formula),
      formula: []
    });
  }

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

  getResult = (exp) => math.eval(exp.join(' '));

  getFraction = number => {
    if(number !== '0') {
      return 1 / Number(number);
    } else {
      return 'NaN'
    }
  }

  getSqrt = number => math.sqrt(number).toString();

  getPercent = number => (number / 100).toString();

  isValidNumber = number => /^[+-.]?[0-9]{1,}(?:\.[0-9]{1,})?$/.test(number);

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
