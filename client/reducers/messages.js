import actionTypes from '../actions/actionTypes';
import WSServer from '../sockets';
const inititialState = {
  messages: []
};

const messages = (state = inititialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_MESSAGES):
    console.log(state.messages);
      return {
        ...state,
        messages: [...state.messages, action.messages],
      };
    case (actionTypes.SEND_MESSAGE): {
      const {message} = action;
      WSServer.send(
        actionTypes.SEND_MESSAGE,
        message
      );
      return state;
    }

    default:
      return state;
  }
};

export default messages;