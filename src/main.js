import {createSiteMenuTemplate} from './components/site-menu.js';
import {createMainFilterTemplate} from './components/main-filter.js';
import {createEventsFilterTemplate} from './components/events-filter.js';
import {createTripEventsListTemplate} from './components/trip-events-list.js';
import {createTripEditTemplate} from './components/trip-edit.js';
import {createTripTemplate} from './components/trip.js';
import {createTripInfoMainTemplate} from './components/trip-info-main.js';
import {generateMainFilters} from './mock/main-filter.js';
import {generateSiteMenu} from './mock/site-menu.js';
import {generateEventsFilter} from './mock/events-filter.js';
import {generateEventsList} from './mock/trip-event.js';
import {calculateAmount} from './components/amount.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

const menuItems = generateSiteMenu();
render(siteControlsElement.firstElementChild, createSiteMenuTemplate(menuItems), `afterend`);

const filters = generateMainFilters();
render(siteControlsElement, createMainFilterTemplate(filters), `beforeend`);

const tripEventsElement = document.querySelector(`.trip-events`);
const eventsList = generateEventsList();
render(tripEventsElement, createTripEditTemplate(eventsList), `beforeend`);

const tripEventsFilter = generateEventsFilter();
render(tripEventsElement.firstElementChild, createEventsFilterTemplate(tripEventsFilter), `afterend`);

const unique = (arr) => {
  return Array.from(new Set(arr));
};

const dayList = unique(eventsList.slice(1).map((it) => new Date(it.startDate).toDateString()));
render(tripEventsElement, createTripEventsListTemplate(dayList), `beforeend`);

const eventsListByDate = [];
dayList.forEach((dayListItem) => {
  eventsListByDate.push(eventsList.slice(1).filter((it) => {
    return new Date(it.startDate).toDateString() === dayListItem;
  }));
});

eventsListByDate.forEach((it, i) => {
  const tripEventsDayElement = tripEventsElement.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);
  it.forEach((item) => {
    render(tripEventsDayElement, createTripTemplate(item), `beforeend`);
  });
});

const tripInfoElement = siteMainElement.querySelector(`.trip-info`);
render(tripInfoElement, createTripInfoMainTemplate(eventsList), `afterbegin`);

const amountElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
amountElement.textContent = calculateAmount(eventsList);
