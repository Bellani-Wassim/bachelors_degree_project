import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class TicketStore {
	constructor() {
		makeObservable(this, {
			tickets: observable,
			setTickets: action,
			loadTickets: action,
			addTickets: action,
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

	addTickets(equipement) {
		return axios
			.post('http://localhost:3546/api/equipement', equipement)
			.then((error) => console.error(error));
	}

	// updateEquipement(equipement) {
	// 	axios
	// 	 .post('http://localhost:3546/api/equipement/update', equipement)
	// 	 .then((error) => console.error(error));
	// }

	// deleteEquipement(id) {
	// 	axios
	// 		.post('http://localhost:3546/api/equipement/delete', {id})
	// 		.then((error) => console.error(error));
	// }

}

export default new TicketStore();
