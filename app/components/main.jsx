import React, { Component } from 'react';
import axios from 'axios';

import { socket } from '../sockets/index';

import './main.css';

import StockChart from './stockChart';
import Interface from './interface';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };

    this.getData = this.getData.bind(this);
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

    symbols.map(async symbol => {
      const postData = { symbol };

      const { data } = await instance({
        method: 'post',
        url,
        data: postData
      });

      this.setState({ data: [...this.state.data, data] });
    });
  }

  render() {
    return (
      <div className='main'>
        <StockChart data={ this.state.data } />
        <Interface />
      </div>
    );
  }
}

export default Main;
