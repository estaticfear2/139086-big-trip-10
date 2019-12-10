import {createElement} from '../utils.js';

const createEventsFilterMarkup = (filter, isChecked) => {
  const filterName = filter.toLowerCase();
  return (
    `<div class="trip-sort__item  trip-sort__item--${filterName}">
        <input id="sort-${filterName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${filterName}" ${isChecked ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-event">${filter}</label>
      </div>`
  );
};

const createEventsFilterTemplate = (filterItems) => {
  const eventsFilterMarkup = filterItems.map((it) => createEventsFilterMarkup(it.name, it.ischecked)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${eventsFilterMarkup}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
  );
};

export default class EventsFilter {
  constructor(filterItems) {
    this._filterItems = filterItems;
    this._element = null;
  }

  getTemplate() {
    return createEventsFilterTemplate(this._filterItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
