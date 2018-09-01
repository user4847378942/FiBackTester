module.exports = class Portfolio {
	constructor(yearlyDesiredIncome, economicData, investmentCatalog) {
		this.yearlyDesiredIncome = yearlyDesiredIncome;
		this.portfolio = {}
		this.economicData = economicData;
		this.investmentCatalog = investmentCatalog;
	}

	setInitialValue(date, value, allocations) {
		for (let symbol in allocations) {
			let investment = this.investmentCatalog[symbol];
			let allocation = allocations[symbol];

			this.addMoney(date, symbol, allocation * value);
		}
	}

	addMoney(date, symbol, moneyAmount) {
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
		let totalValue = this.getValue(date);
		// Make a copy of the current portfolio, because we might rebalance.
		let portfolio = JSON.parse(JSON.stringify(this.portfolio));
		for (let symbol in portfolio) {
			let investment = this.investmentCatalog[symbol];

			// Actual
			let price = investment.getPrice(date);
			let currentValue = portfolio[symbol] * price;

			// Target
			let targetAllocation = allocations[symbol];
			let desiredValue = targetAllocation * totalValue;

			// Diff
			let diffValue = desiredValue - currentValue;
			let percentageDiff = Math.abs(diffValue / totalValue);

			if (diffValue > 0 && strategy.rebalance(date, percentageDiff)) {
				this.addMoney(date, symbol, diffValue);
			}
		}
	}

	adjustTargetForInflation(date) {
		let inflationRate = 1 + this.economicData.getInflation(date);
		this.yearlyDesiredIncome = inflationRate * this.yearlyDesiredIncome;
	}

	getValue(date) {
		let result = 0;
		for (let symbol in this.portfolio) {
			let investment = this.investmentCatalog[symbol];
			result += this.portfolio[symbol] * investment.getPrice(date);
		}
		return result;
	}

	fiProgress(date, swr) {
		return swr * this.getValue(date) / this.yearlyDesiredIncome;
	}
}