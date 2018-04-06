import actionTypes from '../actions/actionTypes';
import WSServer from '../sockets';

const inititialState = {
  usersOnline: []
};

const users = (state = inititialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_ONLINE):
      return {
        ...state,
        usersOnline: [...action.usersOnline],
      };
    case (actionTypes.FETCH_USER_LIST):
      return {
        ...state,
        usersOnline: [...action.usersOnline],
      };
    case (actionTypes.BAN_USER): {
      const { user } = action;
      WSServer.send(
        actionTypes.BAN_USER,
        user
      );
      return {
        ...state,
        user
      }     
    }
    case (actionTypes.FETCH_MUTE_USER): {
      const { user } = action;
      WSServer.send(
        actionTypes.FETCH_MUTE_USER,
        user
      );      
    }
    default:
      return state;
  }
};

export default users;