const moment = require('moment');

module.exports = class Portfolio {
	constructor(yearlyDesiredIncome, economicData, investmentCatalog) {
		this.yearlyDesiredIncome = yearlyDesiredIncome;
		this.portfolio = {}
		this.economicData = economicData;
		this.investmentCatalog = investmentCatalog;

		this.moneyFormatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
			minimumFractionDigits: 0,
		});
	}

	setInitialValue(date, value, allocations) {
		for (let symbol in allocations) {
			let allocation = allocations[symbol];
			this.addMoney(date, symbol, allocation * value);
		}
	}

	addMoney(date, symbol, moneyAmount) {
		if (!moneyAmount || moneyAmount === 0) return;

		let existingHolding = this.portfolio[symbol];

		let investment = this.investmentCatalog[symbol];
		let amount = moneyAmount / investment.getPrice(date);

		if (existingHolding) {
			this.portfolio[symbol] += amount;
		} else {
			this.portfolio[symbol] = amount;
		}
	}

	substractFees() {
		for (let symbol in this.portfolio) {
			let investment = this.investmentCatalog[symbol];
			this.portfolio[symbol] -=
				this.portfolio[symbol] * investment.expenses;
		}
	}

	rebalance(date, allocations, strategy) {
		let portfolio = this.getValue(date);
		if (process.env.DEBUG) console.log('Portfolio: ' + JSON.stringify(portfolio));
		for (let symbol in this.investmentCatalog) {
			let investment = this.investmentCatalog[symbol];

			// Actual
			let currentValue = portfolio.holdings[symbol] || 0;

			// Target
			let targetAllocation = allocations[symbol] || 0;
			let desiredValue = targetAllocation * portfolio.totalValue;

			// Diff
			let diffValue = desiredValue - currentValue;
			let percentageDiff = Math.abs(diffValue / portfolio.totalValue);

			if (diffValue !== 0 && strategy.rebalance(date, percentageDiff)) {
				if (process.env.DEBUG) console.log(`Change to ${symbol} $${diffValue}`);
				this.addMoney(date, symbol, diffValue);
			}
		}
		let portfolioAfterRebalancing = this.getValue(date);
		let portfolioDiff = Math.abs(portfolio.totalValue - portfolioAfterRebalancing.totalValue);
		console.assert(portfolioDiff < 0.01, 'Total portfolio value before and after rebalancing is not equal.');
	}

	adjustTargetForInflation(date) {
		let inflationRate = 1 + this.economicData.getInflation(date);
		this.yearlyDesiredIncome = inflationRate * this.yearlyDesiredIncome;
	}

	getValue(date, formatted) {
		let result = {
			totalValue: 0,
			holdings: {}
		}
		for (let symbol in this.portfolio) {
			let investment = this.investmentCatalog[symbol];
			let price = investment.getPrice(date);
			let value = this.portfolio[symbol] * price;
			result.totalValue += value;
			if (formatted) {
				result.holdings[symbol] = this.moneyFormatter.format(value);
			} else {
				result.holdings[symbol] = value;
			}
		}
		return result;
	}

	fiProgress(date, swr) {
		return swr * this.getValue(date).totalValue / this.yearlyDesiredIncome;
	}

	log(date, swr, fiProgress) {
		let portfolio = this.getValue(date, true);
		let dateString = moment(date).format('MM/YYYY');
		console.log(`${dateString} | ${swr.toFixed(1)}% | ${fiProgress.toFixed(2)}% | ${this.moneyFormatter.format(portfolio.totalValue.toFixed(0))} | ${JSON.stringify(portfolio.holdings)}`)
	}
}