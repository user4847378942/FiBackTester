# FI Back Tester
This tool allows you to backtest a investment strategy using historical data since 1871.

## Installation
- Install Node via NVM: https://github.com/creationix/nvm
- `nvm install v8`
- `npm install`

## Usage
`node index.js --portfolioValue=100000 --monthlySavings=1000 --desiredIncomeYear=24000 --savingsIncreaseYear=0.03 --strategy=default`

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

## Contact
Please DM me on reddit if you have any questions or found any issues: https://www.reddit.com/user/user4847378942/

## Data
Data courtesy of EarlyRetirementNow: https://docs.google.com/spreadsheets/d/1QGrMm6XSGWBVLI8I_DOAeJV5whoCnSdmaR8toQB2Jz8/edit#gid=1477530195
