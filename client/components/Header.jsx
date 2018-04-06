import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    this.props.onLogout(this.props.user);
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <nav className="navbar nav-side-menu navbar-expand-lg navbar-dark bg-dark user-nav">
          <a className="navbar-brand user-brand" href="#">
            Chat
          </a>
          <span className="userOfChat" style={{ display: this.props.user.login ? "block" : "none" }}>
          {this.props.user.login}
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {
                //   <li className="nav-item">
                //     <a className="nav-link" href="#">
                //       Users
                //     </a>
                //   </li>
              }
            </ul>

            <ul className="navbar-nav mt-2 mt-lg-0"
              style={{ display: this.props.user.login ? "block" : "none" }}>
              <li
                className="nav-item"
              >
                <a className="nav-link" href="#"
                  onClick={() => this.handleLogout()}
                >
                  <i className="fas fa-sign-out-alt" /> Log out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
