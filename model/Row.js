module.exports = class Row {
	constructor(month, year, cpi, cash, tnxtr, spxtr, cape, msciWorldExUsTr) {
		this.month = parseInt(month);
		this.year = parseInt(year);
		this.cpiUs = parseFloat(cpi);
		this.cashUs = parseFloat(cash);
		this.bondUs = parseFloat(tnxtr);
		this.equityUs = parseFloat(spxtr);
		this.equityUsCape = parseFloat(cape);
		this.equityIntl = parseFloat(msciWorldExUsTr);
	}
}