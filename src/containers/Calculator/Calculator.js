import React, { Component } from 'react';
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
        equalityPress: false
    }
  }
  render() {
    return (
      <div className={ classes.Calculator }>
          <Header />
          <Display />
          <Buttons />
      </div>
    );
  }
}

export default Calculator;
