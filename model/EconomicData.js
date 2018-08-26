module.exports = class EconomicData {
	constructor() {
		this.data = {};
	}
	addData(date, inflation, swr) {
		this.data[date] = [inflation, swr];
	}
	getInflation(date) {
		return this.data[date][0];
	}
	getSWR(date) {
		return this.data[date][1];
	}
}
