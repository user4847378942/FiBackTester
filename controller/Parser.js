const fs = require('fs');
const csv = require('csv');

const Row = require('../model/Row');


module.exports = class Parser {
	static _readFile() {
		return new Promise((resolve, reject) => {
			fs.readFile('data/market_data.csv', 'utf8', (err, data) => {
				if (err) reject(err);
				csv.parse(data, function(err, datas) {
					resolve(datas);
				});
			});
		});
	}

	static async _parseRows() {
		let rows = [];
		let datas = await Parser._readFile();
		for (var i = 1; i < datas.length; i++) {
			let data = datas[i];
			let row = new Row(data[0], data[1], data[2], data[3], data[4],
				data[5], data[6], data[7], data[8], data[9]);
			rows.push(row);
		}
		return rows;
	}

	static async getHistoricData(economicData, investmentCatalog) {
		let rows = await Parser._parseRows();
		let dates = [];
		for (var i = 0; i < rows.length; i++) {
			let previousRow = rows[i - 1];
			let row = rows[i];

			let date = new Date(row.year, row.month);
			dates.push(date);

			// Economic Data
			let inflation = 0.0;
			if (previousRow) {
				inflation = (row.cpi - previousRow.cpi) / previousRow.cpi;
			}
			let swr = 0.0208 + (0.4 * (1 / row.cape));
			economicData.addData(date, inflation, swr);

			// Investment Data
			for (let symbol in investmentCatalog) {
				let investment = investmentCatalog[symbol];
				investment.setPrice(date, row[symbol]);
			}
		}
		return dates;
	}
}