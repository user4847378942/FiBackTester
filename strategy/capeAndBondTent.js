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
			return economicData.getSWR(date) // CAPE based
		};

		let strategies = [
			new Strategy('100/0 - No Bond Tent',
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
			new Strategy('100/0 - 95% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > .95) {
						return {
							'spxtr': 0.25,
							'tnxtr': 0.75
						}
					} else {
						return {
							'spxtr': 1.0,
							'tnxtr': 0.0
						}
					}
				},
				rebalance,
				swr
			),
			new Strategy('100/0 - 90% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > .9) {
						return {
							'spxtr': 0.25,
							'tnxtr': 0.75
						}
					} else {
						return {
							'spxtr': 1.0,
							'tnxtr': 0.0
						}
					}
				},
				rebalance,
				swr
			),
			new Strategy('100/0 - 80% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > .8) {
						return {
							'spxtr': 0.25,
							'tnxtr': 0.75
						}
					} else {
						return {
							'spxtr': 1.0,
							'tnxtr': 0.0
						}
					}
				},
				rebalance,
				swr
			),
			new Strategy('100/0 - 70% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > .7) {
						return {
							'spxtr': 0.25,
							'tnxtr': 0.75
						}
					} else {
						return {
							'spxtr': 1.0,
							'tnxtr': 0.0
						}
					}
				},
				rebalance,
				swr
			),
		];

		return strategies;
	}
}