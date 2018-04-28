import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

import { socket } from '../sockets/index';

import './main.css';

import StockChart from './stockChart';
import Interface from './interface';

class Main extends Component {
  static remove(symbol) {
    socket.emit('remove', symbol);
  }

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      symbols: [],
      error: false
    };

    this.getData = this.getData.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    // connection event
    socket.on('connect', () => {
      const cb = list => this.getData(list);
      // gets current list of stock symbols
      socket.emit('subscribe', cb);
    });

    // handle 'update' events sent by server
    // have to 'reset' data before updating to avoid dups
    socket.on('update', newList => {
      this.setState({ data: [] }, () => {
        this.getData(newList);
      });
    });
  }

  getData(symbols) {
    const url = '/api/getstocklist';
    const instance = axios.create({
      baseURL: 'http://localhost:3000/',
      headers: { type: 'application/x-www-form-urlencoded' }
    });
    this.setState({ symbols });
    symbols.map(async symbol => {
      const postData = { symbol };
      const { data } = await instance({
        method: 'post',
        url,
        data: postData
      });
      if (Object.prototype.hasOwnProperty.call(data, 'Error Message') || !data.status === 200) {
        // this will cause the error modal to be displayed
        this.setState({ error: true });
      } else {
        // I think this is what's causing my race condtion & error
        // need to find a way to complete all of the api calls before
        // calling setState()
        this.setState({ data: [...this.state.data, data.data] });
      }
    });
  }

  hideModal() {
    this.setState({ error: false });
  }

  render() {
    return (
      <div className='main'>
        <Modal show={ this.state.error } onHide={ this.hideModal }>
          <Modal.Header closeButton>
            <Modal.Title>Something went wrong</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please try refreshing the page</h4>
            <p>If you continue to see this error, something is seriously wrong.</p>
            <p>I hope you didn&apos;t really want to see what&apos;s on this page.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.hideModal }>Close</Button>
          </Modal.Footer>
        </Modal>
        <StockChart data={ this.state.data } />
        <Interface symbols={ this.state.symbols } remove={ this.remove } />
      </div>
    );
  }
}

export default Main;
