const Strategy = require('../model/Strategy');


module.exports = class StrategyBuilder {
	static build(config) {
		let monthlyContribution = (years) => {
			return config.monthlySavings * (1 + years * config.savingsIncreaseYear);
		};
		let rebalance = (date, diff) => {
			// return false;
			return true;
		};
		let swr = (date, cape) => {
			return 0.0208 + (0.4 * (1 / cape));
		};

		let strategies = [];
		for (let equities = 100; equities >= 0; equities--) {
			let bonds = 100 - equities;
			for (let domestic = 100; domestic >= 0; domestic--) {
				let intl = 100 - domestic;

				let strategy = new Strategy(`Stocks/Bonds: ${equities}/${bonds}; US/Intl: ${domestic}/${intl}`,
					monthlyContribution,
					// Allocation
					(fiProgress) => {
						return {
							'equityUs': equities / 100 * domestic / 100,
							'equityIntl': equities / 100 * intl / 100,
							'bondUs': bonds / 100
						}
					},
					rebalance,
					swr,
					new Date('Januar 01, 1970 00:00:00')
				);
				strategies.push(strategy);
			}
		}

		return strategies;
	}
}