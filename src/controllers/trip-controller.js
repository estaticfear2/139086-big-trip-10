import TripEventsList from '../components/trip-events-list.js';
import NoEvents from '../components/no-events.js';
import Sort, {SortType} from '../components/sort.js';
import {render, RenderPosition} from '../utils/render.js';
import {getSetFromArray} from '../utils/common.js';
import EventController, {EventMode, getEmptyEvent} from './point-controller.js';

const renderEventsByDate = (container, events, onDataChange, onViewChange) => {
  const dayList = getSetFromArray(events.map((it) => new Date(it.startDate).toDateString()));

  render(container, new TripEventsList(dayList), RenderPosition.BEFOREEND);
  const controllers = [];

  Array.from(dayList).map((date, i) => {
    const tripEventsDayElement = container.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);

    events
      .filter((it) => new Date(it.startDate).toDateString() === date)
      .forEach((event) => {
        const eventController = new EventController(tripEventsDayElement, onDataChange, onViewChange);
        eventController.render(event, EventMode.DEFAULT);

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
    eventController.render(event, EventMode.DEFAULT);

    controllers.push(eventController);
  });

  return controllers;
};

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._eventControllers = [];
    this._noEvents = new NoEvents();
    this._eventsFilter = new Sort();
    this._eventsList = new TripEventsList();
    this._newEventId = null;

    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsFilter.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const events = this._eventsModel.getEvents();

    if (!events.length) {
      render(container, this._noEvents, RenderPosition.BEFOREEND);
      return;
    }

    render(container.firstElementChild, this._eventsFilter, RenderPosition.AFTEREND);

    const eventControllers = renderEventsByDate(container, events, this._onDataChange, this._onViewChange);
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
      renderEvents(eventListElement, sortedEvents, this._onDataChange, this._onViewChange);
    }
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const eventListElement = this._container.lastElementChild;
    this._creatingEvent = new EventController(eventListElement, this._onDataChange, this._onViewChange);
    this._newEventId = this._eventsModel._events.length + 1;
    this._creatingEvent.render(getEmptyEvent(this._newEventId), EventMode.ADDING);
  }

  _removeEvents() {
    const eventListElement = this._container.lastElementChild;
    eventListElement.innerHTML = ``;
    //    this._eventControllers.forEach((eventController) => eventController.destroy());
    this._eventControllers = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._renderEvents(this._eventsModel.getEvents());
  }

  _renderEvents(events) {
    const eventListElement = this._container.lastElementChild;
    const newEvents = renderEventsByDate(eventListElement, events, this._onDataChange, this._onViewChange);
    this._eventControllers = this._eventControllers.concat(newEvents);
  }

  _onDataChange(eventController, oldData, newData) {

    if (this._creatingEvent) {
      this._creatingEvent = null;

      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
      } else {
        this._eventsModel.addEvent(newData);
        eventController.render(newData, EventMode.DEFAULT);
        this._onSortTypeChange(SortType.DEFAULT);

        const destroyedEvent = this._eventControllers.pop();
        destroyedEvent.destroy();

        this._eventControllers = [].concat(eventController, this._eventControllers);
      }
    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        eventController.render(newData, EventMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
  }
}
