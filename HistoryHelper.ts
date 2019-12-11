import { merge, get } from 'lodash';

// eslint-disable-next-line no-restricted-globals
const { history } = top;

/**
 * key前缀, 避免冲突
 */
const STORE_KEY_PREFIX = '__hh';

export default class HistoryHelper {
  private storeKey: string;
  private history: History;

  constructor(storeKey?: string, _history?: History) {
    this.storeKey = storeKey ? `${STORE_KEY_PREFIX}_${storeKey}` : STORE_KEY_PREFIX;
    this.history = _history || history;
  }

  setState(state: any) {
    const historyState = this.history.state || {};
    historyState[this.storeKey] = state;
    this.history.replaceState(historyState, '');
  }

  getState(): object {
    return this.history.state && this.history.state[this.storeKey];
  }

  mergeState(...state: object[]) {
    const mergedState = merge({}, this.getState(), ...state);
    this.setState(mergedState);
  }

  clearState() {
    this.setState(null);
  }

  getValue(path: string, defaultValue: any = null) {
    return get(this.getState(), path, defaultValue);
  }
}
