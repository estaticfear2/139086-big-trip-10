import {createElement} from '../utils.js';

const createTripDaysMarkup = (dayList) => {
  return dayList.map((it, i) => {
    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${++i}</span>
            <time class="day__date" datetime="2019-03-18">
              ${new Date(it).toLocaleString(`en-US`, {month: `short`})}
              ${new Date(it).getDate()}</time>
          </div>

          <ul class="trip-events__list">
          </ul>
        </li>`
    );
  }).join(`\n`);
};

const createTripEventsListTemplate = (dayList) => {
  return (
    `<ul class="trip-days">
        ${createTripDaysMarkup(dayList)}
      </ul>`
  );
};

export default class TripEventsList {
  constructor(dayList) {
    this._dayList = dayList;
    this._element = null;
  }

  getTemplate() {
    return createTripEventsListTemplate(this._dayList);
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
