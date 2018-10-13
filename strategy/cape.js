const Strategy = require('../model/Strategy');


module.exports = class StrategyBuilder {
	static build(config) {
		let monthlyContribution = (years) => {
			return config.monthlySavings * (1 + years * config.savingsIncreaseYear);
		};
		let rebalance = (date, diff) => {
			return true;
		};
		let swr = (date, cape) => {
			return 0.0175 + (0.5 * (1 / cape));
		};

		let strategies = [
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 1.0,
						'bondUs': 0.0
					}
				},
				rebalance,
				swr
			),
			new Strategy('Stocks/Bonds: 80/20; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.8,
						'bondUs': 0.2
					}
				},
				rebalance,
				swr
			),
			new Strategy('Stocks/Bonds: 60/40; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.6,
						'bondUs': 0.4
					}
				},
				rebalance,
				swr
			),
			new Strategy('Stocks/Bonds: 40/60; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.4,
						'bondUs': 0.6
					}
				},
				rebalance,
				swr
			),
			new Strategy('Stocks/Bonds: 20/80; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.2,
						'bondUs': 0.8
					}
				},
				rebalance,
				swr
			),
			new Strategy('Stocks/Bonds: 0/100; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.0,
						'bondUs': 1.0
					}
				},
				rebalance,
				swr
			),
		];

		return strategies;
	}
}