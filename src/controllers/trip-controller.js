import TripEventsList from '../components/trip-events-list.js';
import NoEvents from '../components/no-events.js';
import Sort, {SortType} from '../components/sort.js';
import TripInfoMain from '../components/trip-info-main.js';
import Amount from '../components/amount.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {getSetFromArray} from '../utils/common.js';
import EventController, {EventMode, getEmptyEvent} from './point-controller.js';
import {HIDDEN_CLASS} from '../const.js';

const renderEventsByDate = (container, events, destinations, offers, onDataChange, onViewChange) => {
  const dayList = getSetFromArray(events.map((it) => new Date(it.startDate).toDateString()));

  render(container, new TripEventsList(dayList), RenderPosition.BEFOREEND);
  const controllers = [];

  Array.from(dayList).map((date, i) => {
    const tripEventsDayElement = container.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);

    events
      .filter((it) => new Date(it.startDate).toDateString() === date)
      .forEach((event) => {
        const eventController = new EventController(tripEventsDayElement, onDataChange, onViewChange);
        eventController.render(event, destinations, offers, EventMode.DEFAULT);

        controllers.push(eventController);
      });
  });

  return controllers;
};

const renderEvents = (container, events, destinations, offers, onDataChange, onViewChange) => {
  render(container, new TripEventsList(), RenderPosition.BEFOREEND);
  const eventElement = container.querySelector(`.trip-events__list`);
  const controllers = [];

  events.forEach((event) => {
    const eventController = new EventController(eventElement, onDataChange, onViewChange);
    eventController.render(event, destinations, offers, EventMode.DEFAULT);

    controllers.push(eventController);
  });

  return controllers;
};

export default class TripController {
  constructor(container, eventsModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._eventControllers = [];
    this._noEvents = new NoEvents();
    this._eventsFilter = new Sort();
    this._eventsList = new TripEventsList();
    this._tripInfoMain = null;
    this._tripAmount = null;

    this._tripInfoElement = null;
    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsFilter.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {
    const container = this._container;
    const events = this._eventsModel.getEvents();

    if (!events.length) {
      render(container, this._noEvents, RenderPosition.BEFOREEND);
      return;
    }

    render(container.firstElementChild, this._eventsFilter, RenderPosition.AFTEREND);

    const eventControllers = renderEventsByDate(container, events, this._destinationsModel.getDestinations(), this._offersModel.getOffers(), this._onDataChange, this._onViewChange);
    this._eventControllers = this._eventControllers.concat(eventControllers);
  }

  _onSortTypeChange(sortType) {
    let sortedEvents = [];
    const events = this._eventsModel.getEvents();

    switch (sortType) {
      case SortType.DEFAULT:
        sortedEvents = events.slice();
        break;
      case SortType.TIME:
        sortedEvents = events.slice().sort((a, b) => {
          const durationFirst = a.endDate - a.startDate;
          const durationSecond = b.endDate - b.startDate;

          return durationSecond - durationFirst;
        });
        break;
      case SortType.PRICE:
        sortedEvents = events.slice().sort((a, b) => b.price - a.price);
        break;
    }

    this._removeEvents();

    if (sortType === SortType.DEFAULT) {
      this._renderEvents(sortedEvents);
    } else {
      const eventListElement = this._container.lastElementChild;
      renderEvents(eventListElement, sortedEvents, this._destinationsModel.getDestinations(), this._offersModel.getOffers(), this._onDataChange, this._onViewChange);
    }
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._onViewChange();

    if (!this._eventsModel.getEventsAll().length) {
      remove(this._noEvents);
    }

    const eventListElement = this._container;
    this._creatingEvent = new EventController(eventListElement, this._onDataChange, this._onViewChange);
    const newEventId = this._eventsModel._events.length;
    this._creatingEvent.render(getEmptyEvent(newEventId), this._destinationsModel.getDestinations(), this._offersModel.getOffers(), EventMode.ADDING);
  }

  _removeEvents() {
    const eventListElement = this._container.lastElementChild;
    eventListElement.innerHTML = ``;

    this._eventControllers.forEach((it) => it.removeFlatpickr());
    this._eventControllers = [];
  }

  _updateEvents() {
    this._removeEvents();

    this._renderEvents(this._eventsModel.getEvents());
  }

  _renderEvents(events) {
    const eventListElement = this._container.lastElementChild;

    if (!this._eventsModel.getEventsAll().length) {
      remove(this._eventsFilter);

      render(this._container, this._noEvents, RenderPosition.BEFOREEND);
      return;
    }

    const newEvents = renderEventsByDate(eventListElement, events, this._destinationsModel.getDestinations(), this._offersModel.getOffers(), this._onDataChange, this._onViewChange);
    this._eventControllers = this._eventControllers.concat(newEvents);
  }

  _onDataChange(eventController, oldData, newData) {

    if (this._creatingEvent) {
      this._creatingEvent = null;

      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
      } else {
        this._api.createEvent(newData)
          .then((eventModel) => {
            this._eventsModel.addEvent(eventModel);
            eventController.render(eventModel, this._destinationsModel.getDestinations(), this._offersModel.getOffers(), EventMode.DEFAULT);

            const destroyedEvent = this._eventControllers.pop();
            destroyedEvent.destroy();

            this._eventControllers = [].concat(eventController, this._eventControllers);
            this._onSortTypeChange(SortType.DEFAULT);
            this.renderTripInfo();
          })
          .catch(() => {
            eventController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._eventsModel.removeEvent(oldData.id);

          this._updateEvents();
          this.renderTripInfo();
        })
        .catch(() => {
          eventController.shake();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((eventModel) => {
          const isSuccess = this._eventsModel.updateEvent(oldData.id, eventModel);

          if (isSuccess) {
            eventController.render(eventModel, this._destinationsModel.getDestinations(), this._offersModel.getOffers(), EventMode.DEFAULT);
            this._updateEvents();
            this.renderTripInfo();
          }
        })
        .catch(() => {
          eventController.shake();
        });
    }
  }

  renderTripInfo(container) {
    if (container) {
      this._tripInfoElement = container;
    }

    if (this._tripInfoMain) {
      remove(this._tripInfoMain);
      remove(this._tripAmount);
    }

    this._tripInfoMain = new TripInfoMain(this._eventsModel.getEvents());
    this._tripAmount = new Amount(this._eventsModel.getEvents());

    render(this._tripInfoElement, this._tripInfoMain, RenderPosition.AFTERBEGIN);
    render(this._tripInfoElement, this._tripAmount, RenderPosition.BEFOREEND);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  rerender() {
    this._updateEvents();
  }
}
