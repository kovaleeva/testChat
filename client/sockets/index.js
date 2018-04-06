import types from '../actions/actionTypes';
import { fetchUsersOnline, fetchMessages, logoutAsync, muteUser, unMuteUser } from '../actions';

class WSService {
    static set dispatch(dispatch) {
        this._dispatch = dispatch;
    }

    static get dispatch() {
        return this._dispatch
    }

    static onOpen(type, data) {
        this.socket.onopen = () => this.socket.send(JSON.stringify({ type, data }));
    }

    static close() {
        this.socket.close();
    }

    static onMessage() {
        this.socket.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);

            switch (type) {
                case types.FETCH_MESSAGES:
                    this.dispatch(fetchMessages(data))
                    break;
                case types.FETCH_USER_LIST:
                    this.dispatch(fetchUsersOnline(data));
                    break;
                case types.LOGOUT_USER:
                    this.dispatch(logoutAsync(data))
                    break;
                case types.MUTE_USER:
                    this.dispatch(muteUser(data))
                    break;
                case types.UNMUTE_USER:
                    this.dispatch(unMuteUser(data))
                    break;
                default:
                    break;
            }
        }
    }

    static init(user) {
        this.socket = new WebSocket("ws://192.168.0.177:8082");
        console.log(this.socket);
        this.onOpen('CONNECTION', user);
        this.onMessage();
    }

    static send(type, data) {
        const { readyState } = this.socket;

        if (!readyState) {
            return setTimeout(() => this.send(type, data));
        }

        this.socket.send(JSON.stringify({ type, data }));
    }
}

export default WSService;