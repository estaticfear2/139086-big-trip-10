import {SortType} from '../const.js';

const getSortedEvents = (events, sortType) => {
  switch (sortType) {
    case SortType.DEFAULT:
      return events.slice();
    case SortType.TIME:
      return events.slice().sort((firstEvent, secondEvent) => {
        const durationFirst = firstEvent.endDate - firstEvent.startDate;
        const durationSecond = secondEvent.endDate - secondEvent.startDate;

        return durationSecond - durationFirst;
      });
    case SortType.PRICE:
      return events.slice().sort((firstEvent, secondEvent) => secondEvent.price - firstEvent.price);
  }

  return events;
};

export {getSortedEvents};
