import io from "socket.io-client";
import { makeObservable, observable, action } from 'mobx';

class SocketStore {
	constructor() {
		makeObservable(this, {
			socket: observable,
			connectSocket: action,
		});
	}

	socket = io("http://localhost:3546");

	connectSocket() {
      this.socket.on('connect', () => {
        console.log("User connected at room : " + this.socket.id);
    });
	}
}
export default new SocketStore();
