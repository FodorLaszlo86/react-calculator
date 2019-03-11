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
        formula: [],
        memory: '12.555',
        currentEl: '0',
        operator: '',
        equalityPressed: false
    }
  }

  isOperator = (value) => value === '+' || value === '-' || value === '/' || value === '*';

  handleCalculator = (e) => {
    const btnVal = e.target.textContent;
    const { currentEl: displayedElement, formula } = this.state;
    const isOperator = this.isOperator(btnVal);

    switch(btnVal !== undefined) {


      case ((this.isOperator(displayedElement) && this.isOperator(btnVal))):
        this.setState({
          currentEl: btnVal
        })
        break;
      // in case the currentEl is an OPERATOR and btnVal is a number
      case (this.isOperator(displayedElement) && /\.|[0-9]/.test(btnVal)):
        let newExpAfterOp = this.state.formula;
        if(btnVal !== displayedElement) {
          newExpAfterOp.slice(0, -1);
          newExpAfterOp.push(displayedElement);
        }
        this.setState({
          formula: newExpAfterOp,
          currentEl: btnVal
        });
        break;

      case (/\.|[0-9]/.test(btnVal) && /\.|[0-9]/.test(displayedElement)):
        this.buildNumber(btnVal);
        break;

      case (isOperator):
        // let isCurrentOperator = this.state.currentEl;
        let updatedExpression = this.state.formula;
        updatedExpression.push(displayedElement);
        this.setState({
          formula: updatedExpression,
          currentEl: btnVal
        })
        break;

      case (/=/.test(btnVal)):
        let newExpression = formula;
        newExpression.push(displayedElement);
        this.handleEqualityPress(newExpression);
        break;

      
      
      case ((/%/.test(btnVal) || /√/.test(btnVal) || /1\/x/.test(btnVal) || btnVal === '+/-') 
            && this.isValidNumber(displayedElement)):
        this.handleNumTransformOp(btnVal);
        break;
       
      case (/^C$/.test(btnVal) || /^CE$/.test(btnVal) || /^MC$/.test(btnVal)):
        this.handleClearDisplays(btnVal);
        break;

      default: 
        console.log('U hit the End of Switch Statement!');
    }
  }

  buildExpression = (btn) => {
    
  }


  buildNumber = digit => {
    const { currentEl } = this.state; 
    
    if(currentEl === '0' && digit === '.') {
      this.setState({
        currentEl: currentEl + digit
      })
    }

    else if (currentEl === '0' && /[0-9]/.test(digit)) {
      this.setState({
        currentEl: digit
      })
    }

    else if(currentEl !== '0' && currentEl !== undefined) {
      this.buildNumberHelper(digit);
    }
  }

  buildNumberHelper = digit => {
    const { currentEl } = this.state;

    const isDotIncluded = currentEl.includes('.');

    if(!isDotIncluded && digit === '.') {
      this.setState({
        currentEl: currentEl + digit
      })
    } 

    else if(!isDotIncluded && /[0-9]/.test(digit)) {
      this.setState({
        currentEl: currentEl + digit
      })
    }

    else if(isDotIncluded && digit === '.') {
      this.setState({
        currentEl: currentEl
      })
    }

    else if(isDotIncluded && /[0-9]/.test(digit)) {
      this.setState({
        currentEl: currentEl + digit
      })
    }
  }

  onlyOneDotCheck = (number, nextChar) => !number.includes('.') && nextChar === '.' ? number + nextChar : number;


  handleNumTransformOp = operand => {
    const { currentEl } = this.state;
    if(/%/.test(operand)) {
      this.setState({
        currentEl: this.getPercent(currentEl)
      })
    } 
    else if (/√/.test(operand)) {
      if(+currentEl >= 0) {
        this.setState({
          currentEl: this.getSqrt(currentEl)
        })
      } else {
        this.setState({
          currentEl: 'ERROR'
        })
      }
    }
    else if(/1\/x/.test(operand)) {
      let oldElement = currentEl;
      let newElement = this.getFraction(oldElement);
      this.setState({
        currentEl: newElement
      })
    }
    else if(operand === '+/-') {
      this.setState({
        currentEl: (currentEl * -1).toString()
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

  handleEqualityPress = (expression) => {
    this.setState({
      currentEl: this.getResult(expression),
      equalityPressed: true,
      memory: this.getResult(expression),
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
      return (1 / Number(number)).toString();
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
