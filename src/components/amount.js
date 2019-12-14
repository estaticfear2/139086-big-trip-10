import AbstractComponent from './abstract-component.js';

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

export default class Amount extends AbstractComponent {
  constructor(eventsList) {
    super();
    this._eventsList = eventsList;
  }

  getTemplate() {
    return createAmountTemplate(this._eventsList);
  }
}
