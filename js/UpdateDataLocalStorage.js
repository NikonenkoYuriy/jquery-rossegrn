class UpdateDataLocalStorage {
	constructor(key, data = []) {
		this.key = key;
		this.data = data;
	}

	getDataLocalStorage() {
		return localStorage.getItem(this.key);
	}

	setDataLocalStorage(data) {
		let dataLS = this.getDataLocalStorage();

		if (dataLS !== null) {
			this.data = JSON.parse(dataLS);
			this.addDataArrau(data);
		} else {
			this.data.push(data);
		}
		this.saveData();
	}

	saveData() {
		localStorage.setItem(this.key, JSON.stringify(this.data))
	}

	getElementIndex(data) {
		let index = null;
		this.data.forEach((item, i) => {
			if (item.cadastralNumber === data.cadastralNumber) index = i;
		})
		return index;
	}

	returnObjectLS(data) {
		let dataLS = this.getDataLocalStorage();
		if (dataLS === null) return undefined;
		return JSON.parse(dataLS).find(item => item.cadastralNumber === data.cadNum)
	}

	addDataArrau(data) {

		let index = this.getElementIndex(data);
		if (index === null) this.data.push(data);
		else this.data.splice(index, 1, data);

	}

	removeDataArrau(data) {

		let index = this.getElementIndex(data);
		if (index !== null) this.data.splice(index, 1);
		this.saveData();

	}

}