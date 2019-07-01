import React from 'react';
import './App.css';

import { validatValueMoney } from './utils/validate'
import { convertValueMoney } from './utils/converter'

export default class CheckboxWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputVal: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const validatedValue = validatValueMoney(this.state.inputVal);
    if (validatedValue.text === 'valid') {
      const resultDenominal = convertValueMoney(validatedValue.value);
      this.setState({ message: resultDenominal.join(', ') });
    } else {
      this.setState({ message: validatedValue.text });
    }
  }

  render() {
    return (
      <div>
        <h1 className="title">Enter Nominal Money</h1>
        <form id="formSubmit" className="formSubmit" onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="inputPrice"
            className="inputPrice"
            onChange={this.handleChange}
            value={this.state.inputVal}
          />
          <input
            type="submit"
            id="submitPrice"
            className="submitPrice"
          />
        </form>
        <span id="messageView" className="messageView">{this.state.message}</span>
      </div>
    );
  }
}