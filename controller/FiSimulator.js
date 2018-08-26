const _ = require('lodash');

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
			let monthsPassed = 0;
			let fiProgress = 0;
			let portfolio = new Portfolio(config.desiredIncomeYear, economicData,
				investmentCatalog);
			// Add initial value
			let allocations = strategy.allocations(fiProgress);
			for (let symbol in allocations) {
				let investment = investmentCatalog[symbol];
				let allocation = allocations[symbol];

				portfolio.addMoney(startDate, symbol,
					allocation * config.portfolioValue);
			}

			for (var j = i; j < dates.length; j++) {
				let date = dates[j];
				allocations = strategy.allocations(fiProgress);
				for (let symbol in allocations) {
					let investment = investmentCatalog[symbol];
					let allocation = allocations[symbol];

					portfolio.adjustTargetForInflation(date);
					portfolio.rebalance(date, fiProgress, strategy);
					portfolio.substractFees();
					portfolio.addMoney(date, symbol,
						allocation * strategy.contribution(monthsPassed / 12));
				}
				monthsPassed++;
				let swr = strategy.swr(date, economicData);
				fiProgress = portfolio.fiProgress(date, swr);
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
			'spxtr': new Investment('spxtr', 0.0004 / 12),
			'tnxtr': new Investment('tnxtr', 0.0005 / 12)
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
		results = _.orderBy(results, ['score'],['asc']);
		console.log('\nFinished! Here are the results...\n')
		console.log('Name | AVG |  MAX  | RANK')
		console.log('--------------------------');;
		for (let s of results) {
			console.log(`${s.name}: ${s.stats.mean.toFixed(2)} / ` +
				`${s.stats.max.toFixed(2)} ` + `[${s.score.toFixed(2)}]`)
		}
	}
}