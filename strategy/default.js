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
			new Strategy('100/0',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'spxtr': 1.0,
						'tnxtr': 0.0
					}
				},
				rebalance,
				swr
			),
			new Strategy('80/20',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'spxtr': .8,
						'tnxtr': .2
					}
				},
				rebalance,
				swr
			),
			new Strategy('60/40',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'spxtr': .6,
						'tnxtr': .4
					}
				},
				rebalance,
				swr
			),
			new Strategy('40/60',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'spxtr': .4,
						'tnxtr': .6
					}
				},
				rebalance,
				swr
			),
			new Strategy('20/80',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'spxtr': .2,
						'tnxtr': .8
					}
				},
				rebalance,
				swr
			),
			new Strategy('0/100',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'spxtr': 0.0,
						'tnxtr': 1.0
					}
				},
				rebalance,
				swr
			),
		];

		return strategies;
	}
}