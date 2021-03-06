import { merge, get, assign } from 'lodash';

let history: History;

/**
 * 如果可以访问到顶层窗口, 默认为 top.history;
 */
try {
  history = top.history;
} catch (e) {
  history = window.history;
}

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
    this.setState(merge({}, this.getState(), ...state));
  }

  shallowMergeState(...state: object[]) {
    this.setState(assign({}, this.getState(), ...state));
  }

  clearState() {
    this.setState(null);
  }

  getValue(path: string, defaultValue: any = null) {
    return get(this.getState(), path, defaultValue);
  }
}
