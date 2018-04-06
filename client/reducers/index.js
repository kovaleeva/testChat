import {
  combineReducers,
} from 'redux';

import auth from './auth';
import messages from './messages';
import users from './users';

const reducers = combineReducers({
  auth,
  messages,
  users
});

export default reducers;
