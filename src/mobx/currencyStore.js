import { makeObservable, observable, action, computed } from 'mobx';

class CurrencyStore {
  currency = 'USD'

  constructor() {
    makeObservable(this, {
      currency: observable,
      currencySymbol: computed,
      change: action
    })
  }

  get currencySymbol() {
    switch (this.currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return '¤';
    }
  }

  change = (value) => {
    this.currency = value;
  }
}

const currencyStore = new CurrencyStore();

export default currencyStore;
