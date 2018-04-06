import actionTypes from "../actions/actionTypes";
import Cookies from "universal-cookie";
import WSService from "../sockets";

const inititialState = {
  user: {},
  socket: {}
};

const cookies = new Cookies();

const auth = (state = inititialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER: {
      if (action.token) {
        cookies.set("token", action.token);

        WSService.init(action.user);

        return {
          ...state,
          token: action.token,
          user: action.user,
        };
      }
      return state;
    }
    case actionTypes.LOGOUT_USER: {
      WSService.close();
      return {
        user: {},
        socket: {}
      };
    }
    case (actionTypes.MUTE_USER): {
      const { user } = action;

      return {
        ...state,
        user: {...state.user, mute: !state.user.mute}
      }
    }
    case (actionTypes.UNMUTE_USER): {
      const { user } = action;

      return {
        ...state,
        user: {...state.user, mute: !state.user.mute}
      }
    }
    default:
      return state;
  }
};

export const socket = state => {
  console.log(state);


  // state.auth.socket
};

export default auth;
