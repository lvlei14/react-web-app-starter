import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';
import {
  Home,
  About,
  Register,
  Login,
} from './containers';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="about" component={About} />
    </Route>
  </Router>
)
