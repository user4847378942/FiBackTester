const Strategy = require('../model/Strategy');


module.exports = class StrategyBuilder {
	static build(config) {
		let monthlyContribution = (years) => {
			return config.monthlySavings * (1 + years * config.savingsIncreaseYear);
		};
		let rebalance = (date, diff) => {
			return true;
		};
		let swr = (date, economicData) => {
			return 0.04; // 4% Rule
		};

		let strategies = [
			new Strategy('Stocks/Bonds: 80/20; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs':.8,
						'bondUs': 0.2
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
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
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Cash: 80/20; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.8,
						'cashUs': 0.2
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Cash: 60/40; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.6,
						'cashUs': 0.4
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			)
		];

		return strategies;
	}
}