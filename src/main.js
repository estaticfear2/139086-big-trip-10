import SiteMenu from './components/site-menu.js';
import FilterController from './controllers/filter.js';
import TripController from './controllers/trip-controller.js';
import TripInfoMain from './components/trip-info-main.js';
import Amount from './components/amount.js';
import EventsModel from './models/points.js';
import Statistics from './components/statistics.js';
import {MenuItem} from './const.js';

import {generateEventsList} from './mock/trip-event.js';
import {render, RenderPosition} from './utils/render.js';

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

const siteMenuComponent = new SiteMenu();

siteMainElement.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => tripController.createEvent());

render(siteControlsElement.firstElementChild, siteMenuComponent, RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);

const eventsList = generateEventsList();
const eventsModel = new EventsModel();

eventsModel.setEvents(eventsList);

const filterController = new FilterController(siteControlsElement, eventsModel);
filterController.render();

const tripController = new TripController(tripEventsElement, eventsModel);
tripController.render();

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

const tripInfoElement = siteMainElement.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoMain(eventsList), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new Amount(eventsList), RenderPosition.BEFOREEND);
