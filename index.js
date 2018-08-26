const argv = require('minimist')(process.argv.slice(2));

const FiSimulator = require('./controller/FiSimulator');


const config = {
	portfolioValue: argv.portfolioValue || 500000,
	monthlySavings: argv.monthlySavings || 14000,
	desiredIncomeYear: argv.desiredIncomeYear || 46000,
	savingsIncreaseYear: argv.savingsIncreaseYear || 0.05
}

// Dynamically load the desired strategybuilder
let builder = argv.strategy || 'default'
const StrategyBuilder = require('./strategy/' + builder);
let strategies = StrategyBuilder.build(config);

// Start simulation
FiSimulator.analyze(config, strategies);
