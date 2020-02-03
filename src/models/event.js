import {EVENT_TYPE} from '../const.js';

class Event {
  constructor(event) {
    this.id = event[`id`];
    this.type = EVENT_TYPE.find((eventType) => eventType.name === event[`type`]);
    this.city = event[`destination`][`name`];
    this.photo = event[`destination`][`pictures`];
    this.description = event[`destination`][`description`];
    this.startDate = new Date(event[`date_from`]);
    this.endDate = new Date(event[`date_to`]);
    this.price = event[`base_price`];
    this.offers = event[`offers`];
    this.isFavorite = Boolean(event[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': `${this.id}`,
      'base_price': this.price,
      'date_from': this.startDate,
      'date_to': this.endDate,
      'destination': {
        'description': this.description,
        'name': this.city,
        'pictures': this.photo,
      },
      'is_favorite': this.isFavorite,
      'offers': this.offers,
      'type': this.type.name
    };
  }

  static parseEvent(event) {
    return new Event(event);
  }

  static parseEvents(events) {
    return events.map(Event.parseEvent);
  }

  static clone(event) {
    return new Event(event.toRAW());
  }
}

export default Event;
