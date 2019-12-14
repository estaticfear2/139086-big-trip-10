import AbstractComponent from './abstract-component.js';

const createTripInfoMainMarkup = (list) => {
  if (!list.length) {
    return ``;
  }
  const firstPlace = list[0].city;
  const lastPlace = list[list.length - 1].city;

  return (
    `<h1 class="trip-info__title">${firstPlace} &mdash; ... &mdash; ${lastPlace}</h1>

      <p class="trip-info__dates">${list[0].startDate.toLocaleString(`en-US`, {month: `short`})} ${list[0].startDate.getDate()}&nbsp;&mdash;&nbsp;${list[list.length - 1].endDate.getDate()}</p>`
  );
};

const createTripInfoMainTemplate = (eventsList) => {
  const tripInfoMarkup = createTripInfoMainMarkup(eventsList);

  return (
    `<div class="trip-info__main">
        ${tripInfoMarkup}
      </div>`
  );
};

export default class TripInfoMain extends AbstractComponent {
  constructor(eventsList) {
    super();
    this._eventsList = eventsList;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._eventsList);
  }
}
