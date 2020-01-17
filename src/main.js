import API from './api.js';
import SiteMenu from './components/site-menu.js';
import FilterController from './controllers/filter.js';
import TripController from './controllers/trip-controller.js';
import TripInfoMain from './components/trip-info-main.js';
import Amount from './components/amount.js';
import EventsModel from './models/points.js';
import DestinationsModel from './models/destinations.js';
import OffersModel from './models/offers.js';
import Statistics from './components/statistics.js';
import {MenuItem} from './const.js';

import {render, RenderPosition} from './utils/render.js';

const AUTHORIZATION = `Basic er883jdzbdw=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

const siteMenuComponent = new SiteMenu();

siteMainElement.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => tripController.createEvent());

render(siteControlsElement.firstElementChild, siteMenuComponent, RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const tripController = new TripController(tripEventsElement, eventsModel, destinationsModel, offersModel, api);

const filterController = new FilterController(siteControlsElement, eventsModel);
filterController.render();

const statisticsComponent = new Statistics(eventsModel);
render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  siteMenuComponent.setActiveItem(menuItem);

  switch (menuItem.textContent) {
    case MenuItem.TABLE:
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      statisticsComponent.show();
      tripController.hide();
      break;
  }
});

Promise.all([api.getEvents(), api.getDestinations(), api.getOffers()])
  .then(([events, destinations, offers]) => {

    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    eventsModel.setEvents(events);

    tripController.render();
  });

const tripInfoElement = siteMainElement.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoMain(eventsModel.getEvents()), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new Amount(eventsModel.getEvents()), RenderPosition.BEFOREEND);
