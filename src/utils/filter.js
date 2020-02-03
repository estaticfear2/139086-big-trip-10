import {FilterType} from '../const.js';

const getEventsByDate = (events) => {
  return events.sort((a, b) => a.startDate - b.startDate);
};

const getFutureEvents = (events, date) => {
  return events.filter((event) => event.startDate >= date);
};

const getPastEvents = (events, date) => {
  return events.filter((event) => event.endDate < date);
};

const getEventsByFilter = (events, filterType) => {
  const now = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return getEventsByDate(events);
    case FilterType.FUTURE:
      return getFutureEvents(events, now);
    case FilterType.PAST:
      return getPastEvents(events, now);
  }

  return events;
};

export {getEventsByFilter};
