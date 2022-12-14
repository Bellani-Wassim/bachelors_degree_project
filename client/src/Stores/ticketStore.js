import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class TicketStore {
	constructor() {
		makeObservable(this, {
			tickets: observable,
			setTickets: action,
			loadTickets: action,
			deleteTicket: action,
			updateTickets: action,
			addTickets: action
		});
	}

	tickets = [];

  setTickets(tickets) {
		this.tickets = tickets;
	}

  async loadTickets() {
		await axios
			.get('http://localhost:3546/api/fiche_preventive')
			.then(({ data }) => this.setTickets(data))
			.catch((error) => console.error(error));
	}

	addTickets(ticket) {
		return axios
			.post('http://localhost:3546/api/fiche_preventive', ticket)
			.then((error) => console.error(error));
	}

	updateTickets(ticket) {
		axios
		 .put('http://localhost:3546/api/fiche_preventive/update', ticket)
		 .then((error) => console.error(error));
	}

	deleteTicket(id) {
		axios
			.put('http://localhost:3546/api/fiche_preventive/delete', {id})
			.then((error) => console.error(error));
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

export default new TicketStore();
