module.exports = class EconomicData {
	constructor() {
		this.data = {};
	}

	addData(date, inflation, cape) {
		this.data[date] = {
			inflation,
			cape
		}
	}

	getInflation(date) {
		return this.data[date].inflation;
	}

	getCape(date) {
		return this.data[date].cape;
	}
}