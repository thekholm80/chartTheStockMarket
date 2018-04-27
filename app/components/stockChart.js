import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// const LineChart = require("react-chartjs").Line;
import Chart from 'chart.js';

import drawChart from '../util/dataCleaner';

import './stockChart.css';

class StockChart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: null, context: null }

    this.draw = this.draw.bind(this);
  }

  draw() {
    const chart = new Chart(this.state.context, this.state.data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: drawChart(nextProps.data) }, () => this.draw());
  }

  componentDidMount() {
    const ref = ReactDOM.findDOMNode(this.refs.chart);
    const context = ref.getContext('2d');
    this.setState({ context: context }, () => this.draw());
  }

  render() {
    return (
      <div className='stockChart'>
        <canvas ref='chart' />
      </div>
    )
  }
}

export default StockChart;
