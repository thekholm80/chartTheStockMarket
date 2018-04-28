import React, { Component } from 'react';
import { Well, ButtonGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

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

  addSymbol(e) {
    e.preventDefault();
    socket.emit('add', this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  render() {
    const tooltip = (
      <Tooltip id='tooltip'>Click to remove from chart</Tooltip>
    );
    const buttons = this.props.symbols.map(symbol => (
      <OverlayTrigger placement="top" overlay={ tooltip } key={ symbol }>
        <Button onClick={ () => this.props.remove(symbol) }>{ symbol }</Button>
      </OverlayTrigger>
    ));
    return (
      <Well className='interface'>
        <form>
          <input type='text' value={ this.state.inputValue } placeholder='Add a symbol' onChange={ this.updateInput } />
          <Button onClick={ this.addSymbol }>Submit</Button>
        </form>
        <ButtonGroup>
          { buttons }
        </ButtonGroup>
      </Well>
    );
  }
}

export default Interface;
