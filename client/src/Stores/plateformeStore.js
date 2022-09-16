import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class PlateformeStore {
	constructor() {
		makeObservable(this, {
			plateformes: observable,
			setPlateformes: action,
			loadPlateformes: action,
			addPlateforme: action,
		});
	}

	plateformes = [];

	addPlateforme(plateforme) {
		return axios
			.post('http://localhost:3546/api/plateforme', plateforme)
			.then(({ data }) => {
				this.setPlateformes([...this.plateformes, data]);
			})
			.then((error) => console.error(error));
	}

	updatePlateforme(Plateforme) {
		axios
		 .post('http://localhost:3546/api/Plateforme/update', Plateforme)
		 .then((error) => console.error(error));
	}

	deletePlateforme(id) {
		axios
			.post('http://localhost:3546/api/Plateforme/delete', {id})
			.then((error) => console.error(error));
	}

	setPlateformes(plateformes) {
		this.plateformes = plateformes;
	}

	async loadPlateformes() {
		await axios
			.get('http://localhost:3546/api/plateforme')
			.then(({ data }) => this.setPlateformes(data))
			.catch((error) => console.error(error));
	}
}

export default new PlateformeStore();
