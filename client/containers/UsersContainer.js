import { connect } from 'react-redux';
import { fetchUserList, fetchMuteUser,fetchUnMuteUse, banUser } from '../actions/index';
import UsersList from '../components/UsersList';

const mapDispatchToProps = dispatch => ({
    onMute: user => dispatch(fetchMuteUser(user)),
    onUnMute: user => dispatch(fetchUnMuteUser(user)),
    onBan: user => dispatch(banUser(user)),
    onFetchUserList: fetchUserList,
});

const mapStateToProps = state => ({
    usersOnline: state.users.usersOnline,
    socket: state.auth.socket,
    user: state.auth.user,    
});

const UsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersList);

export default UsersContainer;