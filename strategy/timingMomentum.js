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
			new Strategy('100/0 timing',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'spxtr': 1.0,
							'tnxtr': 0.0
						}
					}

					let price = investmentCatalog['spxtr'].getPrice(date);
					let sma200 = investmentCatalog['spxtr'].getSma200(date);
					if (!sma200 || price >= sma200) {
						return {
							'spxtr': 1.0,
							'tnxtr': 0.0
						}
					} else {
						return {
							'spxtr': 0.0,
							'tnxtr': 1.0
						}
					}
				},
				rebalance,
				swr
			)
		];

		return strategies;
	}
}