# FI Back Tester
This tool allows you to backtest a investment strategy using historical data since 1871.

## Installation
- Install Node via NVM: https://github.com/creationix/nvm
- `nvm install v8`
- `npm install`

## Usage
```
node index.js --portfolioValue=100000 \
              --monthlySavings=1000 \
              --desiredIncomeYear=24000 \
              --savingsIncreaseYear=0.03 \
              --strategy=default
```

You can run different strategies, here are some predefined ones:
 - `default`: 4% SWR, 100% stocks; 60/40 US/Intl allocation
 - `cape`: variable SWR based on CAPE
 - `multi`: runs all equity/bond and us/intl variations
 - `capeAndBondTent`: cape rule + using a bond tent
 - `timingMomentum`: timing strategy, price > sma200 --> stocks, else bonds
 - ... and some more ;)

You can simply copy any of the strategies and add your own in the `strategy` folder.

## Debugging
Launch the above node command with:
`node --inspect-brk ...`
Then navigate in Chrome to `chrome://inspect`

You can also add the `--debug` flag to see a detailed output of the cash flow.

## Example

Example with a:
- starting portfolio of 100k$
- a 150k$ salary, 111k$ net (excluding taxes on tax-deferred accounts for now)
- a savings rate of 60%, 
- a yearly savings rate increase of 3%
- a target income in retirement of 40k$
- a 60/40/0 (US/Intl/Bonds) portfolio, 4% SWR, with monthly rebalancing (default strategy)

```
node index.js --portfolioValue=100000 \
              --monthlySavings=5500 \
              --desiredIncomeYear=40000 \
              --savingsIncreaseYear=0.03 \
              --strategy=default

Name | AVG |  MAX  | RANK
--------------------------
Stocks/Bonds: 100/0; US/Intl: 60/40: 9.62 years / 15.17 years [24.78]
Stocks/Bonds: 80/20; US/Intl: 60/40: 9.74 years / 15.17 years [24.91]
Stocks/Bonds: 60/40; US/Intl: 60/40: 9.89 years / 15.17 years [25.06]
Stocks/Bonds: 40/60; US/Intl: 60/40: 10.06 years / 15.25 years [25.31]
Stocks/Bonds: 20/80; US/Intl: 60/40: 10.25 years / 15.50 years [25.75]
Stocks/Bonds: 0/100; US/Intl: 60/40: 10.45 years / 15.50 years [25.95]
```

## Contact
Please DM me on reddit if you have any questions or found any issues: https://www.reddit.com/user/user4847378942/

## Data
Data Source: https://docs.google.com/spreadsheets/d/1lev2_w6ScQVtOKJpP2TIWATI2KCGE0AfQmQWIy6THNw/edit?usp=sharing

