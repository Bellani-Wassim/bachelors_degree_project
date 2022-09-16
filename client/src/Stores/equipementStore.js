import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class EquipementStore {
	constructor() {
		makeObservable(this, {
			equipements: observable,
			setEquipements: action,
			loadEquipements: action,
			addEquipement: action,
		});
	}

	equipements = [];

	addEquipement(equipement) {
		return axios
			.post('http://localhost:3546/api/equipement', equipement)
			.then((error) => console.error(error));
	}

	updateEquipement(equipement) {
		axios
		 .post('http://localhost:3546/api/equipement/update', equipement)
		 .then((error) => console.error(error));
	}

	deleteEquipement(id) {
		axios
			.post('http://localhost:3546/api/equipement/delete', {id})
			.then((error) => console.error(error));
	}

	setEquipements(equipements) {
		this.equipements = equipements;
	}

	async loadEquipements() {
		await axios
			.get('http://localhost:3546/api/equipement')
			.then(({ data }) => this.setEquipements(data))
			.catch((error) => console.error(error));
	}
}

export default new EquipementStore();
