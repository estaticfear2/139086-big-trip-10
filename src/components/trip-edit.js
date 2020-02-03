import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import debounce from 'lodash/debounce';
import moment from 'moment';

import AbstractSmartComponent from './abstract-smart-component.js';
import {formatDate, formatTime} from '../utils/common.js';
import {EVENT_TYPE, EventMode} from '../const.js';

const DEBOUNCE_TIMEOUT = 500;

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
  isBlocked: false,
  isVisibleOffers: true,
  isVisibleDestination: true
};

const createEventPhotoMarkup = (pictures) => {
  return pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(`\n`);
};

const createEventTypeMarkup = (eventTypeName, eventID, eventGroup) => {
  const markup = EVENT_TYPE.slice()
    .filter((eventType) => eventType.group === eventGroup)
    .map((eventType) => {
      const type = eventType.name === eventTypeName ? `checked` : ``;

      return (
        `<div class="event__type-item">
            <input id="event-type-${eventType.name}-${eventID}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.name}" ${type}>
            <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-${eventID}">${eventType.name}</label>
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
  return destinations.map((destination) => {
    return (
      `<option value="${destination.name}"></option>`
    );
  }).join(`/n`);
};

const createFavoriteButtonMarkup = (eventId, isFavorite, disabledElement) => {
  return (
    `<input id="event-favorite-${eventId}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``} ${disabledElement}>
      <label class="event__favorite-btn" for="event-favorite-${eventId}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>`
  );
};

const createRollupButtonMarkup = () => {
  return (
    `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
  );
};


const createEventOffersMarkup = (offers, event) => {
  const eventOffers = offers.find((offer) => offer.type === event.type.name).offers;

  return eventOffers.map((eventOffer, index) => {
    const isOfferChecked = event.offers.find((offer) => offer.title === eventOffer.title);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}-${event.id}" type="checkbox" name="event-offer-${index}" ${isOfferChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${index}-${event.id}">
          <span class="event__offer-title">${eventOffer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${eventOffer.price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const createTripEditMarkup = (event, destinations, offers, mode, externalData) => {
  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;
  const isVisibleOffers = externalData.isVisibleOffers;
  const isVisibleDestination = externalData.isVisibleDestination;
  const eventOffersMarkup = createEventOffersMarkup(offers, event);
  const disabledElement = externalData.isBlocked ? `disabled` : ``;
  const favoriteButtonMarkup = mode === EventMode.ADDING ? `` : createFavoriteButtonMarkup(event.id, event.isFavorite, disabledElement);
  const rollupButtonMarkup = mode === EventMode.ADDING ? `` : createRollupButtonMarkup();

  return (
    `<form class="${mode === EventMode.ADDING ? `trip-events__item ` : ``} event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${event.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.name}.png" alt="${event.type.name} icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${event.id}" type="checkbox" ${disabledElement}>

            <div class="event__type-list">
              ${createEventTypeListMarkup(event)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${event.id}">
              ${event.type.description}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${event.id}" type="text" name="event-destination" value="${event.city}" list="destination-list-${event.id}" required ${disabledElement}>
            <datalist id="destination-list-${event.id}">
              ${createEventDestinationsMarkup(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${event.id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${event.id}" type="text" name="event-start-time" value="${formatDate(event.startDate)} ${formatTime(event.startDate)}" ${disabledElement}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${event.id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${event.id}" type="text" name="event-end-time" value="${formatDate(event.endDate)} ${formatTime(event.endDate)}" ${disabledElement}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${event.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${event.id}" type="text" name="event-price" value="${event.price}" required ${disabledElement}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${disabledElement}>${saveButtonText}</button>
          <button class="event__reset-btn" type="reset" ${disabledElement}>${deleteButtonText}</button>

          ${favoriteButtonMarkup}

          ${rollupButtonMarkup}
        </header>

        <section class="event__details ${isVisibleOffers || isVisibleDestination ? `` : `visually-hidden`}">

          ${eventOffersMarkup ? `<section class="event__section  event__section--offers ${isVisibleOffers ? `` : `visually-hidden`}">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${eventOffersMarkup}
            </div>
          </section>` : ``}

          <section class="event__section  event__section--destination ${isVisibleDestination ? `` : `visually-hidden`}">
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

class TripEdit extends AbstractSmartComponent {
  constructor(event, destinations, offers, eventMode) {
    super();
    this._event = event;
    this._resetEvent = Object.assign({}, event);
    this._destinations = destinations;
    this._offers = offers;
    this._eventMode = eventMode;
    this._externalData = Object.assign({}, DefaultData,
        {isVisibleOffers: eventMode === EventMode.ADDING ? false : true},
        {isVisibleDestination: eventMode === EventMode.ADDING ? false : true}
    );

    this._submitHandler = null;
    this._flatpickr = [];
    this._deleteButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEditTemplate(this._event, this._destinations, this._offers, this._eventMode, this._externalData);
  }

  getData() {
    const formElement = this.getElement();

    return new FormData(formElement);
  }

  recoveryListeners() {
    this.setEditFormSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this._subscribeOnEvents();
  }

  removeElement() {
    this.removeFlatpickr();
    super.removeElement();
  }

  removeFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.forEach((flatpickrController) => flatpickrController.destroy());
      this._flatpickr = [];
    }
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  reset() {
    this._event = Object.assign({}, this._resetEvent);
    this.rerender();
  }

  setData(externalData, event) {
    if (event) {
      this._event = event;
    }

    this._externalData = Object.assign({}, DefaultData, externalData);
    this.rerender();
  }

  setEditFormSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    if (this._eventMode !== EventMode.ADDING) {
      this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
      this._favoriteButtonClickHandler = handler;
    }
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    this.removeFlatpickr();

    const [eventStartDateElement, eventEndDateElement] = this.getElement().querySelectorAll(`.event__input--time`);

    const setFlatpickr = (inputElement, date) => {
      return flatpickr(inputElement, {
        dateFormat: `d/m/y H:i`,
        allowInput: true,
        defaultDate: date
      });
    };

    this._flatpickr.push(setFlatpickr(eventStartDateElement, this._event.startDate));
    this._flatpickr.push(setFlatpickr(eventEndDateElement, this._event.endDate));
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

        if (this._eventMode === EventMode.ADDING) {
          this.setData({
            isVisibleOffers: true,
            isVisibleDestination: this._externalData.isVisibleDestination,
          });
        }

        const type = EVENT_TYPE.find((eventType) => eventType.name === evt.target.value);

        this._event = Object.assign({}, this._event,
            {type}
        );

        this.rerender();
      });
    });

    const eventDestinationElement = element.querySelector(`.event__input--destination`);
    eventDestinationElement.addEventListener(`change`, (evt) => {
      const city = evt.target.value;

      const selectedDestination = this._destinations.find((destination) => destination.name === city);

      if (this._eventMode === EventMode.ADDING) {
        this.setData({
          isVisibleOffers: this._externalData.isVisibleOffers,
          isVisibleDestination: true
        });
      }

      if (!selectedDestination) {
        evt.target.setCustomValidity(`Select destination from the list`);
        evt.target.reportValidity();
      } else {
        evt.target.setCustomValidity(``);

        this._event = Object.assign({}, this._event,
            {city: selectedDestination.name},
            {description: selectedDestination.description},
            {photo: selectedDestination.pictures}
        );

        this.rerender();
      }
    });

    const eventPriceElement = element.querySelector(`.event__input--price`);
    eventPriceElement.addEventListener(`input`, (evt) => {
      const price = evt.target.value;

      const regexp = /^[ 0-9]+$/;

      if (!regexp.test(price)) {
        evt.target.setCustomValidity(`Enter an integer`);
        evt.target.reportValidity();
      } else {
        evt.target.setCustomValidity(``);

        this._event = Object.assign({}, this._event,
            {price}
        );
      }
    });

    const eventDateElements = element.querySelectorAll(`.event__input--time`);

    eventDateElements.forEach((dateInput) => {
      dateInput.addEventListener(`change`, (evt) => {
        const startDateValue = eventDateElements[0].value;
        const endDateValue = eventDateElements[1].value;
        const startDate = moment(startDateValue, `DD/MM/YY HH:mm`).valueOf();
        const endDate = moment(endDateValue, `DD/MM/YY HH:mm`).valueOf();

        if (startDate > endDate) {
          evt.target.setCustomValidity(`Start date is greater than end date`);
          evt.target.reportValidity();
        } else {
          evt.target.setCustomValidity(``);

          this._event = Object.assign({}, this._event,
              {startDate},
              {endDate}
          );
        }
      });
    });

    const offersContainer = element.querySelector(`.event__available-offers`);

    if (this._externalData.isVisibleOffers && offersContainer) {
      offersContainer.addEventListener(`input`, (evt) => {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const offersInputs = offersContainer.querySelectorAll(`.event__offer-checkbox`);
        const availableOffers = this._offers.find((offer) => offer.type === this._event.type.name).offers;
        const selectedOffers = availableOffers.filter((offer, index) => offersInputs[index].checked);

        this._event = Object.assign({}, this._event,
            {offers: selectedOffers}
        );
      });
    }
  }
}

export default TripEdit;
