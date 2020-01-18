import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractSmartComponent from './abstract-smart-component.js';
import {formatDate, formatTime} from '../utils/common.js';
import {EVENT_TYPE} from '../mock/trip-event.js';
import {EventMode} from '../controllers/point-controller.js';

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
  isBlocked: false
};

const createEventPhotoMarkup = (list) => {
  return list.map((it) => `<img class="event__photo" src="${it.src}" alt="${it.description}">`).join(`\n`);
};

const createEventTypeMarkup = (eventType, eventID, eventGroup) => {
  const markup = EVENT_TYPE.slice()
    .filter((it) => it.group === eventGroup)
    .map((it) => {
      const type = it.name === eventType ? `checked` : ``;

      return (
        `<div class="event__type-item">
            <input id="event-type-${it.name}-${eventID}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.name}" ${type}>
            <label class="event__type-label  event__type-label--${it.name}" for="event-type-${it.name}-${eventID}">${it.name}</label>
          </div>`
      );
    }).join(`\n`);

  return markup;
};

const createEventTypeListMarkup = (event) => {
  const transferTypeMarkup = createEventTypeMarkup(event.type.name, event.id, `Transfer`);
  const activityTypeActivityMarkup = createEventTypeMarkup(event.type.name, event.id, `Activity`);

  return (
    `<fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>

        ${transferTypeMarkup}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>

        ${activityTypeActivityMarkup}
      </fieldset>`
  );
};

const createEventDestinationsMarkup = (destinations) => {
  return destinations.map((it) => {
    return (
      `<option value="${it.name}"></option>`
    );
  }).join(`/n`);
};

const createEventOffersMarkup = (offers, event) => {
  const eventOffers = offers.find((it) => it.type === event.type.name).offers;

  return eventOffers.map((it, i) => {
    const isOfferChecked = event.offers.find((offer) => offer.title === it.title);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}-${event.id}" type="checkbox" name="event-offer-${i}" ${isOfferChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${i}-${event.id}">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const createTripEditMarkup = (event, destinations, offers, mode, externalData) => {
  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;
  const isBlocked = externalData.isBlocked;
  return (
    `<form class="${mode === EventMode.ADDING ? `trip-events__item ` : ``} event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${event.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.name}.png" alt="${event.type.name} icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${event.id}" type="checkbox">

            <div class="event__type-list">
              ${createEventTypeListMarkup(event)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${event.id}">
              ${event.type.description}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${event.id}" type="text" name="event-destination" value="${event.city}" list="destination-list-${event.id}">
            <datalist id="destination-list-${event.id}">
              ${createEventDestinationsMarkup(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${event.id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${event.id}" type="text" name="event-start-time" value="${formatDate(event.startDate)} ${formatTime(event.startDate)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${event.id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${event.id}" type="text" name="event-end-time" value="${formatDate(event.endDate)} ${formatTime(event.endDate)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${event.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${event.id}" type="text" name="event-price" value="${event.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isBlocked ? `disabled` : ``}>${saveButtonText}</button>
          <button class="event__reset-btn" type="reset" ${isBlocked ? `disabled` : ``}>${deleteButtonText}</button>

          <input id="event-favorite-${event.id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-${event.id}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createEventOffersMarkup(offers, event)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${event.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createEventPhotoMarkup(event.photo)}
              </div>
            </div>
          </section>
        </section>
      </form>`
  );
};

const createTripEditTemplate = (event, destinations, offers, mode, externalData) => {
  return createTripEditMarkup(event, destinations, offers, mode, externalData);
};

export default class TripEdit extends AbstractSmartComponent {
  constructor(event, destinations, offers, eventMode) {
    super();
    this._event = event;
    this._destinations = destinations;
    this._offers = offers;
    this._eventMode = eventMode;
    this._externalData = DefaultData;

    this._submitHandler = null;
    this._flatpickr = [];
    this._deleteButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEditTemplate(this._event, this._destinations, this._offers, this._eventMode, this._externalData);
  }

  setEditFormSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setEditFormSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.forEach((it) => it.destroy());
      this._flatpickr = [];
    }

    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this._event = Object.assign({}, this._event);
    this.rerender();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.forEach((it) => it.destroy());
      this._flatpickr = [];
    }

    const [eventStartDateElement, eventEndDateElement] = this.getElement().querySelectorAll(`.event__input--time`);

    const setFlatpickr = (elem, startDate) => {

      return flatpickr(elem, {
        dateFormat: `d/m/y H:i`,
        allowInput: true,
        defaultDate: startDate
      });
    };

    this._flatpickr.push(setFlatpickr(eventStartDateElement, this._event.startDate));
    this._flatpickr.push(setFlatpickr(eventEndDateElement, this._event.endDate));
  }

  getData() {
    const formElement = this.getElement();

    return new FormData(formElement);
  }

  setData(data, event) {
    this._event = event;
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeElement = element.querySelector(`.event__type-toggle`);
    eventTypeElement.addEventListener(`click`, () => {
      const eventTypeList = element.querySelector(`.event__type-list`);
      eventTypeList.addEventListener(`click`, (evt) => {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const eventType = EVENT_TYPE.find((it) => it.name === evt.target.value);

        this._event = Object.assign({}, this._event,
            {type: eventType}
        );

        this.rerender();
      });
    });

    const eventDestinationElement = element.querySelector(`.event__input--destination`);
    eventDestinationElement.addEventListener(`change`, (evt) => {
      const city = evt.target.value;
      const [{description, pictures}] = this._destinations
        .filter((it) => it.name === city);

      this._event = Object.assign({}, this._event,
          {city},
          {description},
          {photo: pictures}
      );

      this.rerender();
    });
  }
}
