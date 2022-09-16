import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class TechnicienStore {
	constructor() {
		makeObservable(this, {
			techniciens: observable,
			setTechniciens: action,
			loadTechniciens: action,
			addTechnicien: action,
		});
	}

	techniciens = [];

	addTechnicien(technicien) {
		return axios
			.post('http://localhost:3546/api/technicien', technicien)
			.then(({ data }) => {
				this.setTechniciens([...this.techniciens, data]);
			})
			.then((error) => console.error(error));
	}

	updateTechnicien(technicien) {
		axios
		 .post('http://localhost:3546/api/technicien/update', technicien)
		 .then((error) => console.error(error));
	}

	deleteTechnicien(id) {
		axios
			.post('http://localhost:3546/api/technicien/delete', {id})
			.then((error) => console.error(error));
	}

	setTechniciens(techniciens) {
		this.techniciens = techniciens;
	}

	async loadTechniciens() {
		await axios
			.get('http://localhost:3546/api/technicien')
			.then(({ data }) => this.setTechniciens(data))
			.catch((error) => console.error(error.response.data));
	}

}

export default new TechnicienStore();
