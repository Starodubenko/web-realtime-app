import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client';
import moment from 'moment';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const socket = io.connect('http://localhost:8181');

class App extends Component {

  state = {
    timeseries: [
      {name: 1514841375178, value: 84},
      {name: 1514841376177, value: 11},
      {name: 1514841377177, value: 32},
      {name: 1514841378177, value: 77},
      {name: 1514841379174, value: 41},
      {name: 1514841380174, value: 16},
      {name: 1514841381174, value: 66},
      {name: 1514841382173, value: 30},
      {name: 1514841383174, value: 78},
      {name: 1514841384174, value: 78},
    ]
  }

  componentDidMount() {
    socket.on('newTimeseriesValue', (data) => {
      const newVal = data.new_val;
      const updatedTimeseries = [...this.state.timeseries];
      updatedTimeseries.push({name: newVal.timestamp, value: newVal.value});
      this.setState({
        timeseries: updatedTimeseries,
      })

      console.log(newVal);
    });
  }

  timeFormatter = value => moment(value).format("DD/MM/YYYY");

  render() {
    console.log(this.state.timeseries);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="Chart">
          <LineChart 
            width={730} 
            height={250} 
            data={this.state.timeseries}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              allowDataOverflow
              tickFormatter={this.timeFormatter}
            />
            <YAxis />
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
          </LineChart>
        </div>
      </div>
    );
  }
}

export default App;
