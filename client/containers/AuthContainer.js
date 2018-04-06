import {
    connect,
  } from 'react-redux';
  
  import {
    loginAsync,
  } from '../actions/index';
  
  import Auth from '../components/Auth';
  
  const mapDispatchToProps = dispatch => ({
    onLogin: user => dispatch(loginAsync(user)),
  });
  
  const mapStateToProps = () => ({});
  
  const AuthContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Auth);
  
  export default AuthContainer;