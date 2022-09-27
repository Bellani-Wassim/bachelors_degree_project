import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class TicketCurativeStore {
	constructor() {
		makeObservable(this, {
			ticketsC: observable,
			setTickets: action,
			loadTickets: action,
			deleteTicket_curative: action,
			updateTickets_curative: action,
			addTickets_curative: action
		});
	}

	ticketsC = [];

  setTickets(tickets) {
		this.ticketsC = tickets;
	}

  async loadTickets() {
		await axios
			.get('http://localhost:3546/api/fiche_curative')
			.then(({ data }) => this.setTickets(data))
			.catch((error) => console.error(error));
	}

	addTickets_curative(ticket) {
		return axios
			.post('http://localhost:3546/api/fiche_curative', ticket)
			.then((error) => console.error(error));
	}

	updateTickets_curative(ticket) {
		axios
		 .put('http://localhost:3546/api/fiche_curative/update', ticket)
		 .then((error) => console.error(error));
	}

	deleteTicket_curative(id) {
		axios
			.put('http://localhost:3546/api/fiche_curative/delete', {id})
			.then((error) => console.error(error));
	}
}

export default new TicketCurativeStore();
