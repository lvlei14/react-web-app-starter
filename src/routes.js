import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import {
  Home,
  About,
} from './containers';

export default class Routers extends Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="about/:id" component={About} />
        </Route>
      </Router>
    )
  }
}
