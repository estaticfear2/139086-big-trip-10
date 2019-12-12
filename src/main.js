import SiteMenu from './components/site-menu.js';
import MainFilter from './components/main-filter.js';
import EventsFilter from './components/events-filter.js';
import TripEventsList from './components/trip-events-list.js';
import TripEdit from './components/trip-edit.js';
import Trip from './components/trip.js';
import TripInfoMain from './components/trip-info-main.js';
import Amount from './components/amount.js';
import NoEvents from './components/no-events.js';
import {generateMainFilters} from './mock/main-filter.js';
import {generateSiteMenu} from './mock/site-menu.js';
import {generateEventsFilter} from './mock/events-filter.js';
import {generateEventsList} from './mock/trip-event.js';
import {render, RenderPosition, getSetFromArray} from './utils.js';

const siteMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = siteMainElement.querySelector(`.trip-info`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

const menuItems = generateSiteMenu();
render(siteControlsElement.firstElementChild, new SiteMenu(menuItems).getElement(), RenderPosition.AFTEREND);

const filters = generateMainFilters();
render(siteControlsElement, new MainFilter(filters).getElement(), RenderPosition.BEFOREEND);

const renderEvent = (event, tripEventsDayElement) => {
  const onEscKeyDown = (evt) => {
    const isEscape = (evt.key === `Escape` || evt.key === `Esc`);

    if (isEscape) {
      replaceEventEditComponent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEventEditComponent = () => {
    tripEventsDayElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const replaceEventComponent = () => {
    tripEventsDayElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const eventComponent = new Trip(event);
  const eventEditComponent = new TripEdit(event);

  const editBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editBtn.addEventListener(`click`, () => {
    replaceEventComponent();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = eventEditComponent.getElement();
  editForm.addEventListener(`submit`, replaceEventEditComponent);

  render(tripEventsDayElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEvents = () => {
  const tripEventsFilter = generateEventsFilter();
  render(tripEventsElement.firstElementChild, new EventsFilter(tripEventsFilter).getElement(), RenderPosition.AFTEREND);

  const dayList = getSetFromArray(eventsList.map((it) => new Date(it.startDate).toDateString()));

  render(tripEventsElement, new TripEventsList(dayList).getElement(), RenderPosition.BEFOREEND);

  Array.from(dayList).forEach((date, i) => {
    const tripEventsDayElement = tripEventsElement.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);

    eventsList
      .filter((it) => new Date(it.startDate).toDateString() === date)
      .forEach((event) => renderEvent(event, tripEventsDayElement));
  });

  render(tripInfoElement, new TripInfoMain(eventsList).getElement(), RenderPosition.AFTERBEGIN);
};

const tripEventsElement = document.querySelector(`.trip-events`);
const eventsList = generateEventsList();

if (!eventsList.length) {
  render(tripEventsElement, new NoEvents().getElement(), RenderPosition.BEFOREEND);
} else {
  renderEvents();
}

render(tripInfoElement, new Amount(eventsList).getElement(), RenderPosition.BEFOREEND);
