const _ = require('lodash');
const moment = require('moment');

const EconomicData = require('../model/EconomicData');
const Investment = require('../model/Investment');
const Parser = require('../controller/Parser');
const Portfolio = require('../model/Portfolio');


module.exports = class FiSimulator {
	static _simulate(config, dates, strategy, investmentCatalog, economicData) {
		console.log(`Simulating strategy ${strategy.name}`);
		let results = {};
		for (var i = 0; i < dates.length; i++) {
			let startDate = dates[i];
			if (strategy.startDate && strategy.startDate > startDate) continue;

			let monthsPassed = 0;
			let fiProgress = 0;
			let portfolio = new Portfolio(config.desiredIncomeYear, economicData,
				investmentCatalog);
			portfolio.setInitialValue(startDate, config.portfolioValue,
				strategy.allocations(fiProgress))

			if (process.env.DEBUG) {
				console.log(`\n${moment(startDate).format('MM/YYYY')} Cohort`)
			}

			for (var j = i; j < dates.length; j++) {
				let date = dates[j];
				let allocations = strategy.allocations(fiProgress, date,
					investmentCatalog);

				portfolio.substractFees();
				portfolio.rebalance(date, allocations, strategy);

				// Monthly contribution
				for (let symbol in allocations) {
					let investment = investmentCatalog[symbol];
					let allocation = allocations[symbol];
					portfolio.addMoney(date, symbol,
						allocation * strategy.contribution(monthsPassed / 12));
				}

				portfolio.adjustTargetForInflation(date);

				monthsPassed++;
				let cape = economicData.getCape(date)
				let swr = strategy.swr(date, cape);
				fiProgress = portfolio.fiProgress(date, swr);

				if (process.env.DEBUG) {
					portfolio.log(date, swr * 100, fiProgress * 100);
				}
				if (fiProgress >= 1) {
					results[startDate] = {
						'months': monthsPassed,
						'swr': swr
					};
					break;
				}
			}
		}
		return results;
	}

	static async analyze(config, strategies) {
		let economicData = new EconomicData();

		// Define Investments
		let investmentCatalog = {
			'equityUs': new Investment('equityUs', 0.0004 / 12),
			'bondUs': new Investment('bondUs', 0.0005 / 12),
			'equityIntl': new Investment('equityIntl', 0.0011 / 12),
			'cashUs': new Investment('cashUs', 0.0016 / 12)
		}

		// Read historic data
		let dates = await Parser.getHistoricData(economicData,
			investmentCatalog);

		console.log('\nRunning simulations with config: ' + JSON.stringify(config, null, 2) + '\n')

		// Run simulation
		let results = [];
		for (let strategy of strategies) {
			let result = FiSimulator._simulate(config, dates, strategy,
				investmentCatalog, economicData);
			strategy.calculateStats(result);
			results.push(strategy)
		}
		results = _.orderBy(results, ['score'], ['asc']);
		console.log('\nFinished! Here are the results...\n')
		console.log('Name | AVG |  MAX  | RANK')
		console.log('--------------------------');;
		for (let s of results) {
			console.log(`${s.name}: ${s.stats.mean.toFixed(2)} years / ` +
				`${s.stats.max.toFixed(2)} years ` + `[${s.score.toFixed(2)}]`)
		}
	}
}