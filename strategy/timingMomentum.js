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
			return 0.04;
			// return 0.0208 + (0.4 * (1 / cape));
		};

		let strategies = [
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40',
				monthlyContribution,
				// Allocation
				(fiProgress) => {
					return {
						'equityUs': 0.6,
						'equityIntl': 0.4,
						'bondUs': 0.0
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40 - timing us-only (bonds)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					}

					let usPrice = investmentCatalog['equityUs'].getPrice(date);
					let usSma200 = investmentCatalog['equityUs'].getSma200(date);

					if (!usSma200 || usPrice >= usSma200) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					} else {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.0,
							'bondUs': 1.0
						}
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40 - timing (bonds)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					}

					let usPrice = investmentCatalog['equityUs'].getPrice(date);
					let usSma200 = investmentCatalog['equityUs'].getSma200(date);
					let intlPrice = investmentCatalog['equityIntl'].getPrice(date);
					let intlSma200 = investmentCatalog['equityIntl'].getSma200(date);

					if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					} else if ((!usSma200 || usPrice < usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.4,
							'bondUs': 0.6
						}
					} else if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice < intlSma200)) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.0,
							'bondUs': 0.4
						}
					} else {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.0,
							'bondUs': 1.0
						}
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 60/40; US/Intl: 60/40 - timing (bonds)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 0.6 * 0.6,
							'equityIntl': 0.6 * 0.4,
							'bondUs': 0.4
						}
					}

					let usPrice = investmentCatalog['equityUs'].getPrice(date);
					let usSma200 = investmentCatalog['equityUs'].getSma200(date);
					let intlPrice = investmentCatalog['equityIntl'].getPrice(date);
					let intlSma200 = investmentCatalog['equityIntl'].getSma200(date);

					if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.6 * 0.6,
							'equityIntl': 0.6 * 0.4,
							'bondUs': 0.4
						}
					} else if ((!usSma200 || usPrice < usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.6 * 0.4,
							'bondUs': 0.4 + 0.6 * 0.6
						}
					} else if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice < intlSma200)) {
						return {
							'equityUs': 0.6 * 0.6,
							'equityIntl': 0.0,
							'bondUs': 0.4 + 0.6 * 0.4
						}
					} else {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.0,
							'bondUs': 1.0
						}
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40 - timing (other equity/bonds)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					}

					let usPrice = investmentCatalog['equityUs'].getPrice(date);
					let usSma200 = investmentCatalog['equityUs'].getSma200(date);
					let intlPrice = investmentCatalog['equityIntl'].getPrice(date);
					let intlSma200 = investmentCatalog['equityIntl'].getSma200(date);

					if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					} else if ((!usSma200 || usPrice < usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.0,
							'equityIntl': 1.0,
							'bondUs': 0.0
						}
					} else if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice < intlSma200)) {
						return {
							'equityUs': 1.0,
							'equityIntl': 0.0,
							'bondUs': 0.0
						}
					} else {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.0,
							'bondUs': 1.0
						}
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40 - timing (other equity/cash)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'cashUs': 0.0
						}
					}

					let usPrice = investmentCatalog['equityUs'].getPrice(date);
					let usSma200 = investmentCatalog['equityUs'].getSma200(date);
					let intlPrice = investmentCatalog['equityIntl'].getPrice(date);
					let intlSma200 = investmentCatalog['equityIntl'].getSma200(date);

					if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'cashUs': 0.0
						}
					} else if ((!usSma200 || usPrice < usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.0,
							'equityIntl': 1.0,
							'cashUs': 0.0
						}
					} else if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice < intlSma200)) {
						return {
							'equityUs': 1.0,
							'equityIntl': 0.0,
							'cashUs': 0.0
						}
					} else {
						return {
							'equityUs': 0.0,
							'equityIntl': 0.0,
							'cashUs': 1.0
						}
					}
				},
				rebalance,
				swr,
				new Date('Januar 01, 1970 00:00:00')
			),
			new Strategy('Stocks/Bonds: 100/0; US/Intl: 60/40 - timing (bonds/cash)',
				monthlyContribution,
				// Allocation
				(fiProgress, date, investmentCatalog) => {
					if (!date || !investmentCatalog) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					}

					let usPrice = investmentCatalog['equityUs'].getPrice(date);
					let usSma200 = investmentCatalog['equityUs'].getSma200(date);
					let intlPrice = investmentCatalog['equityIntl'].getPrice(date);
					let intlSma200 = investmentCatalog['equityIntl'].getSma200(date);
					let bondPrice = investmentCatalog['bondUs'].getPrice(date);
					let bondSma200 = investmentCatalog['bondUs'].getSma200(date);

					if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						return {
							'equityUs': 0.6,
							'equityIntl': 0.4,
							'bondUs': 0.0
						}
					} else if ((!usSma200 || usPrice < usSma200) &&
						(!intlSma200 || intlPrice >= intlSma200)) {
						if (!bondSma200 || bondPrice >= bondSma200) {
							return {
								'equityUs': 0.0,
								'equityIntl': 0.4,
								'bondUs': 0.6
							}
						} else {
							return {
								'equityUs': 0.0,
								'equityIntl': 0.4,
								'cashUs': 0.6
							}
						}
					} else if ((!usSma200 || usPrice >= usSma200) &&
						(!intlSma200 || intlPrice < intlSma200)) {
						if (!bondSma200 || bondPrice >= bondSma200) {
							return {
								'equityUs': 0.6,
								'equityIntl': 0.0,
								'bondUs': 0.4
							}
						} else {
							return {
								'equityUs': 0.6,
								'equityIntl': 0.0,
								'cashUs': 0.4
							}
						}
					} else {
						if (!bondSma200 || bondPrice >= bondSma200) {
							return {
								'equityUs': 0.0,
								'equityIntl': 0.0,
								'bondUs': 1.0
							}
						} else {
							return {
								'equityUs': 0.0,
								'equityIntl': 0.0,
								'cashUs': 1.0
							}
						}
					}
				},
				rebalance,
				swr,
				new Date('June 01, 1974 00:00:00')
			),
		];

		return strategies;
	}
}