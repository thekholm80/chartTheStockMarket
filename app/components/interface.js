import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

import './interface.css';

class Interface extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '' }

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <Well className='interface'>
        
      </Well>
    )
  }
}

export default Interface;
