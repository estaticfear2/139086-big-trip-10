import {createElement, formatTime} from '../utils.js';
import {eventTypeMap} from '../const.js';

const createOffersMarkup = (offers) => {
  const offersMarkup = offers
    .filter((it) => it.checked)
    .map((it) => {
      return `<li class="event__offer">
                <span class="event__offer-title">${it.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
              </li>`;
    })
    .join(`\n`);

  return offersMarkup;
};

const createTripMarkup = (event) => {
  const duration = event.endDate - event.startDate;
  const durationHours = Math.floor(duration / (1000 * 60 * 60));
  const durationMinutes = Math.round(duration % (1000 * 60 * 60) / 1000 / 60);

  return (
    `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="${event.type} icon">
        </div>
        <h3 class="event__title">${eventTypeMap[event.type]} ${event.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatTime(event.startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatTime(event.endDate)}</time>
          </p>
          <p class="event__duration">${durationHours}H ${durationMinutes}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersMarkup(event.offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
  );
};

const createTripTemplate = (event) => {
  return (
    `<li class="trip-events__item">
        ${createTripMarkup(event)}
      </li>`
  );
};

export default class TripTemplate {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createTripTemplate(this._event);
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
