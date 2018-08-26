module.exports = class Investment {
	constructor(name, expenses) {
		this.name = name;
		this.expenses = expenses;
		this.data = {};
	}
	setPrice(date, price) {
		this.data[date] = price;
	}
	getPrice(date) {
		return this.data[date];
	}
}