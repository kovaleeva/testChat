import React, { Component } from "react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Message: {
        message: ""
      },
    }
  }

  handleSendMessage() {
    if (this.state.Message.message.length > 0) {
      this.props.onSendMessage(
        {
          message: this.state.Message.message,
          login: this.props.user.login,
          loginID: this.props.user.id
        });
      this.setState({
        Message: { message: "" }
      });
    }
  }

  handleChange(value) {
    this.setState({
      Message: { message: value }
    });
  }

  render() {
    const { messages, user } = this.props;

    let formatTime = () => {
      let hh = new Date().getHours(),
        mm = new Date().getMinutes(),
        ss = new Date().getSeconds();

      return `${hh}:${mm}:${ss}`;
    };


    return (
      <div className="chat">
        <ul className="messages">
          {messages &&
            messages.map(message => (
              <li
                className="message"
                key={message.id}
              // style={{ backgroundColor: `${message.color}`, color: '#fff' }}
              >
                <div className="message-info col-3">
                  {/* <div> {message.login} </div> */}
                  {/* <div> {message.time} </div> */}
                  <div> {message.login} </div>
                  <div> {formatTime(message.createdAt)} </div>
                </div>
                <div className="message-content col-9"> {message.message} </div>
              </li>
            ))}
        </ul>
        <div
          className="form-inline messageForm"
          name="publish"
        >
          {
            // this.props.user.mute ? (
            //   <h1 className='ban'>Mute</h1>
            // ) : (
                [
                <textarea
                  disabled={this.props.user.mute}
                  type="text"
                  className="user-message-textarea form-control mr-sm-2 mb-sm-0"
                  id="inlineFormInput"
                  placeholder="Message"
                  maxLength="200"
                  name="message"
                  value={this.state.Message.message}
                  onChange={event => this.handleChange(event.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      this.handleSendMessage();
                    };
                  }}
                />,
                <button
                  className="btn user-msg-button"
                  disabled={this.props.user.mute}
                  onClick={() => this.handleSendMessage()}
                >
                  <i className="fa fa-arrow-alt-circle-up" aria-hidden="true" />
                </button>
                ]
              // )
          }
        </div>
      </div>
    );
  }
}

export default Chat;
