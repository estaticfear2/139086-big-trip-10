const createTripDaysMarkup = (dayList) => {
  return dayList.map((it, i) => {
    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${++i}</span>
            <time class="day__date" datetime="2019-03-18">
              ${new Date(it).toLocaleString(`en-US`, {month: `short`})}
              ${new Date(it).getDate()}</time>
          </div>

          <ul class="trip-events__list">
          </ul>
        </li>`
    );
  }).join(`\n`);
};

export const createTripEventsListTemplate = (dayList) => {
  return (
    `<ul class="trip-days">
        ${createTripDaysMarkup(dayList)}
      </ul>`
  );
};
