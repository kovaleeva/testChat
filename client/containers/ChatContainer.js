import { connect } from "react-redux";
import { sendMessage } from "../actions/index";
import Chat from "../components/Chat";

const mapDispatchToProps = dispatch => ({
  onSendMessage: message => dispatch(sendMessage(message))
});

const mapStateToProps = state => ({
  messages: state.messages.messages,
  socket: state.auth.socket,
  user: state.auth.user,
});

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;
