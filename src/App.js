import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <Link to="/">Home</Link>
          {
            ['react', 'redux', 'immutable.js'].map((elem) => {
              return <Link to={`/about/${elem}?elem=${elem}`} key={elem}>{elem}</Link>;
            })
          }
        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
