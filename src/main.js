import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTripEventsFilterTemplate} from './components/trip-events-filter.js';
import {createTripEventsListTemplate} from './components/trip-events-list.js';
import {createTripEditTemplate} from './components/trip-edit.js';
import {createTripTemplate} from './components/trip.js';
import {createTripInfoMainTemplate} from './components/trip-info-main.js';

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

render(siteControlsElement.firstElementChild, createSiteMenuTemplate(), `afterend`);
render(siteControlsElement, createFilterTemplate(), `beforeend`);

const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement.firstElementChild, createTripEventsFilterTemplate(), `afterend`);
render(tripEventsElement, createTripEventsListTemplate(), `beforeend`);

const tripEventsList = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsList, createTripEditTemplate(), `beforeend`);

for (let i = 1; i <= EVENT_COUNT; i++) {
  render(tripEventsList, createTripTemplate(), `beforeend`);
}

const tripInfoElement = siteMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripInfoMainTemplate(), `afterbegin`);
