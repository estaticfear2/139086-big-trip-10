import TripEventsList from '../components/trip-events-list.js';
import NoEvents from '../components/no-events.js';
import Sort, {SortType} from '../components/Sort.js';
import {render, RenderPosition} from '../utils/render.js';
import {getSetFromArray} from '../utils/common.js';
import EventController from './point-controller.js';

const renderEventsByDate = (container, events, onDataChange, onViewChange) => {
  const dayList = getSetFromArray(events.map((it) => new Date(it.startDate).toDateString()));

  render(container, new TripEventsList(dayList), RenderPosition.BEFOREEND);
  const controllers = [];

  Array.from(dayList).map((date, i) => {
    const tripEventsDayElement = container.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);

    events
      .filter((it) => new Date(it.startDate).toDateString() === date)
      .map((event) => {
        const eventController = new EventController(tripEventsDayElement, onDataChange, onViewChange);
        eventController.render(event);

        controllers.push(eventController);
      });
  });

  return controllers;
};

const renderEvents = (container, events, onDataChange, onViewChange) => {
  render(container, new TripEventsList(), RenderPosition.BEFOREEND);
  const eventElement = container.querySelector(`.trip-events__list`);
  const controllers = [];

  events.forEach((event) => {
    const eventController = new EventController(eventElement, onDataChange, onViewChange);
    eventController.render(event);

    controllers.push(eventController);
  });

  return controllers;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._eventControllers = [];
    this._noEvents = new NoEvents();
    this._eventsFilter = new Sort();
    this._eventsList = new TripEventsList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {
    this._events = events;

    const container = this._container;

    if (!events.length) {
      render(container, this._noEvents, RenderPosition.BEFOREEND);
      return;
    }

    render(container.firstElementChild, this._eventsFilter, RenderPosition.AFTEREND);

    const eventControllers = renderEventsByDate(container, events, this._onDataChange, this._onViewChange);
    this._eventControllers = this._eventControllers.concat(eventControllers);

    const eventsListElement = container.lastElementChild;

    this._eventsFilter.setSortTypeChangeHandler((sortType) => {
      let sortedEvents = [];

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

      eventsListElement.innerHTML = ``;

      if (sortType === SortType.DEFAULT) {
        renderEventsByDate(eventsListElement, sortedEvents, this._onDataChange, this._onViewChange);
      } else {
        renderEvents(eventsListElement, sortedEvents, this._onDataChange, this._onViewChange);
      }
    });
  }

  _onDataChange(eventController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    eventController.render(this._events[index]);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => it.setDefaultView());
  }
}
