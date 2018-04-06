import React, { Component } from "react";
import { Link } from "react-router-dom";

class UsersList extends Component {

  constructor(props) {
    super(props);

    this.state = {usersOnline: []};

    props.onFetchUserList();
  }

  componentWillReceiveProps(nextProp) {
    const {usersOnline: users = []} = nextProp;
    const {user: authUser} = this.props;
    const usersOnline = users.filter(user => user.id !== authUser.id);

    this.setState({usersOnline});
  }

  handleMute(user) {
    this.props.onMute(user);
  }

  handleBan(user) {
    this.props.onBan(user);
  }

  render() {
    const { user } = this.props;
    const {usersOnline} = this.state;

    return (
      <section className="users">
        <ul>
          {usersOnline &&
            usersOnline.map(item => (
              <li key={item.id}>
                {item.login}
                <span
                  id="adminFeature"
                  style={{ display: this.props.user.admin === 1 ? "inline-block" : "none" }}
                >
                  <button type="button"
                    className="btn btn-user"
                    // onClick={() => this.props.onMute(item)}
                    onClick={() => item.mute ? this.props.onUnMute(item) : this.props.onMute(item)}
                  >
                    {
                      item.mute ? (
                        <i className="fas fa-volume-off" />
                      ) : (<i className="fas fa-volume-up"></i>)
                    }
                  </button>
                  <button type="button"
                    className="btn btn-user"
                    onClick={() => this.handleBan(item)}
                  >
                    <i className="fas fa-ban" />
                  </button>
                </span>
              </li>
            ))}
        </ul>
      </section>
    );
  }
}

export default UsersList;
