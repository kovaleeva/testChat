import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                login: '',
                password: ''
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth() {
        this.props.onLogin(this.state.User);
    }

    handleChange(field, value) {
        this.setState({
            User: Object.assign({}, this.state.User, { [field]: value }),
        });
    }

    render() {
        return (
            <div className="auth col-sx-12 col-sm-6 col-md-4">
                <div action="">
                    <div className="form-group">
                        <label htmlFor="login">Login:</label>
                        <input
                            type="login"
                            className="form-control"
                            id="login"
                            onChange={(event) => this.handleChange('login', event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="pwd"
                            onChange={(event) => this.handleChange('password', event.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary user-auth-button"
                        onClick={this.handleAuth}
                    // onClick={() => this.props.onLogin({})}
                    >
                        Sign in
                    </button>
                </div>
            </div>

        );
    }
}

export default Auth;
