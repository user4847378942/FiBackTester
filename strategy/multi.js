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
		let swr = (date, economicData) => {
			// return 0.04; // 4%
			return economicData.getSWR(date) // CAPE based
		};

		let strategies = [];
		for (var i = 100; i >= 0; i--) {
			let equities = i;
			let bonds = 100 - equities;
			let strategy = new Strategy(`${equities}/${bonds}`,
					monthlyContribution,
					// Allocation
					(fiProgress) => {
						return {
							'spxtr': equities / 100,
							'tnxtr': bonds / 100
						}
					},
					rebalance,
					swr
				);
			strategies.push(strategy);
		}

		return strategies;
	}
}
