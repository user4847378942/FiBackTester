const Stats = require('fast-stats').Stats;


module.exports = class Strategy {
	constructor(name, contribution, allocations, rebalance, swr) {
		this.name = name;
		this.allocations = allocations;
		this.contribution = contribution;
		this.swr = swr;
		this.rebalance = rebalance;
	}

	calculateStats(results) {
		let s = new Stats();
		for (let date in results) {
			let result = results[date];
			s.push(result.months);
		}
		this.stats = {
			'mean': s.amean() / 12,
			'stddev': s.stddev() / 12,
			'95th': s.percentile(95) / 12,
			'min': s.range()[0] / 12,
			'max': s.range()[1] / 12
		}
		this.score = parseFloat(this.stats.mean) + parseFloat(this.stats.max);
	}
}
