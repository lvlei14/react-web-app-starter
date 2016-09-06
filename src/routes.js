import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import requireAuthentication from './lib/requireAuthentication';

import App from './containers/App';
import {
  Home,
  About,
  Register,
  Login,
} from './containers';


export default (
  <Router history={hashHistory}>
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="/" component={requireAuthentication(App)}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
    </Route>
  </Router>
)
