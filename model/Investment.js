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
	// 10 Month / 200 day
	getSma200(date) {
		let result = this.getPrice(date);
		for (let i = 1; i < 10; i++) {
			let previousDate = new Date(date);
			previousDate.setMonth(date.getMonth() - i);
			let price = this.getPrice(previousDate);
			if (!price) {
				return null;
			}
			result += price;
		}
		return result / 10;
	}
}