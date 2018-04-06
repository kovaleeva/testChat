import React, { Component } from "react";
import Cookies from "universal-cookie";
import Header from "./Header";
import Auth from "./Auth";
import Chat from "./Chat";
import ChatContainer from "../containers/ChatContainer";
import AuthContainer from "../containers/AuthContainer";
import UsersContainer from "../containers/UsersContainer";
// import UsersList from "./UsersList";
import * as actions from "../actions";
import WSService from "../sockets";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header user={this.props.user} socket={this.props.socket} onLogout={this.props.onLogout} />
        {this.props.user && this.props.user.login ? (
          this.props.user.ban ? (<h1 className="ban">Sorry buy (ban)</h1>) : ([
            <ChatContainer />,
            <UsersContainer />
          ])
        ) : (
            <AuthContainer />
          )
        }

      </div>
    );
  }
}

export default App;
