# history-helper
history-helper

[![NPM](https://img.shields.io/npm/v/history-helper.svg)](https://www.npmjs.com/package/history-helper)

## Install

```bash
yarn add history-helper
```

## Usage

```ts
import HistoryHelper from 'history-helper';

/**
 * storeKey [string] optional - 设置state[key]
 * storeHistory [History] optional - 设置指定的history
 **/
const historyHelper = new HistoryHelper(storeKey, storeHistory);

/** apis **/

historyHelper.setState(state: any);

historyHelper.getState()

// deep merge, see: lodash.merge
historyHelper.mergeState(...state: object[]);

// shallow merge, use lodash.assign
historyHelper.shallowMergeState(...state: object[]);

historyHelper.clearState();

historyHelper.getValue(path: string, defaultValue: any = null);

```
