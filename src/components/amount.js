import {createElement} from '../utils.js';

const createAmountMarkup = (eventsList) => {
  const calculateAmount = () => {
    return eventsList.length ? eventsList.reduce((amount, item) => amount + item.price, 0) : 0;
  };

  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateAmount(eventsList)}</span>
      </p>`
  );
};

const createAmountTemplate = (eventsList) => {
  return createAmountMarkup(eventsList);
};

export default class AmountComponent {
  constructor(eventsList) {
    this._eventsList = eventsList;
    this._element = null;
  }

  getTepmlate() {
    return createAmountTemplate(this._eventsList);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTepmlate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
