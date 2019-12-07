const createTripInfoMainMarkup = (list) => {
  const firstPlace = list[0].city;
  const lastPlace = list[list.length - 1].city;

  return (
    `<h1 class="trip-info__title">${firstPlace} &mdash; ... &mdash; ${lastPlace}</h1>

      <p class="trip-info__dates">${list[0].startDate.toLocaleString(`en-US`, {month: `short`})} ${list[0].startDate.getDate()}&nbsp;&mdash;&nbsp;${list[list.length - 1].endDate.getDate()}</p>`
  );
};

export const createTripInfoMainTemplate = (eventsList) => {
  const tripInfoMarkup = createTripInfoMainMarkup(eventsList);

  return (
    `<div class="trip-info__main">
        ${tripInfoMarkup}
      </div>`
  );
};
