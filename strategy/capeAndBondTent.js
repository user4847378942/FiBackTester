const Strategy = require('../model/Strategy');
const assert = require('assert');

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
		let initialPortfolioValue = (startDate, config, economicData) => {
			assert(config.cape != null, 'Must provide --cape value.');
			return config.portfolioValue * economicData.getCape(startDate) / config.cape;
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
				swr,
				null,
				initialPortfolioValue
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0 - 95% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > 0.95) {
						return {
							'equityUs': 0.25,
							'bondUs': 0.75
						}
					} else {
						return {
							'equityUs': 1.0,
							'bondUs': 0.0
						}
					}
				},
				rebalance,
				swr,
				null,
				initialPortfolioValue
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0 - 90% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > 0.9) {
						return {
							'equityUs': 0.25,
							'bondUs': 0.75
						}
					} else {
						return {
							'equityUs': 1.0,
							'bondUs': 0.0
						}
					}
				},
				rebalance,
				swr,
				null,
				initialPortfolioValue
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0 - 80% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > 0.8) {
						return {
							'equityUs': 0.25,
							'bondUs': 0.75
						}
					} else {
						return {
							'equityUs': 1.0,
							'bondUs': 0.0
						}
					}
				},
				rebalance,
				swr,
				null,
				initialPortfolioValue
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0 - 70% Bond Tent Treshold',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					if (fiProgress > 0.7) {
						return {
							'equityUs': 0.25,
							'bondUs': 0.75
						}
					} else {
						return {
							'equityUs': 1.0,
							'bondUs': 0.0
						}
					}
				},
				rebalance,
				swr,
				null,
				initialPortfolioValue
			),
		];

		return strategies;
	}
}