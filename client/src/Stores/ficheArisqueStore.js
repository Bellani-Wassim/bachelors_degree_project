import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class TicketCurativeStore {
	constructor() {
		makeObservable(this, {
			ticketArisque: observable,
			setTickets: action,
			loadTicketAR: action,
      log: action,
		});
	}

	ticketArisque = [];

  setTickets(tickets) {
		this.ticketArisque=tickets;
	}
  log () {
  console.log(this.ticketArisque.lenght);
}
  async loadTicketAR() {
		await axios
			.get('http://localhost:3546/api/fiche_curative')
			.then(({ data }) => this.setTickets(data))
			.catch((error) => console.error(error));
	}

}

export default new TicketCurativeStore();