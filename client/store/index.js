import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import setupSocket from '../sockets';
import WSService from '../sockets';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,
  composeEnhancers(
  applyMiddleware(
    thunk,
  ))
);

WSService.dispatch = store.dispatch;

export default store;
