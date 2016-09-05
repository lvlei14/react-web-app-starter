import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/App';
import {
  Home,
  About,
  Register
} from './containers';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/register" component={Register} />
      <Route path="about" component={About} />
    </Route>
  </Router>
)
