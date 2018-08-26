module.exports = class Row {
	constructor(month, year, fractionalDate, excelDate, cpi, spxtr, tnxtr,
		cash, gold, cape) {
		this.month = month;
		this.year = year;
		this.fractionalDate = fractionalDate;
		this.excelDate = excelDate;
		this.cpi = cpi;
		this.spxtr = spxtr;
		this.tnxtr = tnxtr;
		this.cash = cash;
		this.gold = gold;
		this.cape = cape;
	}
}