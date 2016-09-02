import React from 'react';
import ReactDOM from 'react-dom';
import { history } from './services';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootSaga from './sagas';


const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

ReactDOM.render(
  <MuiThemeProvider>
    <Root
      store={store}
      history={history}
      routes={routes} />
  </MuiThemeProvider>,
  document.getElementById('root')
);
