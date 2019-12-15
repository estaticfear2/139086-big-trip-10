import AbstractComponent from './abstract-component.js';

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

export default class Sort extends AbstractComponent {
  constructor(filterItems) {
    super();
    this._filterItems = filterItems;
  }

  getTemplate() {
    return createEventsFilterTemplate(this._filterItems);
  }
}
