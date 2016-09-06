import React from 'react';
import ReactDOM from 'react-dom';
import { history } from './services';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import rootSaga from './sagas';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

export const dispatch = store.dispatch;

ReactDOM.render(
  <MuiThemeProvider>
    <Root
      store={store}
      history={history}
      routes={routes} />
  </MuiThemeProvider>,
  document.getElementById('root')
);
