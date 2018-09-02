const Strategy = require('../model/Strategy');


module.exports = class StrategyBuilder {
	static build(config) {
		console.log(new Date('Januar 01, 1970 00:00:00'));
		let monthlyContribution = (years) => {
			return config.monthlySavings * (1 + years * config.savingsIncreaseYear);
		};
		let rebalance = (date, diff) => {
			return (diff > 0.05);
		};
		let swr = (date, cape) => {
			return 0.04; // 4% Rule
		};

		let strategies = [
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 1.0,
						'equityIntl': 0.0
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 90/10',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.9,
						'equityIntl': 0.1
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 80/20',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.8,
						'equityIntl': 0.2
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 70/30',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.7,
						'equityIntl': 0.3
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.6,
						'equityIntl': 0.4
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 50/50',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.5,
						'equityIntl': 0.5
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 40/60',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.4,
						'equityIntl': 0.6
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 30/70',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.3,
						'equityIntl': 0.7
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 20/80',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.8,
						'equityIntl': 0.2
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
		];

		return strategies;
	}
}