import {FilterType} from '../const.js';
import {getEventsByFilter} from '../utils/filter.js';

export default class Events {
  constructor() {
    this._events = [];

    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandler = null;
    this._filterChangeHandler = null;
  }

  addEvent(event) {
    this._events = [].concat(event, this._events);
    this._dataChangeHandler();
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  setEvents(events) {
    this._events = events;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandler();
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }

  updateEvent(id, newEvent) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), newEvent, this._events.slice(index + 1));

    this._dataChangeHandler();

    return true;
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    this._dataChangeHandler();

    return true;
  }

//  _callHandler(handler) {
//    handler();
//  }
}
