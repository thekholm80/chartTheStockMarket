import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

import './interface.css';

import { socket } from '../sockets/index';

class Interface extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '' };

    this.updateInput = this.updateInput.bind(this);
    this.addSymbol = this.addSymbol.bind(this);
  }

  updateInput(event) {
    this.setState({ inputValue: event.target.value });
  }

  addSymbol() {
    socket.emit('add', this.state.inputValue);
  }

  render() {
    return (
      <Well className='interface'>
        <input type='text' value={ this.state.inputValue } placeholder='Add a symbol' onChange={ this.updateInput } />
        <button onClick={ this.addSymbol }>Submit</button>
      </Well>
    );
  }
}

export default Interface;
