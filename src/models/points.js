export default class Events {
  constructor() {
    this._events = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = Array.from(events);
    console.log(this._events);
  }

  updateEvent(id, newEvent) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index < 0) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), newEvent, this._events.slice(++index));

    return true;
  }
}
