import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

import drawChart from '../util/dataCleaner';

import './stockChart.css';

class StockChart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: null, context: null };

    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    const ref = ReactDOM.findDOMNode(this.refs.chart);
    const context = ref.getContext('2d');
    this.setState({ context: context }, () => this.draw());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: drawChart(nextProps.data) }, () => this.draw());
  }

  draw() {
    const chart = new Chart(this.state.context, this.state.data);
  }

  render() {
    return (
      <div className='stockChart'>
        <canvas ref='chart' />
      </div>
    );
  }
}

export default StockChart;