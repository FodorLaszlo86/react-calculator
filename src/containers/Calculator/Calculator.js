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
        memory: '',
        currentEl: '0',
        equalityPressed: false
    }
  }

  handleCalculator = (e) => {
    const btnVal = e.target.textContent;
    const { currentEl: displayedElement, formula} = this.state;
    const isOperator = this.isOperator(btnVal);

    switch(btnVal !== undefined) {

      case ((this.isOperator(displayedElement) && this.isOperator(btnVal))):
        this.setState({
          currentEl: btnVal
        })
        break;

      case (this.isOperator(displayedElement) && /\.|[0-9]/.test(btnVal)):
        this.buildExpression(btnVal);
        break;

      case (/\.|[0-9]/.test(btnVal) && /\.|[0-9]/.test(displayedElement)):
        this.buildNumber(btnVal);
        break;

      case (isOperator):
        this.handleOperatorPress(btnVal, displayedElement);
        break;
    
      case (/=/.test(btnVal)):
        let newExpression = formula;
        newExpression.push(displayedElement);
        this.handleEqualityPress(newExpression);
        break;
      
      case ((/%/.test(btnVal) || /√/.test(btnVal) || /FR/.test(btnVal) || btnVal === '+/-') 
            && this.isValidNumber(displayedElement)):
        this.handleNumTransformOp(btnVal);
        break;
       
      case (/^C$/.test(btnVal) || /^CE$/.test(btnVal) || /^MC$/.test(btnVal)):
        this.handleClearDisplays(btnVal);
        break;

      default: 
        this.setState({
          currentEl: btnVal
        })
    }
  }

  buildExpression = btn => {
    let newExpAfterOp = this.state.formula;
    if(btn !== this.state.currentEl) {
      newExpAfterOp.slice(0, -1);
      newExpAfterOp.push(this.state.currentEl);
    }
    this.setState({
      formula: newExpAfterOp,
      currentEl: btn
    });
  }

  handleOperatorPress = (btn, element) => {
    let updatedExpression = this.state.formula;
        updatedExpression.push(element);
        this.setState({
          formula: updatedExpression,
          currentEl: btn
        })
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
    console.log(operand);
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
    else if(/FR/.test(operand)) {
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

  handleEqualityPress = expression => {
    this.setState({
      currentEl: this.getResult(expression).toString(),
      equalityPressed: true,
      memory: this.getResult(expression).toString(),
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

  isOperator = (value) => value === '+' || value === '-' || value === '/' || value === '*';

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
