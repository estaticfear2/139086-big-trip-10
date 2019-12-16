import SiteMenu from './components/site-menu.js';
import MainFilter from './components/main-filter.js';
import TripController from './controllers/trip-controller.js';
import TripInfoMain from './components/trip-info-main.js';
import Amount from './components/amount.js';
import {generateMainFilters} from './mock/main-filter.js';
import {generateSiteMenu} from './mock/site-menu.js';
import {generateEventsList} from './mock/trip-event.js';
import {render, RenderPosition} from './utils/render.js';

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);
const menuItems = generateSiteMenu();
render(siteControlsElement.firstElementChild, new SiteMenu(menuItems), RenderPosition.AFTEREND);

const filters = generateMainFilters();
render(siteControlsElement, new MainFilter(filters), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsElement);

const eventsList = generateEventsList();
tripController.render(eventsList);

const tripInfoElement = siteMainElement.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoMain(eventsList), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new Amount(eventsList), RenderPosition.BEFOREEND);
