import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { browserHistory } from 'react-router';
import AppContainer from './containers/AppContainer';

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('#root'),
); 