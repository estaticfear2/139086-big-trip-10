import AbstractComponent from './abstract-component.js';

const createTripDayInfoMarkup = (date, index) => {
  return (
    `<span class="day__counter">${++index}</span>
      <time class="day__date" datetime="2019-03-18">
        ${new Date(date).toLocaleString(`en-US`, {month: `short`})}
        ${new Date(date).getDate()}
      </time>`
  );
};

const createTripDayMarkup = (dayList = []) => {
  if (!dayList[0]) {
    dayList[0] = null;
  }

  return dayList.map((day, index) => {
    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            ${dayList[0] === null ? `` : createTripDayInfoMarkup(day, index)}
          </div>

          <ul class="trip-events__list">
          </ul>
        </li>`
    );
  }).join(`\n`);
};

const createTripEventsListTemplate = (dayList) => {
  return (
    `<ul class="trip-days">
        ${createTripDayMarkup(dayList)}
      </ul>`
  );
};

class TripEventsList extends AbstractComponent {
  constructor(dayList) {
    super();
    this._dayList = dayList;
  }

  getTemplate() {
    return createTripEventsListTemplate(this._dayList);
  }
}

export default TripEventsList;
