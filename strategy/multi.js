const Strategy = require('../model/Strategy');


module.exports = class StrategyBuilder {
	static build(config) {
		let monthlyContribution = (years) => {
			return config.monthlySavings * (1 + years * config.savingsIncreaseYear);
		};
		let rebalance = (date, diff) => {
			return (diff > 0.05);
		};
		let swr = (date, cape) => {
			return 0.0208 + (0.4 * (1 / cape));
		};

		let strategies = [];
		for (let equities = 100; equities >= 0; equities--) {
			let bonds = 100 - equities;
			let strategy = new Strategy(`Stocks/Bonds: ${equities}/${bonds}; US/Intl: 60/40`,
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.6 * equities / 100,
						'equityIntl': 0.4 * equities / 100,
						'bondUs': bonds / 100
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			);
			strategies.push(strategy);
		}

		return strategies;
	}
}