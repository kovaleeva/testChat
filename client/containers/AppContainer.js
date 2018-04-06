import {
    connect,
  } from 'react-redux';

import { logoutAsync } from '../actions/index';

import App from '../components/App';

const mapDispatchToProps = dispatch => ({
    onLogout: (user) => dispatch(logoutAsync(user))
});

const mapStateToProps = state => ({
    user: state.auth.user
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;