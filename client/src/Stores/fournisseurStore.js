import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class FournisseurStore {
	constructor() {
		makeObservable(this, {
			fournisseurs: observable,
			setFournisseurs: action,
			loadFournisseurs: action,
			addFournisseur: action,
		});
	}

	fournisseurs = [];

	addFournisseur(fournisseur) {
		return axios
			.post('http://localhost:3546/api/fournisseur', fournisseur)
			.then((error) => console.error(error));
	}

	updateFournisseur(fournisseur) {
		 axios
			.post('http://localhost:3546/api/fournisseur/update', fournisseur)
			.then((error) => console.error(error));
	}

	deleteFournisseur(id) {
		axios
			.post('http://localhost:3546/api/fournisseur/delete', {id})
			.then((error) => console.error(error));
	}

	setFournisseurs(fournisseurs) {
		this.fournisseurs = fournisseurs;
	}

	async loadFournisseurs() {
		await axios
			.get('http://localhost:3546/api/fournisseur')
			.then(({ data }) => this.setFournisseurs(data))
			.catch((error) => console.error(error));
		}
}

export default new FournisseurStore();
