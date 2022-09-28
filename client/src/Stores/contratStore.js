import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class ContratStore {
	constructor() {
		makeObservable(this, {
			contrats: observable,
			setContrats: action,
			loadContrats: action,
			addContrat: action,
		});
	}

	contrats = [];

	addContrat(contrat) {
		return axios
			.post('http://localhost:3546/api/contrat', contrat)
			.then((error) => console.error(error));
	}

	updateContrat(contrat) {
		 axios
			.put('http://localhost:3546/api/contrat/update', contrat)
			.then((error) => console.error(error));
	}

	deleteContrat(id) {
		axios
			.put('http://localhost:3546/api/contrat/delete', {id})
			.then((error) => console.error(error));
	}

	setContrats(contrats) {
		this.contrats = contrats;
	}

	async loadContrats() {
		await axios
			.get('http://localhost:3546/api/contrat')
			.then(({ data }) => this.setContrats(data))
			.catch((error) => console.error(error));
		}
}

export default new ContratStore();
