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
			return 0.0208 + (0.4 * (1 / cape));
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
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0 - timing us-only (bonds)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 1.0,
							'bondUs': 0.0
						}
					}

					let price = investmentCatalog['equityUs'].getPrice(date);
					let sma200 = investmentCatalog['equityUs'].getSma200(date);
					if (!sma200 || price >= sma200) {
						return {
							'equityUs': 1.0,
							'bondUs': 0.0
						}
					} else {
						return {
							'equityUs': 0.0,
							'bondUs': 1.0
						}
					}
				},
				rebalance,
				swr
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 100/0 - timing us-only (cash)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 1.0,
							'cashUs': 0.0
						}
					}

					let price = investmentCatalog['equityUs'].getPrice(date);
					let sma200 = investmentCatalog['equityUs'].getSma200(date);
					if (!sma200 || price >= sma200) {
						return {
							'equityUs': 1.0,
							'cashUs': 0.0
						}
					} else {
						return {
							'equityUs': 0.0,
							'cashUs': 1.0
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